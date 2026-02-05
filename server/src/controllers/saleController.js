import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { Sale } from '../models/Sale.js';

export const getSales = async (_req, res) => {
  const sales = await Sale.find().sort({ createdAt: -1 }).limit(20);
  res.json(sales);
};

export const checkoutSale = async (req, res) => {
  const { items, paymentMethod, cashier } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty.' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const saleItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);

      if (!product || !product.isActive) {
        throw new Error(`Product ${item.productId} is unavailable.`);
      }

      const quantity = Number(item.quantity);
      if (product.stock < quantity) {
        throw new Error(`Insufficient stock for ${product.name}.`);
      }

      product.stock -= quantity;
      await product.save({ session });

      const subtotal = quantity * product.price;
      total += subtotal;

      saleItems.push({
        product: product._id,
        name: product.name,
        quantity,
        price: product.price,
        subtotal
      });
    }

    const sale = await Sale.create(
      [
        {
          items: saleItems,
          total,
          paymentMethod: paymentMethod || 'Cash',
          cashier: cashier || 'Owner'
        }
      ],
      { session }
    );

    await session.commitTransaction();
    return res.status(201).json(sale[0]);
  } catch (error) {
    await session.abortTransaction();
    return res.status(400).json({ message: error.message || 'Failed to checkout sale.' });
  } finally {
    session.endSession();
  }
};
