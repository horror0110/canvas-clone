"use client";
import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";
import { PacmanLoader } from "react-spinners";

const Loader = () => {
  const { loading }: any = useContext(GlobalContext);
  return (
    loading && (
      <>
        {/* Background overlay */}
        <div className="fixed top-0 left-0 z-40 h-screen w-screen bg-blue-100 opacity-30 flex items-center justify-center"></div>

        {/* Loader */}
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center h-screen w-screen">
          <PacmanLoader color="#36d7b7" />
        </div>
      </>
    )
  );
};

export default Loader;
