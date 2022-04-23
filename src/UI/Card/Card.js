import cssClasses from './Card.module.css';

function Card(props) {
  const classes = cssClasses.card +' ' + props.className; // <div className={`classes ${props.className}`}>
  return (
    <div className={classes}>
      {props.children}
    </div>
  );
}

export default Card;
