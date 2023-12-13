import express from 'express';
import { userDB } from '../database/userDB.js';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

const secret = 'secret123';

userRouter.get('/cart', (req, res) => {
  res.redirect('/');
});
userRouter.get('/login', (req, res) => {
  res.redirect('/');
});
userRouter.get('/register', (req, res) => {
  res.redirect('/');
});
userRouter.get('/user', async (req, res) => {
  try {
    const payload = jwt.verify(req.cookies.token, secret);
    const user = await userDB.getUserByID(payload.id);
    res.json({ user });
    // Handle the user data and send the response
  } catch (error) {
    // Handle token verification error
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

userRouter.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await userDB.getUserByEmail(email);
  if (existingUser) return res.sendStatus(401);
  const hashedPassword = await bycrypt.hash(password, 10);
  const user = { email, hashedPassword };
  const data = await userDB.register(user);
  jwt.sign({ id: data.insertedId, email: email }, secret, (err, token) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.cookie('token', token).json({ id: data.insertedId, email: email });
    }
  });
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userDB.getUserByEmail(email);
  if (!user) return res.sendStatus(401);
  const verify = bycrypt.compareSync(password, user.password);
  if (verify) {
    jwt.sign({ id: user._id, email: user.email }, secret, (err, token) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.cookie('token', token).json({ id: user._id, email: user.email });
      }
    });
  } else {
    res.sendStatus(401);
  }
});

userRouter.post('/logout', (req, res) => {
  res.cookie('token', '').send();
});
export default userRouter;
