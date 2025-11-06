import { ShoppingCart, Home, Store } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const cartState = useSelector((s) => s.cart);
  const cartItems = Array.isArray(cartState) ? cartState : (cartState?.items || []);
  const cartLength = cartItems.length;

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <nav className="flex justify-between items-center h-20 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Logo Section */}
        <NavLink to="/">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                <Store className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ShopHub
              </h1>
              <p className="text-xs text-gray-500 font-medium">Premium Store</p>
            </div>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <NavLink to="/">
            {({ isActive }) => (
              <div className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </div>
            )}
          </NavLink>

          <NavLink to="/cart">
            {({ isActive }) => (
              <div className={`relative flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}>
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartLength > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex justify-center items-center rounded-full font-bold animate-bounce shadow-lg">
                      {cartLength}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Cart</span>
              </div>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;