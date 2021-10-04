import * as Yup from "yup";


const Email = (requiredText) => {
    return Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required(requiredText)
}

const Password = () => {
    return Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .required('Password is a required field')
}

export const LoginSchema = Yup.object().shape({
    checked: Yup.boolean(),
    email: Email('Email is a required field'),
    password: Password(),
});

export const CreateAdminValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is a required field'),
    email: Email('Email is a required field'),
    password: Password(),
});

export const OptionalAdminSchema = Yup.object().shape({
    name: Yup.string().optional(),
    email: Yup.string()
        .email("Wrong email format")
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .optional(),
    password: Yup.string()
        .min(3, "Minimum 3 characters")
        .max(50, "Maximum 50 characters")
        .optional(),
});

export const ForgetPasswordSchema = Yup.object().shape({
    email: Email('Email is a required field'),
});
