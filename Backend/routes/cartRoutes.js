const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateQty } = require('../controllers/cartController');

router.get('/', getCart);
router.post('/', addToCart);
router.delete('/:id', removeFromCart);
router.put('/:id', updateQty);

module.exports = router;
