"use client";
import Image from "next/image";
import AuthButton from "@/components/authButton";

export default function SignIn() {
  return (
    <main className="h-screen bg-slate-700 w-full relative">
      <div className="font-semibold text-3xl text-blue-700 absolute text-center top-8 left-12">
        Taskastra
      </div>
      <div className="items-center flex flex-row w-full h-full">
        <div className="w-1/2 h-full">
          <Image
            src="/images/login.png"
            alt="image"
            width={512}
            height={512}
            className="w-auto h-full object-cover"
          />
        </div>
        <div className="w-1/2 flex flex-col text-center bg-slate-100 items-center justify-center align-middle gap-2 border h-full">
          <span className="font-semibold text-3xl text-blue-700">
            Taskastra
          </span>
          <span className="font-medium text-sm text-slate-400 mb-8">
            It all starts with a to-do!
          </span>
          <AuthButton />
        </div>
      </div>
    </main>
  );
}
