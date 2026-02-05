import { Product } from '../models/Product.js';

export const getProducts = async (_req, res) => {
  const products = await Product.find().sort({ name: 1 });
  res.json(products);
};

export const createProduct = async (req, res) => {
  const { name, category, sku, price, stock } = req.body;

  if (!name || !sku || price === undefined || stock === undefined) {
    return res.status(400).json({ message: 'Missing required product fields.' });
  }

  const existingProduct = await Product.findOne({ sku });
  if (existingProduct) {
    return res.status(409).json({ message: 'SKU already exists.' });
  }

  const product = await Product.create({
    name,
    category,
    sku,
    price: Number(price),
    stock: Number(stock)
  });

  return res.status(201).json(product);
};
