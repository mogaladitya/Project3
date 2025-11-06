const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.getCart = async (req, res) =>   {
  try{
    const items = await CartItem.find({}).populate('product').lean();
    const mapped = items.map((ci) =>({
      id: ci._id.toString(),
      productId: ci.product._id.toString(),
      title: ci.product.title,
      price: ci.product.price,
      description: ci.product.description,
      qty: ci.qty
    }));
    const total = mapped.reduce((sum, i) => sum + i.price * i.qty, 0);
    res.json({ items: mapped, total });
  }
  catch (err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToCart = async (req, res) =>{
  try{
    let { productId, qty, product } = req.body;
    qty = parseInt(qty) || 1;

    if (!productId && product && product.id){
      productId = product.id;
    }

    let prod = await Product.findById(productId);

    if (!prod && product){
      prod = await Product.create({
        _id: mongoose.Types.ObjectId(productId),
        title: product.title,
        price: product.price,
        description: product.description
      }).catch(async () =>{
        prod = await Product.create({
          title: product.title,
          price: product.price,
          description: product.description
        });
        return prod;
      });
    }

    if (!prod){
      return res.status(400).json({ message: 'Product not found' });
    }

    let existing = await CartItem.findOne({ product: prod._id });

    if (existing){
      existing.qty = existing.qty + qty;
      await existing.save();
      return res.json({ message: 'Quantity updated', itemId: existing._id.toString() });
    }

    const newItem = await CartItem.create({ product: prod._id, qty });
    res.status(201).json({ message: 'Added to cart', itemId: newItem._id.toString() });
  }
  catch (err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFromCart = async (req, res) =>
{
  try{
    const id = req.params.id;
    await CartItem.findByIdAndDelete(id);
    res.json({ message: 'Item removed' });
  }
  catch (err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateQty = async (req, res) =>
{
  try{
    const id = req.params.id;
    const { qty } = req.body;

    if (!qty || qty < 1){
      return res.status(400).json({ message: 'Invalid qty' });
    }

    const item = await CartItem.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    item.qty = qty;
    await item.save();
    res.json({ message: 'Qty updated' });
  }
  catch (err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
