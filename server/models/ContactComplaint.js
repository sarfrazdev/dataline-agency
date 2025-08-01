import mongoose from 'mongoose';

const contactComplaintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true
    },
    isSeen: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model('ContactComplaint', contactComplaintSchema);
