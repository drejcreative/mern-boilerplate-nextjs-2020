import mongoose from 'mongoose';

const { String, Boolean } = mongoose.Schema.Types;

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.List || mongoose.model('List', ListSchema);