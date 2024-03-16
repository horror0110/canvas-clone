"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { FaChalkboardTeacher } from "react-icons/fa";

const ViewCoursePage = ({ params }: any) => {
  const [courses, setCourses] = useState<any>({ videos: [] });
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    fetch(`/api/courses/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.data);
        setUrl(data.data.videos[currentIndex].url);
        setTitle(data.data.videos[currentIndex].title);
      })
      .catch((err) => console.log(err));
  }, [params.id, currentIndex]);

  useEffect(() => {
    if (
      user &&
      courses.ownerStudents &&
      !courses.ownerStudents.some((el: any) => el === user.id)
    ) {
      router.push("/sign-in");
    }
  }, [user, courses]);

  const handleNext = () => {
    if (currentIndex < courses.videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="">
      <h1 className="my-5 font-bold text-2xl">
        {courses.title} сургалтанд тавтай морил!{" "}
      </h1>

      <h1 className="my-10 font-semibold text-lg">Хичээлүүд</h1>

      <div className="flex flex-col md:flex-row gap-5">
        <div className="flex flex-col gap-5 w-full md:w-[50%]">
          <div className="">
            <ReactPlayer
              width="500px"
              height="400px"
              url={url}
              controls={true}
              light={false}
              pip={true}
            />

            <h1 className="font-semibold my-2">{title}</h1>

            <span className="flex items-center gap-1">
              <FaChalkboardTeacher />{" "}
              <span className="text-gray-500 text-[14px]">
                {courses.teacher}
              </span>
            </span>
          </div>
          <div className="my-5 flex items-center justify-between gap-2">
            <button
              className="disabled:bg-gray-500 bg-mainColor text-white px-2 py-1 rounded-md"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Өмнөх
            </button>
            <button
              className="disabled:bg-gray-500 bg-mainColor text-white px-2 py-1 rounded-md"
              onClick={handleNext}
              disabled={currentIndex === courses.videos.length - 1}
            >
              Дараах
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:w-[50%] w-full">
          {courses.videos &&
            courses.videos.map((video: any, index: number) => (
              <div className="" key={index}>
                <h1
                  className={`cursor-pointer flex items-center gap-2 ${
                    video.url === url
                      ? "bg-blue-600 p-2 rounded-md text-white w-full"
                      : ""
                  }`}
                  onClick={() => {
                    setTitle(video.title);
                    setUrl(video.url);
                    setCurrentIndex(index); // Update currentIndex when a video is clicked
                  }}
                >
                  <span className="bg-mainColor text-white p-2">
                    {index + 1}
                  </span>
                  <span className="hover:underline">{video.title}</span>
                </h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCoursePage;
