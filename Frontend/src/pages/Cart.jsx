import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { setCart } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
import { ShoppingBag, CreditCard, Package, ArrowRight, ShoppingCart } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch("http://localhost:5000/api/cart");
        const data = await res.json();
        dispatch(setCart(data.items || []));
      } catch (err) {
        console.error(err);
      }
    }
    loadCart();
  }, [dispatch]);

  useEffect(() => {
    setTotalAmount(
      items.reduce((acc, curr) => acc + curr.price * (curr.qty || 1), 0)
    );
  }, [items]);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: { name: "Guest", email: "guest@example.com" },
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Checkout successful!");
        console.log("Receipt:", data.receipt);
        dispatch(setCart([]));
      } else {
        toast.error("Checkout failed.");
        console.error("Checkout error:", data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      {items.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
            <p className="text-gray-600 ml-14">Review your items and proceed to checkout</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Cart Items Section */}
            <div className="flex-1 space-y-4">
              {items.map((item, index) => (
                <CartItem key={item.id} item={item} itemIndex={index} />
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-[400px]">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                
                {/* Gradient Header */}
                <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-1">Order Summary</h2>
                  <p className="text-indigo-100 text-sm">Review your order details</p>
                </div>

                <div className="p-6 space-y-6">
                  
                  {/* Order Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <Package className="w-5 h-5 text-indigo-600" />
                        </div>
                        <span className="text-gray-700 font-medium">Total Items</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{items.length}</span>
                    </div>

                    {/* Subtotal Breakdown */}
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-semibold text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tax</span>
                        <span className="font-semibold">Calculated at checkout</span>
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
                      <span className="text-lg font-bold text-gray-900">Total Amount</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group"
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Checkout Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Secure checkout powered by Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Empty Cart State
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-white p-12 rounded-full shadow-2xl">
              <ShoppingBag className="w-32 h-32 text-gray-300" />
            </div>
          </div>
          
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-4xl font-bold text-gray-900">Your Cart is Empty</h2>
            <p className="text-gray-600 text-lg">
              Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!
            </p>
          </div>

          <Link to="/" className="mt-8">
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 group">
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;