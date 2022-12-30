import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAPIActionJSON } from "../api/ApiActions";

const useFetchDoctorList = (props) => {
  const { isFocus } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAPIActionJSON("getAllDoctor", null));
    dispatch(getAPIActionJSON("getAllMedicine", null, null, "/insulin"));
    dispatch(getAPIActionJSON("getAllMedicine", null, null, "/type 2"));
    dispatch(getAPIActionJSON("getAllMedicine", null, null, "/amylinomimetic"));
  }, [isFocus]);
};

export default useFetchDoctorList;
