const express = require('express');
const http = require('http');
const { Server } = require('socket.io'); // Correct import
const Message = require('./models/Message');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('dotenv').config();
require('./config/passport');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const server = http.createServer(app); // ✅ Use this for Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ✅ Match frontend origin
    credentials: true,
  },
});

// ✅ Connect DB
connectDB();

// ✅ CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie'],
};
app.use(cors(corsOptions));

// ✅ Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboardcat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
}));

// ✅ Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
const authRoutes = require('./routes/authRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/chat', chatRoutes);

app.use('/api/admin', adminRoutes);
// ✅ Home route
app.get('/', (req, res) => {
  res.send('QuickDeliver Lite API is running');
});

// ✅ Socket.IO setup
io.on('connection', (socket) => {
  console.log('✅ New socket connected');

  socket.on('joinRoom', ({ deliveryId }) => {
    socket.join(deliveryId);
  });

  socket.on('sendMessage', async ({ deliveryId, sender, message }) => {
    try {
      const newMessage = await Message.create({ deliveryId, sender:sender._id, message });
      io.to(deliveryId).emit('newMessage', {
        ...newMessage._doc,
        deliveryId,
        sender: {
          _id: sender._id,
          name: sender.name,
          avatar: sender.avatar,
        },
      });
    } catch (err) {
      console.error('❌ Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('🚪 Socket disconnected');
  });
});

// ✅ Start the actual server using HTTP server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚚 Server running on http://localhost:${PORT}`);
});
