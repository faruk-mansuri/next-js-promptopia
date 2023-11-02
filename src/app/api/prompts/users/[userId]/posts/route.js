import { connect } from '@/connectDB';
import Prompt from '@/models/promptModel';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

connect();

export const GET = async (req, { params }) => {
  try {
    const prompts = await Prompt.find({ creator: params.userId })
      .sort('-createdAt')
      .populate('creator');
    return NextResponse.json({ prompts }, { status: StatusCodes.OK });
  } catch (error) {
    return NextResponse.json(
      { msg: error.message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
