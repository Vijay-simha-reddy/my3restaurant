import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server be opened through an ngrok tunnel (dev only; no effect in production).
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.app", "*.ngrok.io", "*.ngrok.dev"],
};

export default nextConfig;
