# 👤 User Registration API with Profile Picture Upload

A backend API built using **Node.js**, **Express**, and **MongoDB** that allows users to register by providing their name, email, password, and profile picture. User information is securely stored in MongoDB, the profile image is uploaded to **Cloudinary**, and a confirmation email is sent to the user upon successful registration.

---

## ✨ Features

- ✅ User registration with name, email, password, and profile picture
- ☁️ Uploads profile pictures to Cloudinary
- 📧 Sends email confirmation on successful registration
- 🔐 Passwords are securely hashed
- 🌐 Stores user data in MongoDB with Mongoose

---

## 📁 Project Structure
```


Brain Inventory Project/
└── backend/
├── app.js # Express app configuration
├── server.js # Server entry point
├── package.json # Dependencies and scripts
├── .env # Environment variables
├── db/
│ └── db.js # MongoDB connection logic
├── config/
│ └── cloudinary.js # Cloudinary setup
├── middleware/
│ └── cloudinaryUpload.js # Multer + Cloudinary upload logic
├── models/
│ └── user.model.js # Mongoose schema
├── controllers/
│ └── user.controller.js # Business logic (registration)


```

# 📌 Approach


1. **Designed the User Model**  
   I began by creating a Mongoose schema to define the structure of the user data, including fields such as name, email, password, and profile picture URL.

2. **Initialized the App and Server**  
   Set up the core Express application and server configuration to handle incoming requests and responses smoothly.

3. **Created Routes and Controllers**  
   Developed a dedicated registration route and implemented the logic in a controller for tasks like form validation, image handling, and data persistence.

4. **Integrated Cloudinary for Image Uploads**  
   Configured Cloudinary and used Multer to handle profile picture uploads securely and efficiently, ensuring the uploaded file URL is stored in the database.

5. **Implemented Email Notification**  
   Added functionality using Nodemailer to send confirmation emails to users upon successful registration, laying the foundation for future email-based features like verification or welcome messages.



---


## ⚙️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **Multer** for handling multipart form data
- **Cloudinary** for image storage
- **Nodemailer** for email service
- **dotenv** for environment configuration
- **bcrypt** for password hashing

---

## 🚀 How to Run This API

Follow the steps below to get the API running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/the-y0gi/Brain-Inventory-Project
cd "Brain Inventory User Register Project/backend"
otherwise
cd backend
```
### 2. Install Dependencies

```bash
npm instatll
```
### 3. Setup Environment Variables
Create a .env file inside the backend/ folder and add the following:

```bash

PORT=4000
MONGO_URI=mongodb://0.0.0.0:27017/user-registration
JWT_SECRET=83yrhuibffiigo283griuwefakrueawerqu0hj83*
CLOUD_NAME=dwfolqpht
API_KEY=276494962285589
API_SECRET=J88JIYKA40fw_fQzz9H73TwJuqY
EMAIL=xoxo29021992@gmail.com
PASS_KEY=hfxt xpvp mlvw joni

```

### 4. Start the Server

```bash
npx nodemon
```

### 📬 API Endpoint
POST /api/register
Registers a new user with name, email, password, and profile picture.

Content-Type:
```bash
multipart/form-data
```
Required Fields:
```
| Field    | Type   | Description             |
|----------|--------|-------------------------|
| username | string | Full name of the user   |
| email    | string | Email address           |
| password | string | Plain text password     |
| image    | file   | Profile picture (image) |

```

Example Respones: 
```
{
  "message": "User registered successfully. Please check your email for confirmation.",
  "user": {
    "_id": "123abc456",
    "username": "demo",
    "email": "demo@example.com",
    "image": "https://res.cloudinary.com/..."
  }
}

```
### 📸 Profile Picture Upload

-> Handled using Multer to process multipart/form-data

-> Image is uploaded to Cloudinary

-> The secure Cloudinary URL is saved in the MongoDB user document

### 🛡️ Password Security
-> Passwords are hashed using bcrypt

-> Not stored or transmitted in plain text

-> Safe for production use

### 📧 Email Confirmation
--> Confirmation email is sent after successful registration using Nodemailer

--> Can be extended for email verification, activation, or welcome messages

### 📈 Future Improvements
--> 🔐 JWT-based login & authentication

--> ✅ Email verification link with token

-->👤 User login & profile update APIs

-->🌍 Deployment on platforms like Render, Vercel, or Railway

### 🙋‍♂️ Author
 Yogesh Gadhewal
 
💻 Full-Stack Developer

📫 https://github.com/the-y0g

