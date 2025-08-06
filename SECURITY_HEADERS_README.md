# Security Headers Implementation

This project includes comprehensive security headers to protect against common web vulnerabilities.

## Headers Implemented

### 🛡️ Content-Security-Policy (CSP)
Prevents XSS attacks by controlling which resources can be loaded.
- **Current Policy**: Allows self-hosted content, inline scripts/styles for development
- **Recommendation**: Tighten policy for production by removing 'unsafe-inline'

### 🚫 X-Frame-Options
Prevents clickjacking attacks.
- **Value**: `SAMEORIGIN` - allows framing by same origin

### 🔒 X-Content-Type-Options  
Prevents MIME type sniffing attacks.
- **Value**: `nosniff` - forces browsers to respect declared content types

### 🌐 Referrer-Policy
Controls referrer information sent with requests.
- **Value**: `strict-origin-when-cross-origin` - balanced privacy and functionality

### 📱 Permissions-Policy
Restricts access to browser features.
- **Disabled**: camera, microphone, geolocation, gyroscope, magnetometer, payment, usb

## Implementation Details

### Development Server
Headers are automatically applied via:
- Astro config `server.headers`
- Vite middleware for fallback

### Production Builds
Headers work through multiple mechanisms:

#### 1. Astro Middleware (`src/middleware.ts`)
- Works with SSR/hybrid output modes
- Applies headers to all responses server-side

#### 2. Static File Headers
- **Netlify**: `public/_headers` file
- **Vercel**: `vercel.json` configuration

#### 3. Web Server Configuration (if self-hosting)
Add to your web server config:

**Nginx:**
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self'; frame-ancestors 'none'";
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), gyroscope=(), magnetometer=(), payment=(), usb=()";
```

**Apache (.htaccess):**
```apache
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self'; frame-ancestors 'none'"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=(), gyroscope=(), magnetometer=(), payment=(), usb=()"
```

## Testing Headers

Test your security headers using:
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- Browser developer tools (Network tab)

## Customization

To modify headers, update the `securityHeaders` object in:
- `astro.config.mjs` (development)
- `src/middleware.ts` (production SSR)
- `public/_headers` (Netlify)
- `vercel.json` (Vercel)

## CSP Tightening for Production

For maximum security, consider tightening the CSP policy:

```javascript
const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'", // Remove 'unsafe-inline' 'unsafe-eval'
    "style-src 'self'",  // Remove 'unsafe-inline'
    "img-src 'self' data: https:",
    "font-src 'self' https:",
    "connect-src 'self'",
    "frame-ancestors 'none'"
  ].join('; ')
};
```

This may require refactoring inline scripts and styles to external files.