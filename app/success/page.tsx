"use client";

import React from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  return (
    <>
      <div className=" flex items-center justify-center mx-auto text-center text-2xl text-green-700">
        <p className="">
          Payment successful. You are being redirected to the orders page.
          Please do not close the page.
        </p>
        <Confetti />
      </div>
    </>
  );
};

export default SuccessPage;
