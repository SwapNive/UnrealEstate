# Real Estate Property Analyzer - Setup Guide

## The CORS Problem

The RapidAPI cannot be called directly from web browsers due to CORS (Cross-Origin Resource Sharing) security restrictions. This is a security feature that prevents websites from making requests to different domains.

## Solution: Simple Backend Server

This project includes a simple Node.js proxy server that:
- Makes API requests on behalf of your web app
- Bypasses CORS restrictions
- Keeps your API key secure on the server

## Quick Setup (5 minutes)

### Prerequisites
- Node.js installed ([download here](https://nodejs.org/))

### Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   ```
   http://localhost:3000/real-estate-app.html
   ```

4. **Try it out:**
   - Click "⚙️ Data Source" in the app
   - Click "🏘️ Realty in US API"
   - Enter a ZIP code (e.g., 95051, 90004, 10001)
   - Click "Load Listings"
   - Real properties will appear! 🎉

## How It Works

```
Browser (real-estate-app.html)
    ↓
    ↓ Makes request to /api/properties
    ↓
Express Server (server.js)
    ↓
    ↓ Makes request with API key
    ↓
RapidAPI (realty-in-us.p.rapidapi.com)
    ↓
    ↓ Returns property data
    ↓
Express Server
    ↓
    ↓ Sends data back
    ↓
Browser displays properties on map
```

## Alternative: Deploy to Cloud

Deploy this to platforms like:
- **Vercel** (easiest for Node.js)
- **Heroku**
- **Railway**
- **DigitalOcean**

They all have free tiers and will handle the backend for you!

## Files Included

- `real-estate-app.html` - Your web app (frontend)
- `server.js` - Proxy server (backend)
- `package.json` - Node.js dependencies
- `README.md` - This file

## Need Help?

Common issues:
- **Port 3000 already in use?** Change `PORT` in server.js to 3001
- **Module not found?** Run `npm install` again
- **API key invalid?** Update the key in server.js line 31

Enjoy your real estate app! 🏠
