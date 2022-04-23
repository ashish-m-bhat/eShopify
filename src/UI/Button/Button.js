import cssClasses from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <button className={`${cssClasses.Button} ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
