import * as yup from "yup"

export const CreateUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing!")
    .min(3, "Name is too start!")
    .max(3, "Name is too start!"),
  email: yup.string().required("Email is missing!").email("Invalid email"),
  password: yup
    .string()
    .trim()
    .required("Password is missing!")
    .min(8, "Password is to short!")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password is too simple!"
    ),
})
