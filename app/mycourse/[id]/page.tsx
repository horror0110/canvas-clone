"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import Container from "@/app/components/Container";
import { GlobalContext } from "@/context/GlobalContext";
import { IoBookOutline } from "react-icons/io5";
import { useUser } from "@clerk/nextjs";

const MyCoursePage = ({ params }: any) => {
  const [courses, setCourses] = useState([]);

  const router = useRouter();

  const { toast, setLoading }: any = useContext(GlobalContext);

  const { user }: any = useUser();

  useEffect(() => {
    if (params.id !== user?.id) {
      router.push("/sign-in");
    }
  }, [user?.id]);

  console.log(user?.id);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/mycourse/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false), setCourses(data.data);
      })
      .catch((err) => {
        setLoading(true), console.log(err);
      });
  }, [params.id]);

  if (courses.length === 0) {
    return <h1>Танд одоогоор худалдаж авсан сургалт байхгүй байн</h1>;
  }

  return (
    <Container>
      <h1 className="text-lg my-10 font-bold text-cyan-700">
        Таны худалдаж авсан сургалтууд
      </h1>
      <Toast ref={toast} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-y-10">
        {courses.map((course: any, index) => (
          <div
            className="w-[250px] text-center  rounded-md cursor-pointer"
            key={index}
          >
            <div className="w-full h-[150px] relative">
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
                <span className="flex gap-1 items-center text-gray-500">
                  <IoBookOutline color="#008080" size={15} />
                  {course.chapters?.length} Chapters
                </span>
              </div>

              <div>
                <div className="bg-green-700 w-full h-2 rounded-md"></div>
                <span className="text-green-700">100% complete</span>
              </div>

              <span className="font-bold text-md text-start ">
                {course.price}
              </span>

              <Button
                className="bg-mainColor  text-white p-2 mt-2 text-xs"
                label="Сургалтаа үзэх"
                onClick={() => router.push(`/course/view/${course.id}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default MyCoursePage;
