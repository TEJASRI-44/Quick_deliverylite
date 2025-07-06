# 🚚 QuickDeliver Lite

**QuickDeliver Lite** is a full-stack logistics and delivery tracking system built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It supports multiple user roles (Customer, Driver, and Admin), enabling seamless delivery request management, real-time tracking, and feedback handling.

---

## 🌟 Features

### 👤 Authentication & Authorization
- Role-based login system for Customers, Drivers, and Admins
- Google OAuth integration
- JWT-based session handling
- OTP email verification (for added security)

### 📦 Delivery Management
- Customers can:
  - Create new delivery requests
  - View current and past deliveries
  - Cancel pending deliveries
  - Provide feedback after completion
- Drivers can:
  - View pending deliveries
  - Accept and mark deliveries as In-Transit or Completed

### 🛠 Admin Panel
- View and manage all users, deliveries, and feedbacks
- Edit or remove inappropriate content
- Monitor platform activity

### 💬 Real-Time Chat
- Built-in customer-driver live chat system

---

## 🧰 Tech Stack

| Layer      | Technology                        |
|------------|------------------------------------|
| Frontend   | React.js, Custom CSS               |
| Backend    | Node.js, Express.js                |
| Database   | MongoDB (Mongoose)                 |
| Auth       | JWT, Passport.js, Google OAuth     |
| Deployment | GitHub (CI/CD Ready)               |

---

## 🧑‍💻 Folder Structure

```
QuickDeliverLite/
├── client/                 # Frontend - React.js
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
│   └── package.json
├── server/                 # Backend - Node.js + Express
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
├── README.md
├── package.json
```

---

## 📝 Setup Instructions

### ⚙️ Prerequisites
- Node.js & npm
- MongoDB
- Google Cloud Console OAuth credentials (Client ID & Secret)

### 🚀 Installation

```bash
# Clone the repo
git clone https://github.com/momintaj-shaik-4/QuickDeliveryLite.git

# Install dependencies
cd QuickDeliveryLite/client
npm install

cd ../server
npm install
```

### 🔐 Environment Variables

Create a `.env` file in the `/server` folder:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

---

### 💻 Run the App

```bash
# Start the backend
cd server
npm start

# Start the frontend
cd ../client
npm run dev
```

App will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📌 Future Scope

- 🔔 Push notifications for status updates  
- 📍 Delivery location tracking via Google Maps API  
- 💳 Payment integration for premium deliveries  
- 📱 Progressive Web App (PWA) support  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📷 Screenshots

Include screenshots of the following (optional):
- 🔐 Login Page  
- 🚚 Delivery Request Form  
- 🧑‍✈️ Driver Dashboard  
- 🛠 Admin Panel  

---

## ✨ Contributors

- [@momintaj-shaik-4](https://github.com/momintaj-shaik-4)
- [@DarsiDharani](https://github.com/DarsiDharani)

---
