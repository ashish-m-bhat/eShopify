import React from "react";
import cssClasses from "./LoadingSpinner.module.css";

interface Props {
  setCallSpinner?: React.Dispatch<React.SetStateAction<boolean>>,
  timeout?: number
};

export default function LoadingSpinner(props: Props) {

  // Mechanism to stop the Spinner after a few seconds
  // Helpful when the Spinner has to stop and display a Not Found message.

    setTimeout(() => {
      props.setCallSpinner && props.setCallSpinner(false);
    }, props.timeout || 1000);

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
