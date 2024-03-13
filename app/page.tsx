"use client";

import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "primereact/button";
import Container from "./components/Container";
import { GlobalContext } from "@/context/GlobalContext";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { UploadButton } from "./components/uploadThing";
import { useRouter } from "next/navigation";
import { IoBookOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useUser } from "@clerk/clerk-react";
import Loader from "./components/Loader";
import { PacmanLoader } from "react-spinners";

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

    fetch("/api/courses", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setCourses(data.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);

  const handleAdd = (id: any, name: string) => {
    setVisible(true);

    setHeader(name);
    setGetId(id);
  };

  const handleSave = () => {
    setSmallLoading(true);
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
      <Toast ref={toast} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5  gap-y-10">
        {courses.map((course: any, index) => (
          <div
            className="w-[250px] text-center  rounded-md cursor-pointer"
            key={index}
          >
            {admin && (
              <div
                className="rounded-full bg-mainColor w-max p-1 m-1"
                onClick={() => handleAdd(course.id, course.title)}
              >
                <IoMdAdd color="white" />
              </div>
            )}
            {teacher && (
              <div
                className="rounded-full bg-mainColor w-max p-1 m-1"
                onClick={() => handleAdd(course.id, course.title)}
              >
                <IoMdAdd color="white" />
              </div>
            )}

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
                  10ш видео хичээл
                </span>
              </div>

              <span className="font-bold text-md text-start ">
                {course.price}
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
        <div className="bg-mainColor flex items-center gap-1 text-white w-max rounded-md px-4 py-1">
          <Button label=" Хадгалах" onClick={handleSave} />
          {smallLoading && <PacmanLoader color="#36d7b7" size={10} />}
        </div>
      </Dialog>
    </Container>
  );
};

export default Home;
