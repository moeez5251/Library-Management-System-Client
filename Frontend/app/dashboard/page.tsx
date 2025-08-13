"use client"

import { Toaster } from "@/components/ui/sonner";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react"
import { toast } from "sonner";
export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [Trigger, settrigger] = React.useState<boolean>(false)
  React.useEffect(() => {
    if (session && !Trigger) {
      (async () => {
        const data = await fetch("http://127.0.0.1:8000/users/auth-users", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user?.email,
            google_id: session.user?.googleId,
            name: session.user?.name

          })
        })
        if (!data.ok) {
          toast.error("Failed to authenticate user")
          router.push("/")
          return
        }
        const response = await data.json()
        localStorage.setItem("user", JSON.stringify(response.userID))
        settrigger(true)
      })()
    }

    return () => {

    }
  }, [session])
  React.useEffect(() => {
    router.prefetch("/");
    return () => {

    }

  }, [router])

  return <>
    <Toaster />
    <button
      onClick={() => signOut({ redirect: false }).then(() => router.push("/"))}
    >
      Logout
    </button>

    <div>Welcome, {session?.user?.name}</div>;
  </>
}
