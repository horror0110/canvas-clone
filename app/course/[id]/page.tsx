"use client";

import { GlobalContext } from "@/context/GlobalContext";
import Image from "next/image";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

const CourseDetailPage = ({ params }: any) => {
  const [course, setCourse] = useState<any>([]);

  const { handleCart, toast }: any = useContext(GlobalContext);

  const router = useRouter();
  const { user }: any = useUser();

  useEffect(() => {
    fetch(`/api/courses/${params.id}`)
      .then((response) => response.json())
      .then((data) => setCourse(data.data))
      .catch((err) => console.log(err));
  }, [params.id]);

  return (
    <div>
      <Toast ref={toast} />
      <h1 className="bg-mainColor text-white w-screen p-10 text-2xl font-semibold mb-5">
        {course.title}
      </h1>

      <div className="flex  gap-5 w-screen">
        <div className="w-[30%] flex flex-col gap-3">
          <div className="relative w-full h-[300px]">
            <Image src={course.image} alt="" fill className="object-cover" />
          </div>

          <h1 className="text-semibold text-[14px]">{course.title}</h1>
          <span>
            Багш <span className="text-mainColor">{course.teacher}</span>
          </span>

          <span>{course.price}</span>

          <p className="text-green-700 my-2">
            Та зөвхөн өнөөдөр бүртгүүлснээр энэ сургалтыг 49,000₮ болгож
            хямдруулж аваарай!
          </p>

          {course.ownerStudents && course.ownerStudents.some((el: any) => el === user?.id) ? (
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

        <div className="w-[70%]">
          <h1 className="text-green-800">
            Бүх сургалт ХУГАЦААГҮЙ буюу НАСАН ТУРШИЙН!
          </h1>
          <div>{course.description}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
