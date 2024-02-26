"use client";
import { useRouter } from "next/navigation";
import { IoMdPersonAdd } from "react-icons/io";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="bg-mainColor h-screen p-2 sticky left-0 top-0  ">
      <IoMdPersonAdd
        color="white"
        size={25}
        className="cursor-pointer"
        onClick={() => router.push("/teachers/add")}
      />
    </div>
  );
};

export default Sidebar;
