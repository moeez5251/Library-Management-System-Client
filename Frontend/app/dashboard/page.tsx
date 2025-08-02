"use client"

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  return <>
    <button
      onClick={() => signOut({ redirect: false }).then(() => router.push("/"))}
    >
      Logout
    </button>

    <div>Welcome, {session?.user?.name}</div>;
  </>
}
