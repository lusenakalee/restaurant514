import {  useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingBagIcon, XMarkIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateItemQuantity } from "@/lib/slices/basketSlice";
import Link from "next/link";
import { RootState } from "@/lib/store";



const ShoppingCart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.basket.items);
  const totalQuantity = useSelector(
    (state: RootState) => state.basket.totalQuantity
  );
  const totalPriceInCents = useSelector(
    (state: RootState) => state.basket.totalPrice
  );

  const handleRemoveItem = (id: string ) => {
    dispatch(removeItem({ id }));
  };

  const handleUpdateItemQuantity = (
    id: string,
    quantity: number
  ) => {
    dispatch(updateItemQuantity({ id , quantity }));
  };

  const itemsQueryParam = encodeURIComponent(JSON.stringify(items));

  return (
    <div className=" relative z-10 cursor-pointer">
      <div
        onClick={() => setOpen(true)}
        className="group -m-2 flex items-center p-2"
      >
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {totalQuantity}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </div>

      <Transition show={open}>
        <Dialog className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {items.map((item) => (
                                <li
                                  key={`${item.id}`}
                                  className="flex py-6"
                                >
                                  
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">
                                             AUD { (item.price * item.quantity).toFixed(2) }

                                        </p>
                                      </div>
                                     
                                    
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          type="button"
                                          className="text-gray-500 hover:text-gray-700"
                                          onClick={() =>
                                            handleUpdateItemQuantity(
                                              item.id,
                                             
                                              item.quantity - 1
                                            )
                                          }
                                        >
                                          <MinusIcon className="h-5 w-5" />
                                        </button>
                                        <p className="text-gray-500">
                                          Qty {item.quantity}
                                        </p>
                                        <button
                                          type="button"
                                          className="text-gray-500 hover:text-gray-700"
                                          onClick={() =>
                                            handleUpdateItemQuantity(
                                              item.id,
                                            
                                              item.quantity + 1
                                            )
                                          }
                                        >
                                          <PlusIcon className="h-5 w-5" />
                                        </button>
                                      </div>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            handleRemoveItem(
                                              item.id,
                                         
                                            )
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>Kes. {(totalPriceInCents).toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Tax included.
                        </p>
                        <div className="mt-6">
                          <Link
                            href={{
                              pathname: "/checkout",
                              query: { items: itemsQueryParam },
                            }}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-center  border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ShoppingCart;