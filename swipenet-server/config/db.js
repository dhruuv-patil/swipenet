import mongoose from 'mongoose';
import dns from 'dns';

// Resolve MongoDB Atlas SRV records using public reliable DNS resolvers (Google & Cloudflare)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Continue with default DNS if overriding is restricted
}

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/swipenet';
    await mongoose.connect(mongoUri, {
      dbName: 'swipenet',
      serverSelectionTimeoutMS: 8000,
    });

    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    if (err.message.includes('querySrv ENOTFOUND')) {
      console.error(
        '💡 Troubleshooting querySrv ENOTFOUND:\n' +
        '  1. Re-copy the exact connection URI from MongoDB Atlas (Database -> Connect -> Drivers).\n' +
        '  2. If the cluster was just created, wait 1-2 minutes for Atlas DNS propagation.\n' +
        '  3. Ensure Network Access in MongoDB Atlas has 0.0.0.0/0 whitelisted.\n' +
        '  4. If your cluster was paused in MongoDB Atlas, click "Resume" in the dashboard.'
      );
    }
    process.exit(1);
  }
};

export default connectDB;
