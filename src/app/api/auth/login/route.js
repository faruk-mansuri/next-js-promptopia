import { connect } from '@/connectDB';
import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import { comparePassword } from '@/helpers/passwordUtils';
import { createJWT } from '@/helpers/tokenUtils';
import { StatusCodes } from 'http-status-codes';

connect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    const isValidUser =
      user && (await comparePassword(password, user.password));

    if (!isValidUser) {
      return NextResponse.json(
        {
          msg: 'Invalid credentials',
        },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { msg: 'Check you email(spam) to verify your account' },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const token = createJWT({
      userId: user._id,
      username: user.username,
      email: user.email,
    });

    const oneDay = 1000 * 60 * 60 * 24;
    const response = NextResponse.json({ mes: 'Login successfully' });

    response.cookies.set('token', token, {
      httpOnly: true, // cookies can not be manipulated by browsers
      expires: new Date(Date.now() + oneDay), // Date.now() return numbers of mille
      secure: process.env.NODE_ENV === 'production', // we send cookies only if request come from https
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
    });
  }
};
