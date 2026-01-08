# Setup Guide

Complete guide to set up the Restaurant App on your local machine.

## Prerequisites

### Required Software
- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **MongoDB** >= 6.0 ([Download](https://www.mongodb.com/try/download/community))
- **pnpm** >= 8.0.0 (Install: `npm install -g pnpm`)
- **Git** ([Download](https://git-scm.com/))

### Optional Software
- **Docker** (for containerized MongoDB)
- **MongoDB Compass** (GUI for MongoDB)
- **Postman** (API testing)

## Installation Steps

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd restaurant-app
```

### 2. Install Dependencies

```bash
# Install all workspace dependencies
pnpm install
```

### 3. Setup MongoDB

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod

# Verify connection
mongosh
```

#### Option B: Docker
```bash
# Run MongoDB in Docker
docker run -d \
  -p 27017:27017 \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest

# Verify
docker ps
```

#### Option C: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Use in .env file

### 4. Configure Environment Variables

#### Backend Configuration
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development

# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/restaurant-app

# Or MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant-app

JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=7d

# Optional: Twilio for OTP
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=your-phone-number

FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Seed Database (Optional)

Create sample data for testing:

```bash
cd backend
node scripts/seed.js
```

Or manually create data using MongoDB Compass or the API.

### 6. Start Development Servers

#### Start Both (Recommended)
```bash
# From root directory
pnpm dev
```

#### Start Individually
```bash
# Terminal 1: Backend
pnpm dev:backend

# Terminal 2: Frontend
pnpm dev:frontend
```

### 7. Verify Installation

1. **Backend Health Check:**
   - Visit: http://localhost:5000/api/health
   - Should see: `{"status": "ok", "message": "Server is running"}`

2. **Frontend:**
   - Visit: http://localhost:3000
   - Should see the restaurant homepage

3. **Database:**
   - Connect MongoDB Compass to `mongodb://localhost:27017`
   - Check for `restaurant-app` database

## Development Workflow

### Project Structure
```
restaurant-app/
├── frontend/         # React app (Port 3000)
├── backend/          # Express API (Port 5000)
└── mobile/           # React Native (optional)
```

### Hot Reload
- Frontend: Vite provides instant hot reload
- Backend: ts-node-dev automatically restarts on changes

### Making Changes

1. **Frontend Changes:**
   - Edit files in `frontend/src/`
   - Changes reflect immediately in browser

2. **Backend Changes:**
   - Edit files in `backend/src/`
   - Server restarts automatically

3. **Database Schema Changes:**
   - Update models in `backend/src/models/`
   - Restart backend server

## Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

### MongoDB Connection Error
- Verify MongoDB is running: `mongosh`
- Check MONGODB_URI in .env
- Ensure no firewall blocking port 27017

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

### TypeScript Errors
```bash
# Rebuild TypeScript
cd backend
pnpm build
```

### CORS Errors
- Verify FRONTEND_URL in backend .env matches frontend URL
- Check CORS configuration in `backend/src/index.ts`

## Testing

### Manual Testing
1. Register new user with phone number
2. Browse menu
3. Add items to cart
4. Place order
5. Check order status

### API Testing with Postman
1. Import collection from `docs/postman-collection.json`
2. Set environment variables
3. Run requests

## Production Build

### Frontend
```bash
cd frontend
pnpm build
# Output in frontend/dist/
```

### Backend
```bash
cd backend
pnpm build
# Output in backend/dist/
```

### Environment Setup
- Set `NODE_ENV=production`
- Use secure JWT_SECRET
- Use production MongoDB URL
- Enable HTTPS

## Mobile App Setup (React Native)

### Prerequisites
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation
```bash
cd mobile
pnpm install

# iOS
npx pod-install
npx react-native run-ios

# Android
npx react-native run-android
```

## Docker Setup (Optional)

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/restaurant-app

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

Run:
```bash
docker-compose up
```

## Next Steps

1. Customize restaurant details in database
2. Add menu items with images
3. Configure payment gateway (Razorpay/Stripe)
4. Set up Twilio for SMS OTP
5. Deploy to production

## Support

For issues or questions:
- Check GitHub Issues
- Read API documentation in `docs/API.md`
- Contact: support@restaurantapp.com
