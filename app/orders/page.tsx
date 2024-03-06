"use client";

import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/order", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setOrders(data?.data));
  }, [orders]);

  const productBodyTemplate: any = (rowData: any) => {
    const data = rowData?.products.map((product: any, index: number) => {
      return <div className="flex items-center gap-5">{product.title}</div>;
    });

    return data;
  };
  return (
    <div className="card">
      <h1 className="my-10 font-bold text-lg">Гүйлгээнүүд</h1>
      <DataTable
        value={orders}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field="userId"
          header="UserId"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field=""
          body={productBodyTemplate}
          header="Products"
          style={{ width: "40%" }}
        ></Column>
        <Column
          field="price"
          header="Total price"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="createdAt"
          header="Date"
          style={{ width: "10%" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default OrdersPage;
