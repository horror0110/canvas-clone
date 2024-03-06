"use client";
import AddTeacherForm from "@/app/components/AddTeacherForm";
import Container from "@/app/components/Container";
import FamilyTable from "@/app/components/FamilyTable";
import { menu } from "../../../utils/Menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

const AddTeacherPage = () => {
  const [activeSection, setActiveSection] = useState("main");

  return (
    <Container>
      <div className="flex gap-10">
        <div className="flex flex-col gap-5 text-[15px]">
          {menu.map((el: any) => (
            <Link
              onClick={() => setActiveSection(el.path)}
              key={el.title}
              href=""
            >
              {el.title}
            </Link>
          ))}
        </div>

        {activeSection === "main" && <AddTeacherForm />}

        {activeSection === "family" && <FamilyTable />}
      </div>
    </Container>
  );
};

export default AddTeacherPage;
