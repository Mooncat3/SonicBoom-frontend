import classes from "./FormButton.module.css";

export default function FormButton({ title, ...props }) {
  return (
    <button className={classes.form_button} type="submit" {...props}>
      {title}
    </button>
  );
}
