"use client";

import { createContext, useRef, useState } from "react";

interface GlobalContextProps {
  children: React.ReactNode;
}

interface MyContextData {}

export const GlobalContext = createContext<MyContextData | undefined>(
  undefined
);

export const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const storedCart =
    typeof window !== "undefined" ? localStorage.getItem("cart") : null;

  const initialCart = storedCart ? JSON.parse(storedCart) : [];
  const [cart, setCart] = useState(initialCart);
  const [loading , setLoading] = useState(false)

  const toast: any = useRef(null);

  const handleCart = async (course: any) => {
    const isProductInCart =
      cart.length > 0 && cart.some((el: any) => el.id === course.id); // return true or false

    if (isProductInCart) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Энэ сургалт аль хэдийнээ сагсанд орсон байна",
        life: 3000,
      });
    } else {
      let updatedCart = [...cart, course];

      setCart(updatedCart);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Сагсанд нэмэгдлээ",
        life: 3000,
      });
    }
  };
  const calculateTotalPrice = () => {
    if (!Array.isArray(cart)) {
      console.error("Cart is not an array:", cart);
      return 0; // or any other appropriate fallback value
    }

    const totalPrice = cart.reduce((accumulator, currentItem) => {
      return accumulator + parseInt(currentItem.price);
    }, 0);

    return totalPrice;
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        setCart,
        handleCart,
        calculateTotalPrice,
        toast,
        loading,
        setLoading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
