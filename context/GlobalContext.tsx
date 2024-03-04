"use client";

import { createContext, useState } from "react";

interface GlobalContextProps {
  children: React.ReactNode;
}

interface MyContextData {}

export const GlobalContext = createContext<MyContextData | undefined>(
  undefined
);

export const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const storedCart = localStorage.getItem("cart");
  const initialCart = storedCart ? JSON.parse(storedCart) : [];
  const [cart, setCart] = useState(initialCart);

  const handleCart = async (course: any) => {
    const isProductInCart =
      cart.length > 0 && cart.some((el: any) => el.id === course.id); // return true or false

    if (isProductInCart) {
      alert("ene surgalt ali hediin sagsand bna");
    } else {
      let updatedCart = [...cart, course];

      setCart(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        handleCart
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
