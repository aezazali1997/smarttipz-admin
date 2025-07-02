import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import axiosInstance from "../APIs/axiosInstance";
import { LoginSchema } from "utils/validation_shema";

const useLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    checked: false,
  };

  const onSubmit = async (email, password, setSubmitting, setStatus) => {
    setLoading(true);
    setSubmitting(true);
    const data = { email, password };
    try {
      const {
        data: {
          data: { token, id, role, permissions },
          message,
        },
      } = await axiosInstance.login(data);
      setLoading(false);
      setStatus(message);
      cookie.set("token", token);
      localStorage.setItem("userId", id);
      localStorage.setItem("role", role);
      localStorage.setItem("permissions", JSON.stringify(permissions));
      router.push("/dashboard/admin");
    } catch (e) {
      console.log(e);
      console.log(e.response);
      console.log(e.response.data);
      setStatus(e.response.data.message);
      setSubmitting(false);
      setLoading(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: LoginSchema,
    validateOnBlur: true,
    onSubmit: ({ email, password }, { setSubmitting, setStatus }) => {
      onSubmit(email, password, setSubmitting, setStatus);
    },
  });

  return {
    showPassword,
    setShowPassword,
    formik,
    loading,
  };
};
export default useLogin;
