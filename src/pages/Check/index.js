import React from "react";
import history from "../../services/history";

export default function Check() {
  React.useEffect(() => {
    const patient = localStorage.getItem("patient");
    const parseChecked = JSON.parse(patient);
    console.log(parseChecked);
    if (parseChecked.patient.valid) {
      console.log("validado");
      history.push("dashboard");
    } else {
      history.push("completeprofile");
      console.log("nao validado");
    }
  }, []);
  return <div></div>;
}
