"use client";

import { GlobalContext } from "@/context/GlobalContext";
import Image from "next/image";
import { Button } from "primereact/button";
import { useContext } from "react";

const CartPage = () => {
  const { cart }: any = useContext(GlobalContext);

  return (
    <div>
      <h1 className="m-10 font-bold text-lg">
        Таны сагсанд {cart.length} сургалт байна.
      </h1>
      <div className="flex flex-col gap-5">
        {cart.map((course: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <Image
              alt="image"
              width={100}
              height={100}
              src="/video.jpg"
              className="object-cover"
            />

            <div>
              <h1>{course.title}</h1>

              <span>{course.price}</span>
            </div>

            <Button label="Устгах" />
          </div>
        ))}
      </div>

      <Button
        label="Сагс доторх сургалтуудыг худалдаж авах"
        className="bg-teal-800 p-2 text-white text-sm my-10 hover:bg-teal-400"
      />
    </div>
  );
};

export default CartPage;
