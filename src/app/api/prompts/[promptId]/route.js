import { connect } from '@/connectDB';
import Prompt from '@/models/promptModel';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

connect();

export const GET = async (req, { params }) => {
  try {
    const mongooseId = mongoose.Types.ObjectId.isValid(params.promptId);
    if (!mongooseId) {
      return NextResponse.json(
        { msg: 'invalid mondoDB ID' },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const prompt = await Prompt.findById(params.promptId).populate('creator');
    if (!prompt) {
      return NextResponse.json(
        { msg: `No prompt found with id : ${params.promptId}` },
        { status: StatusCodes.NOT_FOUND }
      );
    }
    return NextResponse.json({ prompt }, { status: StatusCodes.OK });
  } catch (error) {
    return NextResponse.json(
      { msg: error.message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export const PATCH = async (req, { params }) => {
  const reqBody = await req.json();
  try {
    const mongooseId = mongoose.Types.ObjectId.isValid(params.promptId);
    if (!mongooseId) {
      return NextResponse.json(
        { msg: 'invalid mondoDB ID' },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const prompt = await Prompt.findById(params.promptId).populate('creator');
    if (!prompt) {
      return NextResponse.json(
        { msg: `No prompt found with id : ${params.promptId}` },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    prompt.prompt = reqBody.prompt;
    prompt.tag = reqBody.tag;
    await prompt.save();
    return NextResponse.json({ prompt }, { status: StatusCodes.OK });
  } catch (error) {
    return NextResponse.json(
      { msg: error.message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const mongooseId = mongoose.Types.ObjectId.isValid(params.promptId);
    if (!mongooseId) {
      return NextResponse.json(
        { msg: 'invalid mondoDB ID' },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    await Prompt.findByIdAndRemove(params.promptId);

    return NextResponse.json(
      { msg: 'Prompt deleted successfully' },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: error.message },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
