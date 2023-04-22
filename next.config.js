/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { unoptimized: true },
  env: {
    TELEGRAM_BOT_API_KEY: process.env.TELEGRAM_BOT_API_KEY,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    IP_2_LOCATION_ID: process.env.IP_2_LOCATION_ID,
  },
};

module.exports = nextConfig;
