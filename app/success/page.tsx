"use client";
import { GlobalContext } from "@/context/GlobalContext";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const searchParams = useSearchParams();

  const { cart, calculateTotalPrice, setCart }: any = useContext(GlobalContext);

  const router = useRouter();

  const isSuccess = searchParams.get("redirect_status");

  useEffect(() => {
    if (isSuccess === "succeeded") {
      const body = {
        products: cart,
        price: calculateTotalPrice().toString(),
      };
      try {
        fetch(`/api/order`, {
          method: "POST",
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((data: any) => {
            // if (data.data) {
            //   setTimeout(() => {
            //     router.push("/orders");
            //   }, 5000);
            //   setCart("");

            //   localStorage.removeItem("cart");
            // }

            console.log(data);
          });
      } catch (err) {
        console.log(err);
      }

      {
        /*****/

        const ids = cart && cart.map((item: any) => item.id);

        const body2 = {
          id: ids,
        };

        console.log(ids);

        try {
          fetch(`/api/courses`, {
            method: "PUT",
            body: JSON.stringify(body2),
          })
            .then((response) => response.json())
            .then((data: any) => {
              if (data.data) {
                setTimeout(() => {
                  router.push("/orders");
                }, 5000);
                setCart("");

                localStorage.removeItem("cart");
              }
            });
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [isSuccess, router, cart, calculateTotalPrice]);

  return (
    <>
      <div className="flex items-center justify-center mx-auto text-center text-2xl text-green-700">
        <p>
          Payment successful. You are being redirected to the orders page.
          Please do not close the page.
        </p>
        <Confetti />
      </div>
    </>
  );
};

export default SuccessPage;
