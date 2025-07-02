import Link from "next/link";
import Image from "next/image";
import Helmet from "react-helmet";
import { parseCookies } from "nookies";
import login from "../../public/login.png";
import logo from "../../public/logo.png";

import { useLogin } from "hooks";
import { Button, InputField } from "components";
import { getInputClasses } from "utils/helpers";
import { CloseEye, Email, OpenEye } from "assets/SVGs";

const Login = () => {
  const { setShowPassword, showPassword, formik, loading } = useLogin();

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col h-full p-5 pt-5 pb-2 space-y-5 xs:p-10">
        {/*SEO Support*/}
        <Helmet>
          <title>Login | Smart Tipz</title>
        </Helmet>
        {/*SEO Support End */}

        <div className="flex-col hidden w-full lg:flex">
          <span className="relative flex w-48 h-11">
            <Image
              src={logo}
              layout="fill"
              objectFit="cover"
              alt="brand logo"
              priority={true}
            />
          </span>
        </div>

        <div className="flex flex-col w-full h-full p-5 pt-5 pb-2 lg:flex-row xs:p-10 md:p-16 md:pb-1 md:pt-0">
          <div className="relative flex w-full h-52 sm:h-64 lg:h-full">
            <Image
              src={login}
              alt="banner"
              objectFit="contain"
              priority={true}
            />
          </div>

          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col w-full mt-4 space-y-2 lg:max-w-md lg:mt-0">
              <p className="text-3xl font-bold text-center  lg:text-left lg:text-3xl">
                Login
              </p>
            </div>
            <div className="flex flex-col w-full mt-6 lg:max-w-md justify-evenly">
              <form className="w-full" onSubmit={formik.handleSubmit}>
                {formik.status && (
                  <div
                    className={`${
                      formik.error
                        ? "bg-red-100 border border-red-400 text-red-700"
                        : "bg-green-100 border border-green-400 text-green-700"
                    } px-4 py-3 flex flex-row w-full justify-between items-center mb-10 rounded" role="alert`}
                  >
                    <span className="block sm:inline">{formik.status}</span>
                    <span className="relative px-4 py-3">
                      <svg
                        onClick={() => setShowAlert(false)}
                        className="w-6 h-6 text-black fill-current"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </span>
                  </div>
                )}

                <InputField
                  name={"email"}
                  type={"text"}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email}
                  svg={<Email color={"text-gray-500"} />}
                  inputClass={`${getInputClasses(
                    formik,
                    "email"
                  )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                  label={"Email"}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="mb-4 text-sm text-red-700">
                    {formik.errors.email}
                  </div>
                )}

                <div
                  className={`floating-input ${
                    formik.touched.password && formik.errors.password
                      ? "mb-1"
                      : "mb-5"
                  } relative`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    id={"password"}
                    name={"password"}
                    className={`${getInputClasses(
                      formik,
                      "password"
                    )}   border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="name@example.com"
                    autoComplete="off"
                  />
                  <label
                    htmlFor="password"
                    className="absolute top-0 left-0 h-full px-2 py-3 transition-all duration-100 ease-in-out origin-left transform pointer-events-none "
                  >
                    Password
                  </label>
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer "
                  >
                    {showPassword ? (
                      <OpenEye color={"text-gray-500"} />
                    ) : (
                      <CloseEye color={"text-gray-500"} />
                    )}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="mb-4 text-sm text-red-700">
                    {formik.errors.password}
                  </div>
                )}

                <Button
                  type={"submit"}
                  disable={loading}
                  classNames={`flex w-full mt-10 justify-center ${
                    loading ? "btn-disable" : "primary-btn"
                  } text-white p-3 rounded-md`}
                  childrens={"Login"}
                  loading={loading}
                />

                <div className="flex w-full mt-3 ">
                  <p className="w-full text-sm text-center text-gray-500 ">
                    <Link href="/auth/forgot-password">
                      <a className="text-sm font-semibold text-primary hover:underline">
                        Forgot Password ?
                      </a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  if (token)
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/admin",
      },
      props: {},
    };
  else {
    return {
      props: {},
    };
  }
};
export default Login;
