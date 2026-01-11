/** @format */

import { useEffect, useState } from "react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { API_BASE_URL } from "../config";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  // Optional fields for UI enhancement if backend provides them later
  rating?: number;
  category?: string;
  tag?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showCartToast, setShowCartToast] = useState(false);
  const [username, setUsername] = useState<string>("Guest");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username || data.name);
        }
      } catch (error) {
        console.log("Failed to fetch user");
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            // Map data to include mock UI fields if missing
            const enhancedData = data.map((p: any) => ({
              ...p,
              price: Number(p.price), // Ensure price is a number
              rating: p.rating != null ? Number(p.rating) : 4 + Math.random(), // Ensure rating is a number
              category: p.category || "General",
              tag: p.tag || (Math.random() > 0.7 ? "New" : null),
            }));
            setProducts(enhancedData);
          } else {
            console.error("Expected array of products, got:", data);
            setProducts([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
    fetchUser();
  }, []);

  const addToCart = async (productId: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
        credentials: "include",
      });
      if (response.ok) {
        setShowCartToast(true);
        setTimeout(() => setShowCartToast(false), 2000);
        // Ideally we should update a global cart context here
        // For now, we can trigger a custom event or just let the user know
        window.dispatchEvent(new Event("cartUpdated")); // Simple way to notify Navbar if we added a listener there (we haven't yet, but good practice)
        // Or just reload to update navbar count as per previous implementation, but toast is nicer
        // window.location.reload();
      } else {
        alert("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      {/* <section className='relative bg-white overflow-hidden'>
        <div className='absolute inset-0 bg-orange-50/50'></div>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-12 pb-16 md:pt-20 md:pb-24'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8 z-10'>
              <Badge className='bg-orange-100 text-orange-600 px-4 py-2 text-sm'>
                New Season Arrivals
              </Badge>
              <h1 className='text-5xl md:text-7xl font-black text-gray-900 leading-tight'>
                Fresh Styles <br />
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400'>
                  Every Day
                </span>
              </h1>
              <p className='text-lg text-gray-600 max-w-lg leading-relaxed'>
                Discover the latest trends in fashion and technology. Curated
                collections designed to make you stand out.
              </p>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Button className='!px-8 !py-4 text-lg'>
                  Shop Now <ArrowRight className='w-5 h-5' />
                </Button>
                <Button variant='secondary' className='!px-8 !py-4 text-lg'>
                  View Collections
                </Button>
              </div>
            </div> */}

      {/* Abstract Hero Image Composition */}
      {/* <div className='relative hidden md:block'>
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-200 rounded-full filter blur-3xl opacity-30 animate-pulse'></div>
              <div className='relative z-10 grid grid-cols-2 gap-4'>
                <img
                  src='https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&q=80'
                  className='rounded-2xl shadow-2xl transform translate-y-12 hover:-translate-y-2 transition-transform duration-500 object-cover h-64 w-full'
                  alt='Fashion'
                />
                <img
                  src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'
                  className='rounded-2xl shadow-2xl transform -translate-y-8 hover:translate-y-2 transition-transform duration-500 object-cover h-64 w-full'
                  alt='Shoes'
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Products */}
      <section className='py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8 p-6 bg-orange-50 rounded-2xl border border-orange-100'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Welcome, <span className='text-orange-600'>{username}</span>!
          </h2>
          <p className='text-gray-600 mt-1'>
            We have some great new items for you today.
          </p>
        </div>
        <div className='flex justify-between items-end mb-10'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Featured Products
            </h2>
            <p className='text-gray-500'>Handpicked selections just for you</p>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4'>
          {products.map((product) => (
            <div
              key={product.id}
              className='group bg-white rounded-lg border border-gray-100 hover:border-orange-200 hover:shadow-md hover:shadow-orange-500/10 transition-all duration-300 flex flex-col overflow-hidden relative'>
              {product.tag && (
                <div className='absolute top-1.5 left-1.5 z-10'>
                  <Badge className='text-[10px] px-1.5 py-0.5 h-5'>
                    {product.tag}
                  </Badge>
                </div>
              )}
              <button className='absolute top-1.5 right-1.5 z-10 p-1 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-50 text-gray-400 hover:text-red-500 cursor-pointer'>
                <Heart className='w-3.5 h-3.5' />
              </button>

              <div className='relative aspect-square overflow-hidden bg-gray-50'>
                <img
                  src={product.image}
                  alt={product.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
              </div>

              <div className='p-3 flex flex-col flex-1'>
                <div className='flex justify-between items-start mb-1'>
                  <div>
                    <p className='text-[9px] text-orange-500 font-medium uppercase tracking-wider mb-0.5'>
                      {product.category}
                    </p>
                    <h3 className='font-bold text-gray-800 text-xs leading-tight group-hover:text-orange-600 transition-colors line-clamp-2'>
                      {product.title}
                    </h3>
                  </div>
                </div>

                <div className='flex items-center gap-0.5 mb-2'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-2.5 h-2.5 ${
                        i < Math.floor(product.rating || 0)
                          ? "fill-orange-400 text-orange-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className='text-[9px] text-gray-500 ml-1'>
                    ({product.rating?.toFixed(1)})
                  </span>
                </div>

                <div className='mt-auto flex items-center justify-between'>
                  <span className='text-sm font-bold text-gray-900'>
                    ${product.price}
                  </span>
                  <Button
                    variant='outline'
                    className='!px-0 !py-0 !rounded-full group/btn h-7 w-7 flex items-center justify-center'
                    onClick={() => addToCart(product.id)}>
                    <ShoppingCart className='w-3 h-3 group-hover/btn:fill-orange-500' />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className='bg-orange-500 py-20 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10 pattern-dots'></div>
        <div className='max-w-4xl mx-auto px-4 text-center relative z-10'>
          <h2 className='text-4xl font-bold text-white mb-6'>
            Join the Orange Club
          </h2>
          <p className='text-orange-100 text-lg mb-8 max-w-2xl mx-auto'>
            Get 20% off your first order when you subscribe to our newsletter.
            No spam, just fresh deals.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto'>
            <input
              type='email'
              placeholder='Enter your email'
              className='px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-600/30 w-full shadow-lg'
            />
            <button className='px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg whitespace-nowrap cursor-pointer'>
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* Cart Toast Notification */}
      <div
        className={`fixed bottom-8 right-8 z-50 transform transition-all duration-300 ${
          showCartToast
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}>
        <div className='bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4'>
          <div className='bg-orange-500 p-2 rounded-lg'>
            <ShoppingCart className='w-5 h-5 text-white' />
          </div>
          <div>
            <p className='font-bold'>Item Added!</p>
            <p className='text-xs text-gray-400'>Check your cart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
