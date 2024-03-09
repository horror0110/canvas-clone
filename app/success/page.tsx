"use client";
import { GlobalContext } from "@/context/GlobalContext";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import axios from "axios";

const SuccessPage = () => {
  const searchParams = useSearchParams();

  const { cart, calculateTotalPrice }: any = useContext(GlobalContext);

  const router = useRouter();

  const isSuccess = searchParams.get("redirect_status");

  useEffect(() => {
    const makeRequest = async () => {
      const body = {
        products: cart,
        price: calculateTotalPrice().toString(),
      };
      try {
        await fetch(`/api/order`, {
          method: "POST",
          body: JSON.stringify(body),
        });
        setTimeout(() => {
          router.push("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
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
