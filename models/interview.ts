import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const interviewSchema = new Schema({
  role: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    required: true,
    trim: true
  },
  techstack: {
    type: [String], // Array of strings
    required: true,
    validate: {
      validator: (techstack: string[]) => techstack.length > 0,
      message: 'At least one technology must be specified'
    }
  },
  questions: {
    type: [String], // Array of strings (parsed from JSON)
    required: true,
    validate: {
      validator: (questions: string[]) => questions.length > 0,
      message: 'At least one question must be specified'
    }
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  finalized: {
    type: Boolean,
    default: true
  },
  coverImage: {
    type: String,
    required: true,
    default: function() {
      // You can implement your getRandomInterviewCover() logic here
      const covers = [
        '/covers/interview1.jpg',
        '/covers/interview2.jpg',
        '/covers/interview3.jpg'
      ];
      return covers[Math.floor(Math.random() * covers.length)];
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better query performance
interviewSchema.index({ userId: 1 });
interviewSchema.index({ role: 1, level: 1 });
interviewSchema.index({ techstack: 1 });

// Add virtuals or methods if needed
interviewSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString();
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;