"use client"

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  addItem, removeItem, updateItemQuantity } from '@/lib/slices/basketSlice';
import { RootState } from '@/lib/store';

const Checkout: React.FC = () => {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const totalQuantity = useSelector((state: RootState) => state.basket.totalQuantity);
  const totalPrice = useSelector((state: RootState) => state.basket.totalPrice);
  const dispatch = useDispatch();

  const handleAddItem = (id: string) => {
    const item = basketItems.find((item) => item.id === id);
    if (item) {
      dispatch(addItem({ ...item, quantity: 1 }));
    }
  };

  const handleReduceItem = (id: string) => {
    const item = basketItems.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateItemQuantity({ id, quantity: item.quantity - 1 }));
    } else if (item) {
      dispatch(removeItem({ id }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem({ id }));
  };

  return (
    <div>


    <div className="p-4 max-w-4xl mx-auto">

      {basketItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="mb-6">
            {basketItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 mb-4"
              >
                <div className="flex items-center">
              
                  <div>
                    <h2 className="text-sm/6 font-semibold text-gray-900">{item.name}</h2>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">Kes. {item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleReduceItem(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleAddItem(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="px-4 py-1 text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Subtotal ({totalQuantity} items):</span>
              <span className="font-medium">Kes. {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-700">Total:</span>
              <span className="font-bold text-lg">Kes. {totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => alert('Proceeding to checkout...')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
    </div>

  );
};

export default Checkout;