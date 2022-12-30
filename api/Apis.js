export const getAPIs = {
  login: {
    name: "login",
    path: "/auth/login",
    method: "POST",
  },
  getTodayReport: {
    name: "getTodayReport",
    path: "/report/getTodayReport",
    method: "POST",
  },
  getUser: {
    name: "getUser",
    path: "/auth/getUser",
    method: "GET",
  },
  saveTodaySugarLevel: {
    name: "saveTodaySugarLevel",
    path: "/report/saveSugarlvl",
    method: "POST",
  },
  saveTodayBMI: {
    name: "saveTodayBMI",
    path: "/report/saveBMI",
    method: "POST",
  },
  getAllReport: {
    name: "getAllReport",
    path: "/report/getAllReport",
    method: "POST",
  },
  getAllDoctor: {
    name: "getAllDoctor",
    path: "/doctor/getAllDoctors",
    method: "GET",
  },
  getPatientMessage: {
    name: "getPatientMessage",
    path: "/doctor/getPatientMessages",
    method: "GET",
  },
  getAllMedicine: {
    name: "getAllMedicine",
    path: "/doctor/getAllMedicine",
    method: "GET",
  },
  getAllPrescription: {
    name: "getAllPrescription",
    path: "/report/getAllPrescription",
    method: "GET",
  },
  createPrescription: {
    name: "createPrescription",
    path: "/report/createPrescription",
    method: "POST",
  },
};
