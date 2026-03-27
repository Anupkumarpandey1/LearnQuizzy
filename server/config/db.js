import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Connection string:', process.env.MONGODB_URI ? 'Present' : 'Missing');
    process.exit(1);
  }
};

export default connectDB;
