import React from 'react';
import { useNavigate } from 'react-router-dom';

const PromoBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">DEALS OF THE DAY</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            imgSrc: "https://www.hungryjacks.com.au/Upload/HJ/Media/Menu/product/Thumbnail/ThickShake-Chocolate-1600x1200.png",
            title: "Chocolate Thick Shake",
            price: "FREE",
            minOrder: "$39",
          },
          {
            imgSrc: "https://th.bing.com/th/id/OIP.L2DvtigcG2mDg37PX-HdDgHaE8?w=227&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
            title: "Beef Wellington",
            price: "FREE",
            minOrder: "$99",
          },
          {
            imgSrc: "https://th.bing.com/th/id/OIP.ine78NHGbXjrUSykdLmw6gAAAA?rs=1&pid=ImgDetMain",
            title: "Waffles",
            price: "FREE",
            minOrder: "$29",
          },
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md w-80">
            <img 
              src={item.imgSrc} 
              alt={item.title} 
              className="w-full h-64 object-cover" // Fixed height and responsive width
            />
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-green-500 font-bold">{item.price}</p>
            <p className="text-sm text-gray-600">*Minimum order value {item.minOrder}. T&C Apply</p>
            <button 
              className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-lg" 
              onClick={() => navigate('/menu')}
            >
              ORDER NOW
            </button>
          </div>
        ))}
      </div>
      <button 
        className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-lg" 
        onClick={() => navigate('/menu')}
      >
        EXPLORE FULL MENU
      </button>
    </div>
  );
};

export default PromoBanner;