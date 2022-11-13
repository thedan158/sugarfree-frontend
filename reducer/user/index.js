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
    /* falls through */
    default:
      return state;
  }
}
