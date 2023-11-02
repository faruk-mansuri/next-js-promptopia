import { connect } from '@/connectDB';
import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import { StatusCodes } from 'http-status-codes';

connect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      verifiedToken: token,
      verifiedTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json(
        { msg: 'Invalid Token' },
        { status: StatusCodes.BAD_REQUEST }
      );

    user.isVerified = true;
    user.verifiedToken = undefined;
    user.verifiedTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { msg: 'Email verified successfully' },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: error.message },
      { status: StatusCodes.BAD_REQUEST }
    );
  }
};
