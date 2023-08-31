import cssClasses from "./Button.module.css";

interface Props {
  onClick: (args: any) => void
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: string;
  hidden?: boolean;
};

const Button = (props: Props) => {
  return (
    <div>
      <button className={`${cssClasses.Button} ${props.className}`} onClick={(args) => props.onClick(args)} disabled={props.disabled}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
