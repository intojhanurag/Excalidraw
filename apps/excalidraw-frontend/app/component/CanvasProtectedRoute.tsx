"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners"; // or any spinner you like

interface ProtectedRouteProps {
  slug: string;
  children: React.ReactNode;
}

export function CanvasProtectedRoute({ slug, children }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [roomExists, setRoomExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkRoom() {
      try {
        const response = await fetch(`http://localhost:3001/room/${slug}`);
        const data = await response.json();
        if (data.room) {
          setRoomExists(true);
        } else {
          setRoomExists(false);
          router.replace("/dashboard");
        }
      } catch {
        setRoomExists(false);
        router.replace("/dashboard");
      } finally {
        setLoading(false);
      }
    }
    checkRoom();
  }, [roomId, router]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <ClipLoader size={50} color="#36d7b7" />
      </div>
    );
  }

  if (!roomExists) return null; // Prevents canvas from flashing

  return <>{children}</>;
}