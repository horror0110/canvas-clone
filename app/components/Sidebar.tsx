import { UserButton, auth } from "@clerk/nextjs";
import { Tooltip } from "primereact/tooltip";
import { IoMdPersonAdd } from "react-icons/io";
import { IoIosPersonAdd } from "react-icons/io";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiCoursera } from "react-icons/si";
import { CiShoppingCart } from "react-icons/ci";
import { FaVideo } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import Link from "next/link";
import { checkRole } from "@/utils/roles";
import { CiLogin } from "react-icons/ci";
import { FaFacebookMessenger } from "react-icons/fa";

const Sidebar = () => {
  const isAdmin = checkRole("admin");
  const isTeacher = checkRole("teacher");
  const { userId } = auth();

  return (
    <div className="bg-mainColor h-screen p-2 sticky left-0 top-0">
      <div className="flex flex-col gap-5">
        <UserButton />

        <div className="flex flex-col gap-5">
          {isAdmin && (
            <div className="flex flex-col gap-5">
              <Link href="/teachers/add">
                <IoMdPersonAdd
                  data-pr-tooltip="Багш нэмэх"
                  color="white"
                  size={25}
                  className="cursor-pointer teacher"
                />
              </Link>

              <Link href="/students/add">
                <IoIosPersonAdd
                  data-pr-tooltip="Оюутан нэмэх"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>
              <Link href="/teachers">
                <LiaChalkboardTeacherSolid
                  data-pr-tooltip="Багш нар"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>

              <Link href="/">
                <SiCoursera
                  data-pr-tooltip="Сургалтууд"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>
              <Link href={`/mycourse/${userId}`}>
                <FaVideo
                  data-pr-tooltip="Миний сургалтууд"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>
              <Link href="/cart">
                <CiShoppingCart
                  data-pr-tooltip="Сагс"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>

              <Link href="/orders">
                <MdOutlinePayment
                  data-pr-tooltip="Гүйлгээнүүд"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>
              <Link href="/course/add">
                <AiOutlineVideoCameraAdd
                  data-pr-tooltip="Сургалт нэмэх"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>

              <Link href="/messenger">
                <FaFacebookMessenger
                  data-pr-tooltip="Тусламж чат"
                  color="white"
                  size={25}
                  className="cursor-pointer teacher"
                />
              </Link>
            </div>
          )}
          {isTeacher && !isAdmin && (
            <div className="flex flex-col gap-5">
              <Link href="/course/add">
                <AiOutlineVideoCameraAdd
                  data-pr-tooltip="Сургалт нэмэх"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>

              <Link href={`/mycourse/${userId}`}>
                <FaVideo
                  data-pr-tooltip="Миний сургалтууд"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>

              <Link href="/">
                <SiCoursera
                  data-pr-tooltip="Сургалтууд"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>

              <Link href="/cart">
                <CiShoppingCart
                  data-pr-tooltip="Сагс"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>

              <Link href="/messenger">
                <FaFacebookMessenger
                  data-pr-tooltip="Тусламж чат"
                  color="white"
                  size={25}
                  className="cursor-pointer teacher"
                />
              </Link>
            </div>
          )}
          {!isAdmin && !isTeacher && (
            <div className="flex flex-col gap-5">
              <Link href="/">
                <SiCoursera
                  data-pr-tooltip="Сургалтууд"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>

              <Link href="/cart">
                <CiShoppingCart
                  data-pr-tooltip="Сагс"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>

              <Link href={`/mycourse/${userId}`}>
                <FaVideo
                  data-pr-tooltip="Миний сургалтууд"
                  color="white"
                  size={25}
                  className="cursor-pointer student"
                />
              </Link>

              <Link href="/messenger">
                <FaFacebookMessenger
                  data-pr-tooltip="Тусламж чат"
                  color="white"
                  size={25}
                  className="cursor-pointer teacher"
                />
              </Link>
            </div>
          )}
        </div>

        {!userId && (
          <Link href="/sign-in">
            <CiLogin
              data-pr-tooltip="Нэвтрэх"
              color="white"
              size={25}
              className="cursor-pointer student"
            />
          </Link>
        )}
      </div>

      <Tooltip target=".teacher" />
      <Tooltip target=".student" />
    </div>
  );
};

export default Sidebar;
