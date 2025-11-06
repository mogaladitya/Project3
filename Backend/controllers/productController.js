const Product = require('../models/Product');
const mockProducts = require('../data/mockProducts');

exports.getProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(mockProducts);
    }

    const products = await Product.find().lean();
    const mapped = products.map(p => ({
      id: p._id.toString(),
      title: p.title,
      price: p.price,
      description: p.description
    }));

    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
