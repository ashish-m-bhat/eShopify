import React from "react";
import cssClasses from "./LoadingSpinner.module.css";

export default function LoadingSpinner(props) {

  // Mechanism to stop the Spinner after a few seconds
  // Helpful when the Spinner has to stop and display a Not Found message.
  if(props.setCallSpinner){
    setTimeout(() => {
      props.setCallSpinner(false);
    }, props.timeout || 1000);
  }

  return (
    <div>
      <div className={cssClasses.backdrop}>
      </div>
      <div className={cssClasses.spinnerContainer}>
        <div className={cssClasses.loadingSpinner}></div>
      </div>
    </div>
  );
}