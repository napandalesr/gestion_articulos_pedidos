import React from "react";

interface IDataSource {
  reference?: string
  name?: string
  price_tax_free?: string
  tax?: string
  description?: string
}

export const userForm = (callback: (event: any) => void): any => {
  const [validate, setValidate] = React.useState(false);
  const [values, setValues] = React.useState<IDataSource>({
    reference: "",
    name: "",
    price_tax_free: "",
    tax: "",
    description: ""
  });
  const handleChange = (event: any): void => {
    event.preventDefault();
    const name = event.target.name;
    const val = event.target.value;
    setValidate(true);
    setValues({
      ...values,
      [name]: val
    });
  };

  const showError = (visible: boolean): void => {
    setValidate(visible);
  };

  const handleSubmit = (event: any): void => {
    event.preventDefault();
    const errors = document.getElementsByClassName("invalid-feedback");
    let i: number = 0;
    let visible: boolean = false;
    while (i < errors.length) {
      if (getComputedStyle(errors[i]).display === "block") {
        visible = true;
        showError(visible);
      }
      i++;
      if (i === errors.length && !visible) {
        setValidate(visible);
        callback(event);
      }
      if (i === errors.length) {
        if (values?.reference !== "" &&
        values?.name !== "" &&
        values?.price_tax_free !== "" &&
        values?.tax !== "" &&
        values?.description !== "") {
          callback(event);
        }
      }
    }
  };

  return {
    handleSubmit,
    handleChange,
    values,
    validate
  };
};
