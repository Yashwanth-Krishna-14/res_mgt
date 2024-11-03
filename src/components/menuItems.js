import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styled from 'styled-components';

const MenuItemContainer = styled.div`
    border: 1px solid #e5e7eb;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
    background-color: white;

    &:hover {
        background-color: #f0f0f0; /* Change to your desired hover color */
        transform: scale(1.02); /* Slightly increase size */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
    }
`;

const Description = styled.p`
    min-height: 90px; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; 
`;

const MenuItem = ({ item, addToCart, removeFromCart, inCart, itemCount }) => {
    const fallbackImageUrl = 'https://example.com/fallback-image.jpg';

    return (
        <MenuItemContainer>
            <img 
                src={item.imageUrl} 
                alt={`Image of ${item.name}`} 
                className="w-full h-32 object-cover mb-2 rounded" 
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = fallbackImageUrl; 
                }} 
            />
            <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
            <Description className="text-sm text-gray-500 mt-1">{item.desc}</Description>
            <p className="text-md text-gray-600">${item.price.toFixed(2)}</p>
            
            <div className="mt-3 flex items-center space-x-2">
                <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 text-white px-2 py-2 rounded-md flex items-center justify-center text-sm transition duration-300 hover:bg-green-600"
                    aria-label={`Add ${item.name} to cart`}
                >
                    <FaPlus className="mr-1" />
                    Add {itemCount > 0 && <span className="ml-1">({itemCount})</span>}
                </button>
                {itemCount > 0 && (
                    <button
                        onClick={() => removeFromCart(item)}
                        className="bg-red-500 text-white px-2 py-2 rounded-md flex items-center justify-center text-sm transition duration-300 hover:bg-red-600"
                        aria-label={`Remove ${item.name} from cart`}
                    >
                        <FaMinus className="mr-1" />
                        Remove
                    </button>
                )}
            </div>
        </MenuItemContainer>
    );
};

MenuItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
    }).isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    inCart: PropTypes.bool.isRequired,
    itemCount: PropTypes.number.isRequired,
};

export default MenuItem;