import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/Slices/CartSlice";
import { ShoppingCart, Trash2, Check } from 'lucide-react';
import { useState } from 'react';

const Product = ({ post }) =>
{
  const cartState = useSelector((s) => s.cart);
  const cartItems = Array.isArray(cartState) ? cartState : (cartState?.items || []);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async () =>
  {
    setIsLoading(true);
    try
    {
      const res = await fetch('http://localhost:5000/api/cart',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: post, qty: 1 })
      });
      await res.json();

      const cartRes = await fetch('http://localhost:5000/api/cart');
      const cartData = await cartRes.json();
      
      dispatch(setCart({ items: cartData.items, total: cartData.total }));

      toast.success("Item added to Cart");
    }
    catch (err)
    {
      console.error(err);
      toast.error("Add failed");
    }
    finally
    {
      setIsLoading(false);
    }
  };

  const removeFromCart = async () =>
  {
    setIsLoading(true);
    try
    {
      const cartRes = await fetch('http://localhost:5000/api/cart');
      const cartData = await cartRes.json();

      const existing = cartData.items.find(
        (i) => i.productId === String(post.id) || i.title === post.title
      );

      if (existing)
      {
        await fetch(`http://localhost:5000/api/cart/${existing.id}`, { method: 'DELETE' });
        const updated = await (await fetch('http://localhost:5000/api/cart')).json();

        dispatch(setCart({ items: updated.items, total: updated.total }));
        toast.success("Item removed from Cart");
      }
      else
      {
        toast.error("Item not in server cart");
      }
    }
    catch (err)
    {
      console.error(err);
      toast.error("Remove failed");
    }
    finally
    {
      setIsLoading(false);
    }
  };

  const isInCart = cartItems.some((p) => p.productId === String(post.id) || p.title === post.title);

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-gray-100">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content wrapper */}
      <div className="relative p-6 flex flex-col h-full">
        {/* Image placeholder with gradient */}
        <div className="w-full h-48 mb-4 rounded-xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
          {post.image ? (
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-6xl opacity-30">📦</div>
          )}
        </div>

        {/* Badge */}
        {isInCart && (
          <div className="absolute top-8 right-8 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
            <Check className="w-3 h-3" />
            In Cart
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-3 leading-relaxed">
          {post.description}
        </p>

        {/* Spacer to push bottom content down */}
        <div className="flex-grow" />

        {/* Price and Action Section */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Price</span>
              <span className="text-2xl font-bold text-gray-900">
                ${post.price}
                <span className="text-sm text-gray-400 font-normal ml-1">USD</span>
              </span>
            </div>
          </div>

          {/* Action Button */}
          {isInCart ? (
            <button
              onClick={removeFromCart}
              disabled={isLoading}
              className="w-full bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed border border-red-200 hover:border-red-500"
            >
              <Trash2 className="w-4 h-4 group-hover/btn:animate-pulse" />
              {isLoading ? 'Removing...' : 'Remove from Cart'}
            </button>
          ) : (
            <button
              onClick={addToCart}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 group-hover/btn:animate-bounce" />
                  Add to Cart
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;