import { connect } from '@/connectDB';
import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '@/helpers/passwordUtils';

connect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json(
        { msg: 'Invalid Token' },
        { status: StatusCodes.BAD_REQUEST }
      );

    user.password = await hashPassword(password);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { msg: 'Password reset successfully' },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return NextResponse.json({ msg: error.message });
  }
};
