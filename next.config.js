const nextConfig = {
  async rewrites() {
    console.log("js config file is running");
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:5000/api/:path*/", // Adjust this if Flask is running on a different port or host
      },
    ];
  },
};

module.exports = nextConfig;
