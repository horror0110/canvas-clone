"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import Container from "./components/Container";
import { GlobalContext } from "@/context/GlobalContext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { UploadButton } from "./components/uploadThing";
import { useRouter, useSearchParams } from "next/navigation";
import { IoBookOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useUser } from "@clerk/clerk-react";
import Loader from "./components/Loader";
import { PacmanLoader } from "react-spinners";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import Filter from "./components/Filter";
const thousandify = require("thousandify");

const Home = () => {
  const [courses, setCourses] = useState([]);
  const { handleCart, toast, setLoading }: any = useContext(GlobalContext);

  const [header, setHeader] = useState("");

  const [getId, setGetId] = useState("");
  const [visible, setVisible] = useState(false);
  const [video, setVideo] = useState("");
  const [teacher, setTeacher] = useState(false);
  const [admin, setAdmin] = useState(false);
  const router = useRouter();
  const { user }: any = useUser();
  const [smallLoading, setSmallLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const data = [
    { name: "Хамгийн сүүлд нэмэгдсэн", code: "?date=desc" },
    { name: "Хамгийн их борлуулалттай", code: "?sale=desc" },
    { name: "Үнэ өсөхөөр", code: "?price=asc" },
    { name: "Үнэ буурахаар", code: "?price=desc" },
  ];
  const searchParams = useSearchParams();

  const priceType = searchParams.get("price");
  const saleType = searchParams.get("sale");
  const dateType = searchParams.get("date");

  const handleChange = (e: any) => {
    setSelectedFilter(e.value);
    router.push(e.value.code);
  };

  useEffect(() => {
    const body = {
      role: "teacher",
    };
    fetch("/api/checkrole", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTeacher(true);
        } else {
          setTeacher(false);
        }
      })
      .catch((err) => console.log(err));
  }, [teacher]);
  useEffect(() => {
    const body = {
      role: "admin",
    };
    fetch("/api/checkrole", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      })
      .catch((err) => console.log(err));
  }, [admin]);

  useEffect(() => {
    setLoading(true);

    // Fetching courses based on query parameters
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `/api/courses${
            priceType
              ? `?price=${priceType}`
              : saleType
              ? `?sale=${saleType}`
              : dateType
              ? `?date=${dateType}`
              : ""
          }`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [priceType, saleType, dateType, setLoading]);

  const handleAdd = (id: any, name: string) => {
    setVisible(true);

    setHeader(name);
    setGetId(id);
  };

  const handleSave = () => {
    setSmallLoading(true);
    const body = {
      title: title,
      url: video,
      courseId: getId,
    };

    fetch("/api/video", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setSmallLoading(false);
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Видео амжилттай нэмэгдлээ",
            life: 3000,
          });

          setVisible(false);
        }
      })
      .catch((err) => {
        setSmallLoading(false), console.log(err);
      });
  };

  return (
    <Container>
      <h1 className="text-lg my-10 font-bold text-cyan-700">Бүх сургалтууд</h1>
      <Filter
        data={data}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        handleChange={handleChange}
      />
      <Toast ref={toast} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5  gap-y-10">
        {courses.map((course: any, index) => (
          <div
            className="w-[250px] text-center  rounded-md cursor-pointer"
            key={index}
          >
            <IoMdAdd
              onClick={() => router.push(`/course/chapters/add/${course.id}`)}
            />
            <div
              onClick={() => router.push(`/course/${course.id}`)}
              className="w-full h-[150px] relative "
            >
              <Image
                alt="course"
                src={course.image}
                className="object-cover"
                fill
              />
            </div>

            <h1 className="font-bold text-xs my-2 flex gap-1 ">
              {course.title}
            </h1>
            <div className="flex flex-col gap-2 text-[13px] ">
              <div className="flex items-center justify-between">
                {course.videos && (
                  <span className="flex gap-1 items-center text-gray-500">
                    <IoBookOutline color="#008080" size={15} />
                    {course.videos.length} видео хичээл
                  </span>
                )}
              </div>

              <span className="font-bold text-md text-start ">
                {thousandify(course.price)}₮
              </span>

              {course.ownerStudents.some((el: any) => el === user?.id) ? (
                <Button
                  className="bg-mainColor  text-white p-2 mt-2 text-xs"
                  label="Сургалтаа үзэх"
                  onClick={() => router.push(`/course/view/${course.id}`)}
                />
              ) : (
                <Button
                  onClick={() => handleCart(course)}
                  className="bg-mainColor  text-white p-2 mt-2 text-xs"
                  label="Сагсанд хийх"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
