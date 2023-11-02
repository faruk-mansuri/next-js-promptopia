import { getDataFromToken } from '@/helpers/getDataFromToken';
import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connect } from '@/connectDB';
import { StatusCodes } from 'http-status-codes';

connect();

export const GET = async (request, { params }) => {
  try {
    const user = await User.findById(params.userId).select('-password');
    return NextResponse.json({ user }, { status: StatusCodes.OK });
  } catch (error) {
    return NextResponse.json({ msg: error.message });
  }
};
