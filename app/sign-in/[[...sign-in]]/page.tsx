import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center w-screen">
      <SignIn />
    </div>
  );
}
