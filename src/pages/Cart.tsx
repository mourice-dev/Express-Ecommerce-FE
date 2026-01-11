/** @format */

import { useEffect, useState } from "react";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

interface CartItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        // Backend now returns an array directly
        const items = Array.isArray(data) ? data : data.items || [];
        setCartItems(items);

        // Calculate total on frontend since backend doesn't return it yet
        const calculatedTotal = items.reduce((sum: number, item: CartItem) => {
          return sum + Number(item.price) * item.quantity;
        }, 0);
        setTotal(calculatedTotal);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/${itemId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        fetchCart();
        // Ideally update navbar count here too
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        alert("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3'>
          <ShoppingBag className='w-8 h-8 text-orange-500' />
          Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className='text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100'>
            <div className='w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <ShoppingBag className='w-10 h-10 text-orange-500' />
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-2'>
              Your cart is empty
            </h3>
            <p className='text-gray-500 mb-8'>
              Looks like you haven't added anything yet.
            </p>
            <Link to='/products'>
              <Button>
                Start Shopping <ArrowRight className='w-4 h-4' />
              </Button>
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-4'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md'>
                  <div className='w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0'>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-bold text-gray-900 text-lg'>
                      {item.title}
                    </h3>
                    <p className='text-gray-500 text-sm'>
                      Quantity: {item.quantity}
                    </p>
                    <p className='text-orange-600 font-bold mt-1'>\</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors'>
                    <Trash2 className='w-5 h-5' />
                  </button>
                </div>
              ))}
            </div>

            <div className='lg:col-span-1'>
              <div className='bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24'>
                <h3 className='text-xl font-bold text-gray-900 mb-6'>
                  Order Summary
                </h3>
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-gray-600'>
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between text-gray-600'>
                    <span>Shipping</span>
                    <span className='text-green-600'>Free</span>
                  </div>
                  <div className='h-px bg-gray-100'></div>
                  <div className='flex justify-between text-xl font-bold text-gray-900'>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className='w-full py-4 text-lg'>Checkout</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
