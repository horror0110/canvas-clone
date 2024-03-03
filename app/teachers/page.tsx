"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Image from "next/image";

const TeacherListPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/teacher", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((err) => console.log(err));
  }, [data]);

  const imageBodyTemplate: any = (teacher: any) => {
    return (
      <Image
        src={teacher.image}
        alt="img"
        width={60}
        height={60}
        className="object-contain"
      />
    );
  };

  const indexBodyTemplate: any = (teacher: any, props: any) => {
    return props.rowIndex + 1;
  };
  return (
    <div className="card">
      <h1 className="font-bold text-lg m-10">Багш нар</h1>
      <DataTable
        value={data}
        paginator
        rows={5}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          field=""
          body={indexBodyTemplate}
          header=""
          style={{ width: "5%" }}
        ></Column>
        <Column
          field=""
          header="Зураг"
          body={imageBodyTemplate}
          style={{ width: "5%" }}
        ></Column>
        <Column
          field="parentsName"
          header="Овог"
          style={{ width: "5%" }}
        ></Column>
        <Column field="name" header="Нэр" style={{ width: " 5%" }}></Column>

        <Column
          field="registerNumber"
          header="Регистрийн дугаар"
          style={{ width: "5%" }}
        ></Column>

        <Column field="email" header="Имэйл" style={{ width: "5%" }}></Column>
        <Column field="sex" header="Хүйс" style={{ width: "5%" }}></Column>

        <Column
          field="date"
          header="Төрсөн он сар өдөр"
          style={{ width: "15%" }}
        ></Column>
      </DataTable>
    </div>
  );
};

export default TeacherListPage;
