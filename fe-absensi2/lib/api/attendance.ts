import axios from "../axiosInstance";

export const getAllAttendance = async () => {
  const res = await axios.get("/attendance");
  return res.data;
};

export const getDailyAttendance = async () => {
  const res = await axios.get("/attendance/daily");
  return res.data;
};

export const getWeeklyAttendance = async () => {
  const res = await axios.get("/attendance/weekly");
  return res.data;
};

export const getMonthlyAttendance = async () => {
  const res = await axios.get("/attendance/monthly");
  return res.data;
};

export const getAttendanceById = async (id: number) => {
  const res = await axios.get(`/attendance/${id}`);
  return res.data;
};
