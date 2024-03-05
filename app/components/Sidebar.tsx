"use client";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Tooltip } from "primereact/tooltip";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosPersonAdd } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiCoursera } from "react-icons/si";
import { CiShoppingCart } from "react-icons/ci";
import { FaVideo } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="bg-mainColor h-screen p-2 sticky left-0 top-0  ">
      <div className="flex flex-col gap-5">
        <UserButton />

        <IoMdPersonAdd
          data-pr-tooltip="Багш нэмэх"
          color="white"
          size={25}
          className="cursor-pointer teacher"
          onClick={() => router.push("/teachers/add")}
        />

        <IoIosPersonAdd
          data-pr-tooltip="Оюутан нэмэх"
          color="white"
          size={25}
          className="cursor-pointer student"
          onClick={() => router.push("/students/add")}
        />

        <LiaChalkboardTeacherSolid
          data-pr-tooltip="Багш нар"
          color="white"
          size={25}
          className="cursor-pointer student"
          onClick={() => router.push("/teachers")}
        />

        <SiCoursera
          data-pr-tooltip="Сургалтууд"
          color="white"
          size={25}
          className="cursor-pointer student"
          onClick={() => router.push("/")}
        />
        <FaVideo
          data-pr-tooltip="Миний сургалтууд"
          color="white"
          size={25}
          className="cursor-pointer student"
          onClick={() => router.push("/purchased")}
        />
        <CiShoppingCart
          data-pr-tooltip="Сагс"
          color="white"
          size={25}
          className="cursor-pointer student"
          onClick={() => router.push("/cart")}
        />

        <MdOutlinePayment
          data-pr-tooltip="Гүйлгээнүүд"
          color="white"
          size={25}
          className="cursor-pointer student"
          onClick={() => router.push("/orders")}
        />
      </div>

      <Tooltip target=".teacher" />
      <Tooltip target=".student" />
    </div>
  );
};

export default Sidebar;
