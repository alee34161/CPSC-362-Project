import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to the Cafeteria Ordering System</h1>
      <p className="text-lg mt-2">Click below to log in</p>
      <Link href="/login">
        <button className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-md">
          Go to Login
        </button>
      </Link>
    </div>
  );
}
