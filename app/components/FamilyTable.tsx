"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
const data: any = [
  {
    id: "1000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
];

const FamilyTable = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col">
      <h1 className="my-5 font-bold text-lg">Гэр бүлийн байдал</h1>

      <div className="card">
        <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
          <Column field="code" header="Хэн болох"></Column>
          <Column field="name" header="Овог"></Column>
          <Column field="category" header="Нэр"></Column>
          <Column field="quantity" header="Хүйс"></Column>
          <Column field="quantity" header="Утас"></Column>
          <Column field="quantity" header="Имэйл"></Column>
        </DataTable>
      </div>

      <div className="flex items-center justify-center mx-auto">
        <Button
          label="Нэмэх"
          className="bg-mainColor p-2 rounded-md text-white w-max hover:bg-slate-600"
          onClick={() => setVisible(true)}
        />
      </div>

      {/*** dialog ***/}

      <div className="card flex justify-content-center">
        <Dialog
          header="Гэр бүл, садан төрлийн байдал"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="username">*Хэн болох</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">*Хүйс</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">*Овог</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">*Нэр</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Төрсөн огноо</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Байгууллага</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Утас</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Имэйл</label>
            <InputText
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>
          <div className="mx-auto flex items-center justify-center gap-2 mt-5">
            <Button className="bg-mainColor text-white p-2" label="Хадгалах" />
            <Button label="Хаах" />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default FamilyTable;
