import { NextResponse } from 'next/server';
import { connect } from '@/connectDB';
import User from '@/models/userModel';
import { hashPassword } from '@/helpers/passwordUtils';
import { sendVerificationEmail } from '@/helpers/verificationEmail';
import { StatusCodes } from 'http-status-codes';

connect();

export const POST = async (request) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists)
      return NextResponse.json(
        {
          msg: 'user already exists',
        },
        { status: StatusCodes.BAD_REQUEST }
      );

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // send verification email
    await sendVerificationEmail({
      email,
      emailType: 'VERIFY',
      userId: user._id,
    });

    return NextResponse.json({
      msg: 'User created successfully',
      user,
    });
  } catch (error) {
    return NextResponse.json({
      msg: error.message,
    });
  }
};
