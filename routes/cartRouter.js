import { userDB } from '../database/userDB.js';
import express from 'express';

const cartRouter = express.Router();

cartRouter.put('/update', async (req, res) => {
  const { email, updatedCart } = req.body;
  const data = await userDB.updateCart(email, updatedCart);
  res.status(200).json(data);
});
export default cartRouter;
