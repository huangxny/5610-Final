import express from 'express';
import { productDB } from '../database/productDB.js';

const productRouter = express.Router();

productRouter.post('/tires', (req, res) => {
  const { name, price, width, diameter, aspectRatio } = req.body;
  if (!name || !price || !width || !diameter || !aspectRatio) {
    return res.sendStatus(400);
  }

  const newTire = {
    name: name,
    price: parseFloat(price),
    width: parseInt(width),
    diameter: parseInt(diameter),
    aspectRatio: parseInt(aspectRatio),
  };

  productDB
    .insertOne(newTire)
    .then(() => {
      res.json(newTire);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

productRouter.get('/tires', async (req, res) => {
  try {
    const { sort, order } = req.query;
    let tires;
    if (sort && order) {
      tires = await productDB.getAllProduct(sort, order);
    } else {
      tires = await productDB.getAllProduct();
    }
    res.status(200).json(tires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

productRouter.get('/tires/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const tire = await productDB.getProductById(id);
    res.status(200).json(tire);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
productRouter.delete('/tires/:id', (req, res) => {
  const id = req.params.id;
  productDB
    .deleteOne(id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});
export default productRouter;
