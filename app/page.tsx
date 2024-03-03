import { auth } from "@clerk/nextjs";
import React from "react";

const Home = () => {
  const { userId } = auth();

  return <div>Home</div>;
};

export default Home;
