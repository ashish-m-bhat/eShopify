import reactDom from "react-dom";
import Button from "../Button/Button";
import Card from "../Card/Card";
import ErrorModalCssModule from "./ErrorModal.module.css";

interface Props {
  title: string;
  message: string;
  closeErrorModal: () => void
};

const Overlay = (props: Props) => {
  return (
    <Card className={`${ErrorModalCssModule.modal}`}>
      <header className={ErrorModalCssModule.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={ErrorModalCssModule.content}>
        <p>{props.message}</p>
      </div>
      <footer className={ErrorModalCssModule.actions}>
        <Button onClick={props.closeErrorModal}>Okay</Button>
      </footer>
    </Card>
  );
};

const Backdrop = (props: { closeErrorModal: () => void}) => {
  return (
    <div
      className={ErrorModalCssModule.backdrop}
      onClick={props.closeErrorModal}
    ></div>
  );
};
const ErrorModal = (props: Props) => {
  return (
    <div>
      {reactDom.createPortal(
        <Backdrop closeErrorModal={props.closeErrorModal} />, document.getElementById('BackdropModal') as HTMLDivElement
      )}
      {reactDom.createPortal(
        <Overlay
          title={props.title}
          message={props.message}
          closeErrorModal={props.closeErrorModal}
        />, document.getElementById('ErrorModal') as HTMLDivElement
      )}
    </div>
  );
};

export default ErrorModal;
