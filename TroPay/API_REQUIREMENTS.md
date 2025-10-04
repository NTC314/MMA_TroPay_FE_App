# TroPay App - API Requirements

## 📱 Màn hình hiện tại
Dựa trên phân tích code, ứng dụng hiện có các màn hình sau:
1. **TenantDashboard** - Màn hình chính cho tenant
2. **RoomContract** - Thông tin hợp đồng phòng
3. **Home** & **Explore** - Màn hình mặc định

## 🔗 APIs cần thiết

### 1. **Authentication APIs**
```typescript
// Auth endpoints
POST /api/auth/login
POST /api/auth/register  
POST /api/auth/refresh-token
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

**Request/Response:**
```typescript
// Login
POST /api/auth/login
{
  "email": "tenant@example.com",
  "password": "password123",
  "userType": "tenant" // "tenant" or "landlord"
}

Response: {
  "success": true,
  "data": {
    "user": {
      "id": "tenant_001",
      "email": "tenant@example.com",
      "name": "John Doe",
      "userType": "tenant",
      "avatar": "avatar_url"
    },
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

### 2. **Tenant Dashboard APIs**
```typescript
// Tenant Dashboard
GET /api/tenants/{tenantId}/dashboard
GET /api/tenants/{tenantId}/profile
PUT /api/tenants/{tenantId}/profile
```

**Dashboard Data:**
```typescript
GET /api/tenants/{tenantId}/dashboard
Response: {
  "success": true,
  "data": {
    "profile": {
      "id": "tenant_001",
      "name": "John Doe",
      "avatar": "avatar_url",
      "roomInfo": {
        "roomNumber": "A101",
        "roomType": "Single",
        "monthlyRent": 3500000,
        "dueDate": "2024-11-05",
        "contractStatus": "Active"
      }
    },
    "currentInvoice": {
      "id": "INV-2024-001",
      "totalAmount": 4200000,
      "dueDate": "2024-11-05",
      "status": "Due Soon",
      "items": [
        {
          "id": "1",
          "description": "Monthly Rent",
          "amount": 3500000,
          "type": "rent"
        },
        {
          "id": "2", 
          "description": "Electricity",
          "amount": 450000,
          "type": "electricity"
        }
      ]
    },
    "serviceUsage": {
      "electricity": {
        "amount": 180,
        "unit": "kWh",
        "change": 12,
        "changeType": "increase"
      },
      "water": {
        "amount": 15,
        "unit": "m³", 
        "change": -5,
        "changeType": "decrease"
      }
    },
    "recentUpdates": [
      {
        "id": "1",
        "type": "payment",
        "title": "Payment Received",
        "description": "Your October payment has been processed",
        "timestamp": "2024-10-25T10:30:00Z"
      }
    ]
  }
}
```

### 3. **Room & Contract APIs**
```typescript
// Room Information
GET /api/tenants/{tenantId}/room
GET /api/tenants/{tenantId}/contract
GET /api/rooms/{roomId}/details
```

**Room Contract Data:**
```typescript
GET /api/tenants/{tenantId}/contract
Response: {
  "success": true,
  "data": {
    "contractId": "CONTRACT-001",
    "roomNumber": "A101",
    "contractDuration": "12 months",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "monthlyRent": 3500000,
    "deposit": 7000000,
    "utilities": {
      "electricityRate": 2500,
      "waterRate": 15000,
      "internetIncluded": true
    },
    "rules": [
      "No pets allowed",
      "No smoking inside",
      "Quiet hours: 10 PM - 6 AM"
    ],
    "landlordInfo": {
      "name": "Ms. Smith",
      "phone": "+84901234567",
      "email": "landlord@example.com"
    }
  }
}
```

### 4. **Invoice & Payment APIs**
```typescript
// Invoice Management
GET /api/tenants/{tenantId}/invoices
GET /api/tenants/{tenantId}/invoices/current
GET /api/invoices/{invoiceId}
GET /api/tenants/{tenantId}/payment-history

// Payment Processing
POST /api/payments/vnpay/create
POST /api/payments/vnpay/callback
GET /api/payments/{paymentId}/status
```

**Payment Creation:**
```typescript
POST /api/payments/vnpay/create
{
  "tenantId": "tenant_001",
  "invoiceId": "INV-2024-001", 
  "amount": 4200000,
  "returnUrl": "app://payment-result",
  "description": "Monthly rent payment"
}

Response: {
  "success": true,
  "data": {
    "paymentId": "PAY-001",
    "paymentUrl": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?...",
    "qrCode": "data:image/png;base64,..."
  }
}
```

### 5. **Service Usage APIs**
```typescript
// Utility Usage
GET /api/tenants/{tenantId}/usage/electricity
GET /api/tenants/{tenantId}/usage/water
GET /api/tenants/{tenantId}/usage/internet
GET /api/tenants/{tenantId}/usage/history
```

**Usage Data:**
```typescript
GET /api/tenants/{tenantId}/usage/electricity
Response: {
  "success": true,
  "data": {
    "currentMonth": {
      "amount": 180,
      "unit": "kWh",
      "cost": 450000,
      "period": "2024-10"
    },
    "previousMonth": {
      "amount": 160,
      "unit": "kWh", 
      "cost": 400000,
      "period": "2024-09"
    },
    "change": {
      "amount": 12.5,
      "percentage": 12,
      "type": "increase"
    }
  }
}
```

### 6. **Issue Reporting APIs**
```typescript
// Issue Management
POST /api/tenants/{tenantId}/issues
GET /api/tenants/{tenantId}/issues
PUT /api/issues/{issueId}
GET /api/issues/{issueId}
POST /api/issues/{issueId}/comments
```

**Report Issue:**
```typescript
POST /api/tenants/{tenantId}/issues
{
  "title": "Air conditioner not working",
  "description": "The AC unit in room A101 stopped working yesterday",
  "priority": "high",
  "category": "maintenance",
  "images": ["image1_url", "image2_url"]
}

Response: {
  "success": true,
  "data": {
    "issueId": "ISSUE-001",
    "status": "submitted",
    "ticketNumber": "TR-2024-001"
  }
}
```

### 7. **Communication APIs**
```typescript
// Communication
GET /api/tenants/{tenantId}/notifications
PUT /api/notifications/{notificationId}/read
POST /api/tenants/{tenantId}/messages
GET /api/tenants/{tenantId}/messages
```

### 8. **Feedback APIs**
```typescript
// Feedback System
POST /api/tenants/{tenantId}/feedback
GET /api/tenants/{tenantId}/feedback
POST /api/feedback/{feedbackId}/response
```

## 🔐 Authentication Headers
Tất cả API calls (trừ auth) cần header:
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

## 📊 Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## 🔄 Error Response Format
```typescript
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "message": "Email is required"
    }
  }
}
```

## 🚀 Priorities cho Development

### High Priority (Cần ngay)
1. ✅ **Authentication APIs** - Login/logout
2. ✅ **Tenant Dashboard API** - Dữ liệu tổng quan
3. ✅ **Current Invoice API** - Hóa đơn hiện tại
4. ✅ **VNPay Payment API** - Thanh toán

### Medium Priority
5. **Room Contract APIs** - Chi tiết hợp đồng
6. **Service Usage APIs** - Theo dõi tiện ích
7. **Issue Reporting APIs** - Báo cáo sự cố

### Low Priority
8. **Communication APIs** - Tin nhắn, thông báo
9. **Feedback APIs** - Đánh giá, phản hồi
10. **Advanced Analytics** - Báo cáo chi tiết

## 📝 Notes
- Tất cả dates sử dụng ISO 8601 format (`2024-10-04T10:30:00Z`)
- Amounts sử dụng số nguyên (VND, không dùng decimal)
- Images trả về URLs, không base64
- Pagination sử dụng `page` và `limit` parameters
- Sorting sử dụng `sortBy` và `sortOrder` parameters