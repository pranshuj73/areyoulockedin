import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Exclude libSQL packages from client-side bundle since they're server-only
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@libsql/client': false,
        '@libsql/isomorphic-fetch': false,
        '@libsql/isomorphic-ws': false,
        '@prisma/adapter-libsql': false,
      };
    }
    
    // Add externals for server-side to prevent bundling
    if (isServer) {
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push({
          '@libsql/client': 'commonjs @libsql/client',
          '@prisma/adapter-libsql': 'commonjs @prisma/adapter-libsql',
        });
      }
    }
    
    // Ignore specific problematic files
    config.module.rules.push({
      test: /\.(md|LICENSE)$/,
      type: 'javascript/auto',
      use: 'null-loader',
    });
    
    // Handle .node files (native binaries)
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });
    
    return config;
  },
};

export default nextConfig;
