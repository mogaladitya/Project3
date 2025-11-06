const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  qty: { type: Number,
     default: 1,
      min: 1 
  }
}, 
{ 
    timestamps: true

});

module.exports = mongoose.model('CartItem', CartItemSchema);
