"use client";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CiVideoOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { PiStudent } from "react-icons/pi";
import { Button } from "primereact/button";
import Container from "./components/Container";
import { GlobalContext } from "@/context/GlobalContext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { UploadButton } from "./components/uploadThing";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const { handleCart, toast }: any = useContext(GlobalContext);

  const [header, setHeader] = useState("");

  const [getId, setGetId] = useState("");
  const [visible, setVisible] = useState(false);
  const [video, setVideo] = useState("");

  useEffect(() => {
    fetch("/api/courses", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setCourses(data.data))
      .catch((err) => console.log(err));
  }, [courses]);

  const handleAdd = (id: any, name: string) => {
    setVisible(true);

    setHeader(name);
    setGetId(id);
  };

  const handleSave = () => {
    const body = {
      title: "video1",
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
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Видео амжилттай нэмэгдлээ",
            life: 3000,
          });

          setVisible(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Toast ref={toast} />
      <div className="grid grid-cols-4 gap-5">
        {courses.map((course: any, index) => (
          <div className="max-w-[220px] text-center" key={index}>
            <Button
              onClick={() => handleAdd(course.id, course.title)}
              label="Энэ сургалтанд видео нэмэх"
              className="text-sm font-semibold bg-slate-800 my-5 px-2 py-1 text-white"
            />
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

      <Dialog
        header={`${header} сургалтанд видео нэмэх`}
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <UploadButton
          endpoint="videoUploader"
          onClientUploadComplete={(res: any) => {
            console.log("Files: ", res);
            setVideo(res[0].url);
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Upload completed",
              life: 3000,
            });
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <UploadButton
          endpoint="pdfUploader"
          onClientUploadComplete={(res: any) => {
            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />

        <Button label="Хадгалах" onClick={handleSave} />
      </Dialog>
    </Container>
  );
};

export default Home;
