import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCart } from "./redux/Slices/CartSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch('http://localhost:5000/api/cart');
        const data = await res.json(); // { items, total }
        dispatch(setCart(data.items || []));
      } catch (err) {
        console.error('Failed to load cart', err);
      }
    }
    loadCart();
  }, [dispatch]);

  return (<div>
        <div className="bg-slate-900">
          <Navbar/>
        </div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
  </div>)
};

export default App;
