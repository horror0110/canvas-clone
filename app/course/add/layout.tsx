import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import React from "react";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  // If the user does not have the admin role, redirect them to the home page
  if (!(checkRole("admin") || checkRole("teacher"))) {
    redirect("/");
  }
  return <div>{children}</div>;
};

export default Layout;
