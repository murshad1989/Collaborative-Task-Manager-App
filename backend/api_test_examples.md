# API Testing Guide

## Authentication APIs

### 1. Register User
```http
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "Test123!"
}
```

### 2. Login
```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
    "email": "testuser@example.com",
    "password": "Test123!"
}
```

### 3. Get Profile
```http
GET http://localhost:3000/api/auth/profile
Authorization: Bearer YOUR_TOKEN_HERE
```

## Task APIs

### 1. Create Task
```http
POST http://localhost:3000/api/tasks
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
    "title": "Important Meeting",
    "description": "Team meeting to discuss project progress",
    "priority": "high",
    "due_date": "2025-02-10T10:00:00",
    "assigned_users": [2, 3]
}
```

### 2. Get All Tasks
```http
GET http://localhost:3000/api/tasks
Authorization: Bearer YOUR_TOKEN_HERE
```

### 3. Get Tasks with Filters
```http
GET http://localhost:3000/api/tasks?status=pending&priority=high&sort=due_date
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. Update Task
```http
PUT http://localhost:3000/api/tasks/1
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
    "title": "Updated Meeting",
    "description": "Updated description",
    "priority": "medium",
    "status": "in_progress",
    "due_date": "2025-02-15T10:00:00",
    "assigned_users": [2, 4]
}
```

### 5. Delete Task
```http
DELETE http://localhost:3000/api/tasks/1
Authorization: Bearer YOUR_TOKEN_HERE
```

### 6. Get Task Analytics
```http
GET http://localhost:3000/api/tasks/analytics
Authorization: Bearer YOUR_TOKEN_HERE
```

## Notification APIs

### 1. Get All Notifications
```http
GET http://localhost:3000/api/notifications
Authorization: Bearer YOUR_TOKEN_HERE
```

### 2. Mark Notification as Read
```http
PUT http://localhost:3000/api/notifications/1/read
Authorization: Bearer YOUR_TOKEN_HERE
```

### 3. Mark All Notifications as Read
```http
PUT http://localhost:3000/api/notifications/read-all
Authorization: Bearer YOUR_TOKEN_HERE
```

### 4. Delete Notification
```http
DELETE http://localhost:3000/api/notifications/1
Authorization: Bearer YOUR_TOKEN_HERE
```

## Testing Steps:

1. پہلے register API کو کال کریں اور نیا اکاؤنٹ بنائیں
2. login API سے token حاصل کریں
3. یہ token ہر request کے ہیڈر میں Authorization: Bearer YOUR_TOKEN_HERE کی شکل میں استعمال کریں
4. پھر باقی APIs کو ٹیسٹ کریں

## Notes:
- ہر API کال میں Content-Type: application/json ہیڈر ضروری ہے
- Authentication والی APIs کے لیے Bearer token ضروری ہے
- due_date ISO format میں ہونی چاہیے (YYYY-MM-DDTHH:mm:ss)
- assigned_users میں user IDs کی array ہونی چاہیے
