// lib/scanLogs.ts
import axios from "axios";

export type ScanLogData = {
  nama: string;
  waktu: string;
  status: "hadir" | "telat" | "pulang";
};

export function sendScanLog(data: ScanLogData) {
  return axios.post("/api/log-display-clear", data);
}
