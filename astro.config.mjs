// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import path from 'path';

// Security headers configuration
const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'", 
    "img-src 'self' data: https:",
    "font-src 'self' https:",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
    "frame-ancestors 'none'"
  ].join('; '),
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'gyroscope=()',
    'magnetometer=()',
    'payment=()',
    'usb=()'
  ].join(', ')
};

// Development middleware for security headers
const securityMiddleware = (req, res, next) => {
  Object.entries(securityHeaders).forEach(([header, value]) => {
    res.setHeader(header, value);
  });
  next();
};

// https://astro.build/config
export default defineConfig({
  // Enable Tailwind CSS integration
  integrations: [
    tailwind(),
    sitemap({
      // Excludes the orphaned /clients/crown duplicate (near-identical to
      // the real homepage — would read as duplicate content) and internal
      // theme dev/demo pages, none of which are real public pages.
      filter: (page) =>
        !page.includes('/clients/') &&
        !page.includes('/theme-demo') &&
        !page.includes('/theme-test')
    })
  ],
  // Configure site metadata
  site: 'https://crownag.com',
  // Static site generation (default)
  output: 'static',
  // Configure build output
  build: {
    // You can customize the build output here
  },
  // Configure server options for development
  server: {
    port: 3000,
    headers: securityHeaders
  },
  // Configure path aliases and dev server
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
        server.middlewares.use(securityMiddleware);
      }
    }
  }
});
