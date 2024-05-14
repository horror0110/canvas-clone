"use client";
import { GlobalContext } from "@/context/GlobalContext";
import { UploadButton } from "./uploadThing";
import Image from "next/image";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuLoader2 } from "react-icons/lu";
import { PiArticleMedium } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";

const AddCourseForm = () => {
  const [image, setImage] = useState("");
  const [imageIsDeleting, setImageIsDeleting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");
  const [price, setPrice] = useState("");
  const { setLoading, toast }: any = useContext(GlobalContext);


  const router = useRouter();

  const handleImageDelete = (image: string) => {
    setImageIsDeleting(true);

    const imageKey = image.substring(image.lastIndexOf("/") + 1);

    const data = { imageKey };

    fetch("/api/uploadthing/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res: any) => res.json())
      .then((data) => {
        if (data.success) {
          setImage("");
          alert("File upload successful!");
        }
      })
      .catch(() => {
        alert("when file upload error");
      })
      .finally(() => {
        setImageIsDeleting(false);
      });
  };

  const handleSave = (e: any) => {
    setLoading(true);
    const data = {
      title: title,
      price: parseInt(price),
      description: description,
      teacher: teacher,
      image: image,
    };
    e.preventDefault();

    fetch("/api/courses", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setLoading(false);
          router.push("/");
        } else {
          setLoading(false);
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Алдаа гарлаа",
            life: 3000,
          });
        }
      })
      .catch((err) => {
        setLoading(false), console.log(err);
      });
  };


  return (
    <>
      <Toast ref={toast} />
      <h1 className="font-bold text-lg mb-10">Курс нэмэх</h1>

      <div className="w-full gap-20">
        <h1 className="text-center font-bold text-lg">Курсын зураг оруулах</h1>
        <div className="flex flex-col mx-auto max-w-[400px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
          {image ? (
            <div className="relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4">
              <Image
                fill
                src={image}
                alt="profile image"
                className="object-contain"
              />

              <button
                onClick={() => handleImageDelete(image)}
                type="button"
                className="absolute right-[-12px]"
              >
                {imageIsDeleting ? <LuLoader2 /> : <IoMdClose />}
              </button>
            </div>
          ) : (
            <>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  setImage(res[0].url);

                  console.log("Files: ", res);
                  toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Upload completed",
                    life: 3000,
                  });
                }}
                onUploadError={(error: Error) => {
                  toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Алдаа гарлаа",
                    life: 3000,
                  });
                }}
              />
            </>
          )}
        </div>
        <div className="grid grid-cols-2 gap-20">
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Сургалтын нэр</label>
            <InputText
              onChange={(e) => setTitle(e.target.value)}
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Сургалтын тайлбар</label>
            <InputText
              onChange={(e) => setDescription(e.target.value)}
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Сургалтын үнэ</label>
            <InputText
              onChange={(e) => setPrice(e.target.value)}
              id="username"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username">Сургалтыг заах багш</label>
            <InputText
              type="text"
              onChange={(e) => setTeacher(e.target.value)}
              id="teacher"
              aria-describedby="username-help"
              className="border border-gray-500 "
            />
          </div>

       

          <div className="flex items-center justify-center  mx-auto my-10 text-center bg-mainColor text-white w-max p-2 rounded-md hover:bg-blue-500">
            <Button onClick={handleSave} label="Хадгалах" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourseForm;
