"use client";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sendScanLog } from "@/lib/api/scanLogs";
type AbsensiData = {
  nama: string;
  waktu: string;
  foto: string;
  status: "hadir" | "telat" | "pulang";
};

export default function DashboardPage() {
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"waiting" | "showing">("waiting");
  const [users, setUsers] = useState<AbsensiData[]>([]);
  const beepSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    beepSound.current = new Audio("/beep-329314.mp3");
  }, []);

  const handleCardTap = (data: AbsensiData) => {
    // Cek apakah nama yang sama sudah ada dalam daftar tampilan
    const isAlreadyPresent = users.some((user) => user.nama === data.nama);
    if (isAlreadyPresent) {
      console.log(`[SKIP] ${data.nama} sudah ditampilkan.`);
      return;
    }

    // Play suara beep
    beepSound.current?.play();

    setUsers((prev) => [...prev, data]);
    setMode("showing");
    setTimeout(() => {
      sendScanLog({
        nama: data.nama,
        waktu: data.waktu,
        status: data.status,
      })
        .then((res) => {
          console.log("Berhasil kirim log:", res?.data || res);
          toast.success(`Absensi ${data.nama} berhasil`);
        })
        .catch((err) => {
          console.error("Gagal kirim log:", err);
          toast.error(`Gagal kirim log untuk ${data.nama}`);
        });
    }, 2000);
    // Reset tampilan setelah 5 detik
    // Clear timeout sebelumnya kalau ada
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    // Set timeout baru untuk reset tampilan setelah 5 detik dari scan terakhir
    resetTimeoutRef.current = setTimeout(() => {
      setMode("waiting");
      setUsers([]);
    }, 5000);
  };

  const simulateMultipleScans = () => {
    const dummyUsers: AbsensiData[] = [
      {
        nama: "Alice",
        waktu: new Date().toLocaleTimeString(),
        foto: "/foto-default.jpg",
        status: "hadir",
      },
      {
        nama: "Bob",
        waktu: new Date().toLocaleTimeString(),
        foto: "/foto-default.jpg",
        status: "telat",
      },
      {
        nama: "Charlie",
        waktu: new Date().toLocaleTimeString(),
        foto: "/foto-default.jpg",
        status: "pulang",
      },
      {
        nama: "Diana",
        waktu: new Date().toLocaleTimeString(),
        foto: "/foto-default.jpg",
        status: "hadir",
      },
    ];

    dummyUsers.forEach((userData, index) => {
      setTimeout(() => {
        handleCardTap(userData);
      }, index * 100);
    });
  };

  return (
    <div className="flex p-3 items-center w-full justify-center min-h-screen bg-muted/50 relative">
      {mode === "waiting" ? (
        <Card className="p-10 mx-auto text-center h-[500px] animate-pulse">
          <CardHeader>
            <CardTitle className="text-xl">Menunggu Tap Kartu...</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Silakan tap kartu di alat untuk absensi
            </p>
            <div className="mt-6 text-4xl">📡</div>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-6 w-full max-w-2xl text-center">
          <CardHeader>
            <CardTitle>✅ Absensi Berhasil</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {users.map((user, idx) => (
              <div key={idx} className="space-y-2">
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarImage src={user.foto} alt={user.nama} />
                  <AvatarFallback>{user.nama.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-sm font-semibold">{user.nama}</p>
                <p className="text-xs text-muted-foreground">{user.waktu}</p>
                <StatusBadge status={user.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tombol Tes Manual */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() =>
            handleCardTap({
              nama: "Tes Manual",
              waktu: new Date().toLocaleTimeString(),
              foto: "/foto-default.jpg",
              status: "hadir",
            })
          }
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
        >
          Tes Scan Manual
        </button>

        <button
          onClick={simulateMultipleScans}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 shadow"
        >
          Tes Scan 4 Orang
        </button>
      </div>
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
      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-white text-xs ${colorMap[status]}`}
    >
      {status.toUpperCase()}
    </span>
  );
}
