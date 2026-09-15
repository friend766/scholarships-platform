import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';

dotenv.config();

// Set public Google/Cloudflare DNS servers for reliable SRV resolution on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  // Ignore if unsupported
}

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb+srv://thewayofedit7792_db_user:a1rnioucUU4GcYf3@cluster0.k2yn5ax.mongodb.net/scholarships_platform?retryWrites=true&w=majority';

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_URL, {
      serverSelectionTimeoutMS: 10000,
      family: 4
    });
    console.log(`[MongoDB Atlas] Successfully connected to Cluster: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Connection Warning] ${error.message}`);
    console.log('[MongoDB Fallback] Running in hybrid mode.');
    return null;
  }
};
