# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### POST /auth/send-otp
Send OTP to phone number

**Request Body:**
```json
{
  "phone": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### POST /auth/verify-otp
Verify OTP and get JWT token

**Request Body:**
```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "123",
    "phone": "9876543210",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## User Endpoints

### GET /users/profile
Get current user profile (Authenticated)

**Response:**
```json
{
  "_id": "123",
  "phone": "9876543210",
  "name": "John Doe",
  "email": "john@example.com",
  "addresses": [],
  "wallet": {
    "balance": 500,
    "history": []
  },
  "loyaltyPoints": 100
}
```

### PUT /users/profile
Update user profile (Authenticated)

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

### POST /users/addresses
Add new address (Authenticated)

**Request Body:**
```json
{
  "type": "home",
  "street": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "zip": "400001",
  "landmark": "Near Park",
  "isDefault": true
}
```

## Menu Endpoints

### GET /menu/categories
Get all menu categories

**Response:**
```json
[
  {
    "_id": "starters",
    "name": "Starters",
    "slug": "starters",
    "sortOrder": 0
  }
]
```

### GET /menu/dishes
Get all dishes with optional filters

**Query Parameters:**
- `category` - Filter by category slug
- `search` - Search in name and description
- `isVeg` - Filter vegetarian (true/false)

**Response:**
```json
[
  {
    "_id": "dish123",
    "name": "Paneer Tikka",
    "description": "Grilled cottage cheese",
    "price": 250,
    "image": "/images/paneer-tikka.jpg",
    "category": "starters",
    "isVeg": true,
    "isAvailable": true,
    "rating": 4.5,
    "reviewsCount": 120
  }
]
```

### GET /menu/dishes/:id
Get single dish details

## Order Endpoints

### POST /orders
Create new order (Authenticated)

**Request Body:**
```json
{
  "items": [
    {
      "dishId": "dish123",
      "quantity": 2,
      "selectedSize": "full",
      "customizations": []
    }
  ],
  "orderType": "delivery",
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zip": "400001"
  },
  "subtotal": 500,
  "tax": 90,
  "deliveryCharge": 40,
  "discount": 0,
  "total": 630,
  "paymentMethod": "upi",
  "orderNotes": "Less spicy"
}
```

### GET /orders
Get user's orders (Authenticated)

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status

### GET /orders/:id
Get order details (Authenticated)

### PUT /orders/:id/cancel
Cancel order (Authenticated)

### GET /orders/:id/track
Track order status (Authenticated)

### POST /orders/:id/rate
Rate and review order (Authenticated)

**Request Body:**
```json
{
  "rating": 5,
  "review": "Excellent food!",
  "images": ["url1", "url2"]
}
```

## Reservation Endpoints

### POST /reservations
Create table reservation (Authenticated)

**Request Body:**
```json
{
  "date": "2024-01-15",
  "time": "19:00",
  "guestCount": 4,
  "specialNotes": "Window seat preferred"
}
```

### GET /reservations
Get user's reservations (Authenticated)

### GET /reservations/:id
Get reservation details (Authenticated)

### PUT /reservations/:id
Update reservation (Authenticated)

### DELETE /reservations/:id
Cancel reservation (Authenticated)

## Review Endpoints

### POST /reviews
Submit review (Authenticated)

**Request Body:**
```json
{
  "orderId": "order123",
  "rating": 5,
  "comment": "Amazing food and service!",
  "images": ["url1", "url2"]
}
```

### GET /reviews
Get all reviews

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `rating` - Filter by rating

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error
