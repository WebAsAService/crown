// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import path from 'path';

// Security headers middleware
const securityHeaders = (req, res, next) => {
  // Content Security Policy
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' https:; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none';"
  );
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Control referrer information
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy (formerly Feature Policy)
  res.setHeader('Permissions-Policy', 
    'camera=(), ' +
    'microphone=(), ' +
    'geolocation=(), ' +
    'gyroscope=(), ' +
    'magnetometer=(), ' +
    'payment=(), ' +
    'usb=()'
  );
  
  next();
};

// https://astro.build/config
export default defineConfig({
  // Enable Tailwind CSS integration
  integrations: [tailwind()],
  // Configure site metadata
  site: 'https://your-site-domain.com',
  // Configure build output
  build: {
    // You can customize the build output here
  },
  // Configure server options for development
  server: {
    port: 3000,
  },
  // Configure path aliases and security headers
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@styles': path.resolve('./src/styles'),
        '@utils': path.resolve('./src/utils')
      }
    },
    server: {
      middlewareMode: false,
      configure: (server) => {
        server.middlewares.use(securityHeaders);
      }
    }
  }
});
