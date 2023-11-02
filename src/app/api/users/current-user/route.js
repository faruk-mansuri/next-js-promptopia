import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connect } from '@/connectDB';
import { StatusCodes } from 'http-status-codes';

connect();

export const GET = async (request) => {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findById(userId).select('-password');
    return NextResponse.json({ user }, { status: StatusCodes.OK });
  } catch (error) {
    return NextResponse.json({ msg: error.message });
  }
};
