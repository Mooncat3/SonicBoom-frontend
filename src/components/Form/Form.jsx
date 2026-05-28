import classes from "./Form.module.css";
import Input from "./Input/Input";
import TextArea from "./TextArea/TextArea";
import FileInput from "./FileInput/FileInput";
import validate from "./validation.jsx";
import { useState, useRef, useEffect } from "react";

export default function Form({
  title,
  inputs,
  submitFunction,
  children,
  ...props
}) {
  const [data, setData] = useState(() =>
    Object.entries(inputs).reduce((acc, input) => {
      acc[input[0]] = input[1].value || "";
      return acc;
    }, {})
  ); // Создание состояние для каждого поля формы

  useEffect(() => {
    if (inputs) {
      let new_data = Object.entries(inputs).reduce((acc, input) => {
        acc[input[0]] = input[1].value || "";
        return acc;
      }, {});
      setData(new_data);
    }
  }, [inputs]);

  const [errors, setErrors] = useState(() =>
    Object.entries(inputs).reduce((acc, input) => {
      acc[input[0]] = "";
      return acc;
    }, {})
  ); // Создание состояния для ошибок полей

  function setError(key, value) {
    setErrors({ ...errors, [key]: value }); // Установка ошибки для поля
  }

  function validate_field(key, value) {
    return validate(inputs[key], value); // Валидация поля
  }

  function validate_field_on_blur(event) {
    let name = event.target.name;
    setError(name, validate_field(name, data[name]));
  } // Валидация поля при переходе с активного на неактивное

  function form_validation(e) {
    e.preventDefault();
    let localErrors = {}; // Объект с ошибками полей
    for (let key of Object.keys(data)) {
      localErrors[key] = validate_field(key, data[key]);
    }
    setErrors(localErrors);
    for (let value of Object.values(localErrors)) {
      if (value) return;
    }
    if (!submitFunction) console.log(data.login, data.password);
    else submitFunction(data);
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const setFileData = (key, value) => {
    setData({ ...data, [key]: value });
    console.log(value);
  };

  return (
    <div className={classes.wrapper}>
      <h2>{title}</h2>
      <form
        noValidate
        onSubmit={form_validation}
        className={classes.form}
        {...props}
      >
        {Object.entries(inputs).map((input, key) => {
          let { inputType, ...inputProps } = input[1];
          if (inputType == "input") {
            return (
              <div key={key} className={classes.input_wrapper}>
                <Input
                  {...inputProps}
                  setFormError={setError}
                  onBlur={validate_field_on_blur}
                  onChange={handleChange}
                  value={data[input[0]]}
                  error={errors[input[0]]}
                />
              </div>
            );
          } else if (inputType == "textArea")
            return (
              <div key={key} className={classes.input_wrapper}>
                <TextArea
                  {...inputProps}
                  setFormError={setError}
                  onBlur={validate_field_on_blur}
                  onChange={handleChange}
                  value={data[input[0]]}
                  error={errors[input[0]]}
                />
              </div>
            );
          else if (inputType == "fileInput")
            return (
              <div key={key} className={classes.input_wrapper}>
                <FileInput
                  {...inputProps}
                  error={errors[input[0]]}
                  setError={setError}
                  setData={setFileData}
                  onBlur={validate_field_on_blur}
                />
              </div>
            );
        })}
        {children}
      </form>
    </div>
  );
}
