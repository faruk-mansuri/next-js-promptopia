import { connect } from '@/connectDB';
import Prompt from '@/models/promptModel';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

connect();

export const GET = async (req) => {
  try {
    let prompts;
    const searchParams = req.url.split('=')[1];

    if (searchParams) {
      prompts = await Prompt.find({
        $or: [
          { tag: { $regex: searchParams, $options: 'i' } },
          { prompt: { $regex: searchParams, $options: 'i' } },
          { 'creator.username': searchParams },
        ],
      })
        .sort('-createdAt')
        .populate('creator');
    } else {
      prompts = await Prompt.find({}).sort('-createdAt').populate('creator');
    }

    return NextResponse.json({ prompts }, { status: StatusCodes.OK });
  } catch (error) {
    return NextResponse.json(
      { msg: error.message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
