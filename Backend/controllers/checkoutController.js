const CartItem = require('../models/CartItem');

exports.checkout = async (req, res) =>
{
  try{
    const { cartItems, user } = req.body;

    const items = await CartItem.find({}).populate('product').lean();
    const total = items.reduce((sum, it) => sum + (it.product.price * it.qty), 0);

    const receipt ={
      receiptId: `R-${Date.now()}`,
      total,
      timestamp: new Date().toISOString(),
      items: items.map((it) =>
      ({
        title: it.product.title,
        price: it.product.price,
        qty: it.qty
      })),
      user: user || null
    };

    await CartItem.deleteMany({});

    res.json({ receipt });
  }
  catch (err){
    console.error(err);
    res.status(500).json({ message: 'Checkout failed' });
  }
};
