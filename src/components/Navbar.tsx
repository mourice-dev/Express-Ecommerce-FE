/** @format */

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X, LogOut } from "lucide-react";
import Button from "./Button";
import { API_BASE_URL } from "../config";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data && (data.username || data.name)) {
            setUsername(data.username || data.name);
          }
        }
      } catch (error) {
        console.log("Failed to fetch user");
      }
    };

    const fetchCartCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/cart/cart-count`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setCartCount(data.count || 0);
        }
      } catch (error) {
        console.error("Failed to fetch cart count:", error);
      }
    };

    fetchCartCount();
    fetchUser();

    window.addEventListener("cartUpdated", fetchCartCount);
    window.addEventListener("authUpdated", fetchUser);

    return () => {
      window.removeEventListener("cartUpdated", fetchCartCount);
      window.removeEventListener("authUpdated", fetchUser);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, { method: "DELETE" });
      setUsername(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      navigate("/login");
    }
  };

  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link
            to='/'
            className='flex-shrink-0 flex items-center gap-2 cursor-pointer'>
            <div className='w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center rotate-3'>
              <span className='text-white font-bold text-xl'>O</span>
            </div>
            <span className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400'>
              OrangeShop
            </span>
          </Link>

          {/* Desktop Search */}
          <div className='hidden md:flex flex-1 max-w-lg mx-8'>
            <div className='relative w-full group'>
              <input
                type='text'
                placeholder='Search for products...'
                className='w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all'
              />
              <Search className='absolute left-3 top-2.5 text-gray-400 w-5 h-5 group-focus-within:text-orange-500' />
            </div>
          </div>

          {/* Desktop Icons */}
          <div className='hidden md:flex items-center gap-4'>
            <Link to='/cart'>
              <Button variant='ghost' className='!p-2 rounded-full relative'>
                <ShoppingCart className='w-6 h-6' />
                {cartCount > 0 && (
                  <span className='absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] flex items-center justify-center rounded-full animate-bounce'>
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            {username ? (
              <div className='flex items-center gap-3 pl-2'>
                <span className='text-sm font-medium text-gray-700 hidden sm:block'>
                  Hi, {username}
                </span>
                <Button
                  variant='ghost'
                  className='!p-2 rounded-full text-gray-500 hover:text-red-500'
                  onClick={handleLogout}
                  title='Logout'>
                  <LogOut className='w-5 h-5' />
                </Button>
              </div>
            ) : (
              <Link to='/login' className='flex items-center gap-1'>
                <Button variant='ghost' className='!p-2 rounded-full'>
                  <User className='w-6 h-6' />
                </Button>
                <span className='text-sm font-medium text-gray-700 hidden sm:block'>
                  Guest
                </span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-gray-600 hover:text-orange-500'>
              {isMenuOpen ? (
                <X className='w-6 h-6' />
              ) : (
                <Menu className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden bg-white border-b border-orange-100 absolute w-full px-4 py-4 shadow-lg'>
          <div className='flex flex-col gap-4'>
            <input
              type='text'
              placeholder='Search...'
              className='w-full bg-gray-50 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500'
            />
            <Link
              to='/products'
              className='text-gray-700 hover:text-orange-500 font-medium'>
              Products
            </Link>
            <Link
              to='/cart'
              className='text-gray-700 hover:text-orange-500 font-medium'>
              Cart ({cartCount})
            </Link>
            <div className='h-px bg-gray-100 my-2'></div>
            {username ? (
              <>
                <span className='text-orange-600 font-medium'>
                  Hi, {username}
                </span>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-2 text-gray-700 hover:text-orange-500 font-medium text-left'>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='flex items-center gap-2 text-gray-700 hover:text-orange-500 font-medium'>
                  Sign In
                </Link>
                <Link
                  to='/register'
                  className='flex items-center gap-2 text-gray-700 hover:text-orange-500 font-medium'>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
