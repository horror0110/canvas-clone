"use client";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Tooltip } from "primereact/tooltip";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosPersonAdd } from "react-icons/io";

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
      </div>

      <Tooltip target=".teacher" />
      <Tooltip target=".student" />
    </div>
  );
};

export default Sidebar;
