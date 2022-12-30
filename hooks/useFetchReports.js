import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAPIAction2,
  getAPIActionJSON,
  getStatelessAPI,
} from "../api/ApiActions";

const useFetchReport = (patient) => {
  const username = useSelector((state) => state.user.username);
  const todayBMI = useSelector((state) => state.user.todayBMI);
  const todaySugarLevel = useSelector((state) => state.user.todaySugarLevel);
  const dispatch = useDispatch();
  useEffect(() => {
    if (patient === "") {
      dispatch(getAPIActionJSON("getAllReport", { username: username }));
    } else dispatch(getAPIActionJSON("getAllReport", { username: patient }));
  }, [todayBMI, todaySugarLevel]);
};

export default useFetchReport;
