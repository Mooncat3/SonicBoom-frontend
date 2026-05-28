import classes from "./ActionsBlock.module.css";

export default function ActionsBlock({ children, ...props }) {
  return (
    <div className={classes.actions_wrapper} {...props}>
      {children}
    </div>
  );
}
