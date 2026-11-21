
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, logout } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getUser()
      .then(setUser)
      .catch(() => router.replace("/login"));
  }, [router]);

  async function handleLogout() {
    try {
      await logout();
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) {
    return <p>Memeriksa session...</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        Dashboard Procura
      </h1>

      <p>Selamat datang, {user.name}!</p>
      <p>Email: {user.email}</p>

      <button
        onClick={handleLogout}
        className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
      >
        Logout
      </button>
    </main>
  );
}
