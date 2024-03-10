"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ViewCoursePage = ({ params }: any) => {
  const [courses, setCourses] = useState<any>({ videos: [] });
  useEffect(() => {
    fetch(`/api/courses/${params.id}`)
      .then((response) => response.json())
      .then((data) => setCourses(data.data))
      .catch((err) => console.log(err));
  }, [params.id]);

  return (
    <div>
      <h1 className="my-5 font-bold text-2xl">
        {courses.title} сургалтанд тавтай морил!{" "}
      </h1>

      <h1 className="my-10 font-semibold text-lg">Хичээлүүд</h1>

      <div className="flex flex-col gap-5">
        {courses.videos &&
          courses.videos.map((video: any, index: number) => (
            <div className="border p-2" key={index}>
              <h1>{video.title}</h1>
              <Link href={video.url} target="_blank" className="underline">
                {video.url}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewCoursePage;
