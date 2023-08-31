import cssClasses from './Card.module.css';

type Props = {
  className?: string,
  onClick?: () => void,
  children?: React.ReactNode
}

const Card:React.FC<Props> = (props) => {
  const classes = cssClasses.card +' ' + props.className; // <div className={`classes ${props.className}`}>
  return (
    <div className={classes} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default Card;
