import * as Yup from "yup";

const emailRegex = "[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$";

const validationSchemaForm = Yup.object().shape({
  name: Yup.string().required("Поле name обязятельное!"),
  email: Yup.string()
    .email()
    .matches(
      emailRegex,
      "Адрес электронной почты должен быть в формате ...@gmail.com"
    )
    .required("Поле email обязятельное!"),
  contact: Yup.string()
    .min(9, "Must be exactly 9 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Поле contact обязятельное!"),
});

export { validationSchemaForm };
