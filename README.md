# 🍽️ Restaurant App - Premium Food Ordering & Management Platform

A complete, production-ready restaurant application with modern UI/UX, featuring multi-platform support (Web, Mobile), real-time order tracking, table reservations, and a comprehensive admin dashboard.

## ✨ Features

### Customer Features
- 📱 **Multi-Platform Support**: Web app (React) and Mobile app (React Native)
- 🔐 **OTP-Based Authentication**: Secure phone number verification
- 🍕 **Smart Menu Browsing**: Category filters, search, veg/non-veg options
- 🛒 **Advanced Cart System**: Customizations, size selection, special instructions
- 🚚 **Multiple Order Types**: Dine-in, Takeaway, Home Delivery
- 📅 **Table Reservations**: Book tables with date/time selection
- 💳 **Multiple Payment Options**: Cash, UPI, Card, Wallet
- 📦 **Order Tracking**: Real-time order status updates with Socket.io
- ⭐ **Reviews & Ratings**: Rate orders and dishes
- 🎁 **Loyalty Program**: Earn points and redeem offers
- 🌙 **Dark Mode**: Complete dark theme support
- 💰 **Digital Wallet**: Store balance and transaction history

### Restaurant/Admin Features
- 📊 **Dashboard Analytics**: Sales, orders, customer insights
- 📋 **Menu Management**: Add/edit/delete dishes with images
- 📦 **Order Management**: Real-time order processing and status updates
- 📅 **Reservation Management**: Accept/reject table bookings
- 👥 **Customer Management**: View customer profiles and order history
- 📈 **Reports & Analytics**: Revenue trends, top dishes, peak hours

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast builds
- **TailwindCSS** for styling
- **Zustand** for state management
- **React Query** for server state
- **React Router** for navigation
- **Socket.io Client** for real-time updates
- **Framer Motion** for animations

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.io** for real-time communication
- **Twilio** for OTP (optional)

### Mobile (React Native)
- **React Native** with TypeScript
- **React Navigation** for routing
- **NativeBase/React Native Paper** for UI components

## 📁 Project Structure

```
restaurant-app/
├── frontend/                 # React web application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/         # Base components (Button, Card, Input)
│   │   │   ├── features/   # Feature-specific components
│   │   │   └── layout/     # Layout components (Header, Footer)
│   │   ├── screens/        # Page components
│   │   ├── services/       # API service layer
│   │   ├── stores/         # Zustand stores
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Helper functions
│   ├── public/             # Static assets
│   └── package.json
│
├── backend/                 # Express API server
│   ├── src/
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth, validation, etc.
│   │   └── index.ts        # Server entry point
│   └── package.json
│
├── mobile/                  # React Native app
│   ├── src/
│   │   ├── components/     # Mobile UI components
│   │   ├── screens/        # Mobile screens
│   │   └── navigation/     # Navigation setup
│   └── package.json
│
├── docs/                    # Documentation
│   ├── API.md              # API documentation
│   ├── SETUP.md            # Setup guide
│   └── DESIGN.md           # Design system
│
└── package.json            # Root workspace config
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.x
- MongoDB >= 6.x
- pnpm >= 8.x (recommended) or npm

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd restaurant-app
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Setup environment variables**

Backend (.env):
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

4. **Start MongoDB**
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use local MongoDB installation
mongod
```

5. **Start development servers**

```bash
# Start both frontend and backend
pnpm dev

# Or start individually
pnpm dev:frontend  # Frontend on http://localhost:3000
pnpm dev:backend   # Backend on http://localhost:5000
```

6. **Access the application**
- Web App: http://localhost:3000
- API: http://localhost:5000/api
- API Health: http://localhost:5000/api/health

## 📖 Documentation

- **[Setup Guide](docs/SETUP.md)** - Detailed installation and configuration
- **[API Documentation](docs/API.md)** - Complete API reference
- **[Design System](docs/DESIGN.md)** - UI/UX guidelines and components

## 🎨 Design System

### Color Palette
- **Primary Red**: `#C41E3A` - Main CTA, important actions
- **Secondary Orange**: `#FF6B35` - Highlights, badges
- **Dark Green**: `#1B5E20` - Veg indicator
- **Red**: `#FF0000` - Non-veg indicator
- **Accent Gold**: `#FFD700` - Offers, special items
- **Dark**: `#1A1A1A` - Dark mode primary

### Key Components
- **Button**: Primary, Secondary, Ghost, Outline variants
- **Card**: Elevated, Outline variants with shadows
- **Input**: With label, error states, helper text
- **Badge**: Veg/Non-veg indicators, status badges
- **Modal**: Responsive modals with backdrop
- **DishCard**: Product cards with images and actions
- **OrderCard**: Order history with status tracking

## 🔑 Key Features Implementation

### Authentication Flow
1. User enters phone number
2. OTP sent via SMS (Twilio) or console log (dev)
3. OTP verification
4. JWT token generated and stored
5. Auto-login on subsequent visits

### Order Management
1. Browse menu with filters
2. Add items to cart with customizations
3. Select order type (Dine-in/Takeaway/Delivery)
4. Choose payment method
5. Place order
6. Real-time status updates via Socket.io
7. Track delivery (if applicable)
8. Rate and review

### Real-time Updates
- Socket.io integration for live order status
- Kitchen display updates
- Delivery tracking
- Admin dashboard live metrics

## 🛠️ Available Scripts

### Root Level
- `pnpm dev` - Start both frontend and backend
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean all build artifacts

### Frontend
- `pnpm dev:frontend` - Start dev server
- `pnpm build:frontend` - Production build

### Backend
- `pnpm dev:backend` - Start dev server with hot reload
- `pnpm build:backend` - Compile TypeScript

## 📱 Mobile App Setup

```bash
cd mobile

# Install dependencies
pnpm install

# iOS
npx pod-install
npx react-native run-ios

# Android
npx react-native run-android
```

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant-app
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-phone
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
pnpm build
# Deploy dist/ folder
```

### Backend (Railway/Render/AWS)
```bash
cd backend
pnpm build
# Deploy with Node.js 18+ and MongoDB connection
```

### Database (MongoDB Atlas)
- Create cluster at https://cloud.mongodb.com
- Update MONGODB_URI in backend .env

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ by the Restaurant App Team

## 📞 Support

For support, email support@restaurantapp.com or join our Slack channel.

---

**Note**: This is a production-ready application template. Customize according to your restaurant's needs, branding, and business logic.
