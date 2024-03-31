

/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    console.log("mjs config file is running");
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Adjust this if Flask is running on a different port or host
      },
    ];
  },
};

export {nextConfig};



