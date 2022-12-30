const initialState = {
  fullname: "",
  userImagePath: "",
  role: "",
  id: "",
  username: "",
  todaySugarLevel: "",
  todayBMI: 0,
  phoneNumber: "",
  isLoggedin: false,
  userHistory: [],
  reviewing: "",
  listDoctor: [],
  listPillInsulin: [],
  listPillAmylinomimetic: [],
  listPillType2: [],
  currentPrescription: [],
};
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case "login.reply":
      if (action.data.success === true) {
        return {
          ...state,
          userImagePath: action.data.imagePath,
          role: action.data.role,
          id: action.data._id,
          username: action.data.username,
          isLoggedin: true,
        };
      }
    case "getTodayReport.reply":
      if (action.data.success === true && action.data.message !== undefined) {
        return {
          ...state,
          todayBMI: action.data.message.BMI,
          todaySugarLevel: action.data.message.sugarLevel,
        };
      } else {
        return {
          ...state,
          todayBMI: 0,
          todaySugarLevel: "",
        };
      }
    case "saveTodaySugarLevel.reply":
      if (action.data.success === true) {
        return {
          ...state,
          todaySugarLevel: action.data.sugarLevel,
        };
      }
    case "saveTodayBMI.reply":
      if (action.data.success === true) {
        return {
          ...state,
          todayBMI: action.data.BMI,
        };
      }
    case "getUser.reply":
      if (action.data.success === true) {
        return {
          ...state,
          fullname: action.data.data.fullname,
          userImagePath: action.data.data.imagePath,
          phoneNumber: action.data.data.phoneNumber,
          role: action.data.data.role,
          username: action.data.data.username,
          id: action.data.data._id,
        };
      }
    case "logout":
      return {
        ...state,
        isLoggedin: false,
      };
    case "getAllReport.reply":
      return {
        ...state,
        userHistory: action.data.message,
      };
    case "changeReviewing":
      return {
        ...state,
        reviewing: action.data,
      };
    case "changeCurrentPrescription":
      return {
        ...state,
        currentPrescription: action.data,
      };
    case "clearReviewing":
      return {
        ...state,
        reviewing: "",
      };
    case "getAllDoctor.reply":
      return {
        ...state,
        listDoctor: action.data.message,
      };
    case "getAllMedicine.reply":
      if (action.data.message[0].type === "type 2") {
        return {
          ...state,
          listPillType2: action.data.message,
        };
      }
      if (action.data.message[0].type === "insulin") {
        return {
          ...state,
          listPillInsulin: action.data.message,
        };
      }
      if (action.data.message[0].type === "amylinomimetic") {
        return {
          ...state,
          listPillAmylinomimetic: action.data.message,
        };
      }

    /* falls through */
    default:
      return state;
  }
}
