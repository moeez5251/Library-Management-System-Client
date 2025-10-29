import { signOut } from "next-auth/react";
export async function logout(status) {
    const data = await fetch("/req/users/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!data.ok) {
        throw new Error("Unable to logout");
    }

    if (status === "authenticated") {
        await signOut({ redirect: false });
    }
    localStorage.removeItem("user");
    window.location.href = "/";
}
