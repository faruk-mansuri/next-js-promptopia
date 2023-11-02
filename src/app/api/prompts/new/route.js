import { connect } from '@/connectDB';
import Prompt from '@/models/promptModel';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

connect();

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    const newPrompt = await Prompt.create({ creator: userId, prompt, tag });
    return NextResponse.json(
      { msg: 'Prompt created successfully', newPrompt },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: error.message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
