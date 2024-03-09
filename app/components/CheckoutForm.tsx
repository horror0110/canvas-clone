"use client";

import { GlobalContext } from "@/context/GlobalContext";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Container from "./Container";
import Image from "next/image";
import { Button } from "primereact/button";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cart, calculateTotalPrice }: any = useContext(GlobalContext);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit: any = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Something went wrong!");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <h1 className="font-bold text-lg m-10">
        Таны сагсанд {cart.length} сургалт байна.
      </h1>

      <div className="flex flex-col gap-10">
        {cart.map((course: any, index: number) => (
          <div className="flex items-center gap-3" key={index}>
            <Image
              src={course.image}
              alt="image"
              width={50}
              height={50}
              className="object-cover"
            />

            <div>
              <h1>{course.title}</h1>
              <span>{course.price}</span>
            </div>

            <Button label="Устах" />
          </div>
        ))}
      </div>

      <h1 className="font-semibold text-lg mb-5 mt-10">
        Total Price: {calculateTotalPrice()}
      </h1>

      <form id="payment-form" className="  flex flex-col gap-8 ">
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement
          id="payment-element"
          options={{
            layout: "tabs",
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="bg-red-500 text-white p-4 rounded-md w-28"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </Container>
  );
};

export default CheckoutForm;
