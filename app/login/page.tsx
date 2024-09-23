import Link from "next/link";
import AuthButton from "@/components/authButton";

export default function Login() {
  return (
    <main className="h-screen bg-slate-700 w-full relative">
      <Link
        href={"/"}
        className="font-semibold text-3xl text-slate-100 absolute text-center top-8 left-12"
      >
        Taskastra
      </Link>
      <div className="items-center flex flex-row w-full h-full">
        <div className="w-1/2 h-full bg-blue-700"></div>
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
