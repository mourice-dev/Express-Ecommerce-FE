/** @format */

import { ArrowRight } from "lucide-react";

const Footer = () => (
  <footer className='bg-gray-900 text-white pt-16 pb-8 mt-auto'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
        <div className='col-span-1 md:col-span-1'>
          <div className='flex items-center gap-2 mb-6'>
            <div className='w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center rotate-3'>
              <span className='text-white font-bold text-xl'>O</span>
            </div>
            <span className='text-2xl font-bold'>OrangeShop</span>
          </div>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Bringing you the freshest tech and style with a zest of innovation.
            Quality products, vibrant service.
          </p>
        </div>

        <div>
          <h4 className='text-lg font-bold mb-6 text-orange-500'>Shop</h4>
          <ul className='space-y-3 text-gray-400 text-sm'>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                New Arrivals
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                Best Sellers
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                Electronics
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                Gift Cards
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='text-lg font-bold mb-6 text-orange-500'>Support</h4>
          <ul className='space-y-3 text-gray-400 text-sm'>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                Help Center
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                Shipping Info
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                Returns
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-white transition-colors'>
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className='text-lg font-bold mb-6 text-orange-500'>Stay Fresh</h4>
          <p className='text-gray-400 text-sm mb-4'>
            Subscribe for updates and exclusive deals.
          </p>
          <div className='flex gap-2'>
            <input
              type='email'
              placeholder='Email address'
              className='bg-gray-800 border-none rounded-lg px-4 py-2 text-sm text-white focus:ring-2 focus:ring-orange-500 w-full'
            />
            <button className='bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer'>
              <ArrowRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500'>
        <p>&copy; 2024 OrangeShop Inc. All rights reserved.</p>
        <div className='flex gap-6 mt-4 md:mt-0'>
          <a href='#' className='hover:text-white'>
            Privacy Policy
          </a>
          <a href='#' className='hover:text-white'>
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
