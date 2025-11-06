import { Trash2, Package } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
import { useState } from "react";

const CartItem = ({item, itemIndex}) => {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const removeFromCart = async () => {
    setIsRemoving(true);
    try {
      await fetch(`http://localhost:5000/api/cart/${item.id}`, { method: 'DELETE' });
      const res = await fetch('http://localhost:5000/api/cart');
      const data = await res.json();
      dispatch(setCart(data.items));
      toast.success("Item Removed");
    } catch (err) {
      console.error(err);
      toast.error("Remove failed");
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center p-6 gap-6">
        
        {/* Product Image */}
        <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <Package className="w-12 h-12 text-gray-400" />
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
            {item.title}
          </h2>
          <p className="text-sm md:text-base text-gray-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
          
          {/* Price and Actions Row */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Price</span>
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${item.price}
              </span>
            </div>

            {/* Remove Button */}
            <button
              onClick={removeFromCart}
              disabled={isRemoving}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-semibold rounded-xl transition-all duration-300 border border-red-200 hover:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
            >
              <Trash2 className="w-4 h-4 group-hover/btn:animate-pulse" />
              <span className="hidden sm:inline">
                {isRemoving ? 'Removing...' : 'Remove'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default CartItem;