import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    prompt: {
      type: String,
      required: [true, 'Prompt is required'],
    },
    tag: {
      type: String,
      required: [true, 'Tag is required'],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
