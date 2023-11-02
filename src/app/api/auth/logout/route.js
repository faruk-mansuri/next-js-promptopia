import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import { connect } from '@/connectDB';

connect();
export const GET = async () => {
  try {
    const response = NextResponse.json(
      { msg: 'user logged out!' },
      { status: StatusCodes.OK }
    );

    response.cookies.set('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    return response;
  } catch (error) {
    return NextResponse.json({ msg: error.message });
  }
};
