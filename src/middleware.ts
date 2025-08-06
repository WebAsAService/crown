import { defineMiddleware } from 'astro:middleware';

// Security headers configuration
const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' https:",
    "connect-src 'self'",
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

export const onRequest = defineMiddleware((context, next) => {
  // Add security headers to all responses
  const response = next();
  
  response.then((res) => {
    Object.entries(securityHeaders).forEach(([header, value]) => {
      res.headers.set(header, value);
    });
  });

  return response;
});