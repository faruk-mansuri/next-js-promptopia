// import { verifyJWT } from './tokenUtils';
import jwt from 'jsonwebtoken';

export const getDataFromToken = async (request) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  } catch (error) {
    throw new Error(error.message);
  }
};
