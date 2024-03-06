"use client";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { CiVideoOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { Button } from "primereact/button";
import Container from "./components/Container";
import { GlobalContext } from "@/context/GlobalContext";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const { handleCart }: any = useContext(GlobalContext);

  useEffect(() => {
    fetch("/api/courses", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setCourses(data.data))
      .catch((err) => console.log(err));
  }, [courses]);

  return (
    <Container>
      <div className="grid grid-cols-4 gap-5">
        {courses.map((course: any, index) => (
          <div className="max-w-[220px] text-center" key={index}>
            <Image
              alt="course"
              src={course.image}
              width={220}
              height={200}
              className="object-cover"
            />
            <h1 className="font-semibold text-[13px] my-2 flex gap-1 ">
              <CiVideoOn size={30} />
              {course.title}
            </h1>
            <div className="flex flex-col gap-2 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                {course.videoCount && (
                  <span className="flex gap-1 items-center">
                    <CiVideoOn size={15} />
                    {course.videoCount} видео хичээл
                  </span>
                )}

                {course.timeLength && (
                  <span className="flex items-center gap-1 ">
                    <IoTimeOutline />
                    {course.timeLength}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                {course.views && (
                  <span className="flex items-center gap-1">
                    <TbPlayerPlayFilled />
                    {course.views} харсан
                  </span>
                )}

                {course.studentCount && (
                  <span className="flex items-center gap-1">
                    <PiStudent />
                    {course.studentCount} сурагчид
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between  ">
                <Button
                  onClick={() => handleCart(course)}
                  className="bg-mainColor  text-white p-2 mt-2"
                  label="Сагсанд хийх"
                />
                <s>{course.salePrice}</s>
                <span>{course.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
