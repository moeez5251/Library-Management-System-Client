"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function InitAuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    const setup = async () => {
      if (!session?.user) {
        toast.error("No session found");
        router.push("/");
        return;
      }

      try {
        const res = await fetch("/req/users/auth-users", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session.user.email,
            google_id: session.user.googleId,
            name: session.user.name,
          }),
        });

        if (!res.ok) {
          toast.error("Failed to authenticate user");
          router.push("/");
          return;
        }

        const data = await res.json();

        if (data) {
        localStorage.setItem("user", JSON.stringify(data.userID))
         
        }

        router.replace("/dashboard");
      } catch (err) {
        toast.error("Something went wrong");
        router.replace("/");
      }
    };

    setup();
  }, [session, status]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Setting up your account, please wait...</p>
    </div>
  );
}
