require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const typeDefs = require('./schema/user');
const resolvers = require('./resolver/user');
const User = require('./models/user');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));




// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return next(); // Allow unauthenticated requests for signup/login
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    console.error('JWT verification failed:', err.message);
  }
  next();
};

app.use(cors());
app.use(express.json());
app.use(authMiddleware);

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => ({ user: req.user, UserModel: User }),
  }));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

startServer();