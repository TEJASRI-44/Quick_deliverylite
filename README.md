# 🚚 QuickDeliver Lite

QuickDeliver Lite is a logistics and delivery tracking system built using the **MERN stack**. It supports two user roles: **Customer** and **Driver**. Customers can create delivery requests and track their packages, while drivers can accept and update delivery statuses. The system also includes feedback and profile features for both users.

---

## 📌 Features

### 👥 User Authentication
- Register & Login with role selection (Customer or Driver)
- Google Login using OAuth
- Secure password hashing (bcrypt)
- JWT-based authentication and protected routes

### 📦 Delivery Management
- Customers can create delivery requests with:
  - Pickup Address
  - Dropoff Address
  - Package Note
- Deliveries are created with status `"Pending"` and timestamped
- Drivers can:
  - View all pending deliveries
  - Accept deliveries (one driver per delivery)
  - Update status from: `Accepted → In Transit → Delivered`

### 🌟 Feedback & Profile
- After delivery, customers can rate drivers (1–5 stars + comment)
- Profile pages:
  - Customers: View delivery history and give feedback
  - Drivers: View accepted/completed deliveries and ratings

### 🎨 UI Design
- Custom CSS (no Tailwind or Bootstrap)
- Navigation links: Login, Dashboard, Profile, Logout
- Flash messages (e.g., “Delivery Accepted”, “Logged Out”)

---

## 🧰 Technology Stack

- **Frontend**: React.js, Axios, React Router, Custom CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT, Google OAuth (Passport.js)
- **Tools**: Git, GitHub, Postman, VS Code

---

## 🚀 How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/momintaj-shaik-4/QuickDeliveryLite.git
cd QuickDeliveryLite
2. Install Dependencies
bash
Copy
Edit
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
3. Setup Environment Variables
Create a .env file in the server/ folder with:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
4. Run the App
bash
Copy
Edit
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
📁 Folder Structure
bash
Copy
Edit
QuickDeliveryLite/
│
├── client/         # React Frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
│
├── server/         # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
🌐 GitHub Link
🔗 QuickDeliver Lite GitHub Repository



