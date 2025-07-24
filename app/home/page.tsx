"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
type AbsensiData = {
  nama: string;
  waktu: string;
  foto: string;
  status: "hadir" | "telat" | "pulang";
};

export default function DashboardPage() {
  const [rfid, setRfid] = useState("");
  const [connected, setConnected] = useState(false);
  const [mode, setMode] = useState<"waiting" | "showing">("waiting");
  const [user, setUser] = useState<AbsensiData | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3001"); // Ganti dengan URL backend WebSocket kamu

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket");
      setConnected(true);
    });

    socket.on("rfidDetected", async (data) => {
      console.log("📡 RFID received from server:", data);
      setRfid(data);
      setMode("showing");
      setTimeout(() => {
        setRfid("");
        console.log("🔁 RFID cleared after timeout");
      }, 1000);
    });

    socket.onAny((event, ...args) => {
      console.log(`📥 [WS EVENT] ${event}:`, ...args);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Disconnected from WebSocket");
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCardTap = (data: AbsensiData) => {
    setUser(data);
    setMode("showing");

    setTimeout(() => {
      setMode("waiting");
      setUser(null);
    }, 5000);
  };

  return (
    <div className="flex p-3 items-center w-full justify-center min-h-screen bg-muted/50">
      {mode === "waiting" ? (
        <Card className="p-10 mx-auto text-center h-[500px] animate-pulse">
          <Button className="bg-green-500">Absen Masuk</Button>
          <CardHeader>
            <CardTitle className="text-xl">Menunggu Tap Kartu...</CardTitle>
            <CardTitle className="text-xl">
              Status Mesin: {connected ? "🟢 Connected" : "🔴 Disconnected"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Silakan tap kartu di mesin untuk absensi
            </p>
            <div className="mt-6 text-4xl">📡</div>
          </CardContent>
          <Button variant="destructive">Absenn Pulang</Button>
        </Card>
      ) : (
        <Card className="p-6 w-[350px] text-center">
          <Button className="bg-green-500">Absenn Masuk</Button>
          <CardHeader>
            <CardTitle>✅User terdeteksi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Avatar className="mx-auto w-24 h-24">
              <AvatarImage src={user?.foto} alt={user?.nama} />
              <AvatarFallback>{user?.nama?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-lg font-semibold">
                Nama : {user?.nama}
                {rfid}
              </p>
              <p className="text-lg font-semibold">Rfid :{rfid}</p>
              <p className="text-sm text-muted-foreground">
                Waktu : {user?.waktu}
              </p>
              <StatusBadge status={user?.status ?? "hadir"} />
            </div>
          </CardContent>
          <Button variant="destructive">Absenn Pulang</Button>
        </Card>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: "hadir" | "telat" | "pulang" }) {
  const colorMap = {
    hadir: "bg-green-500",
    telat: "bg-yellow-500",
    pulang: "bg-gray-500",
  };
  return (
    <span
      className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm ${colorMap[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
