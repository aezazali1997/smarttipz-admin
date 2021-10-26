import React from 'react'
import { CloseEye, Email, OpenEye, User } from 'assets/SVGs'
import { InputField, PhoneInput } from 'components'
import { getInputClasses } from 'utils/helpers'

const Index = ({ formik, setShowPassword, showPassword, phoneNumber, _OnPhoneNoChange, businessUser, website }) => {
    return (
        <div className="flex flex-col w-full">
            <InputField
                name={"name"}
                type={"text"}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name}
                svg={(
                    <User color={'text-gray-500'} />
                )}
                inputClass={`${getInputClasses(
                    formik, "name"
                )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                label={'Name'}
            />
            {formik.touched.name && formik.errors.name &&
                <div className="text-red-700 text-sm mb-4" >{formik.errors.name}</div>
            }
            {businessUser &&
                <>
                    <div className={`relative mb-5 w-full`}>
                        <PhoneInput
                            value={phoneNumber}
                            onChange={_OnPhoneNoChange}
                        />
                        <svg className="absolute right-2 top-3 w-6 h-6 pointer-events-none text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                    </div>
                    <InputField
                        name={"website"}
                        type={"text"}
                        svg={(
                            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                            </svg>
                        )}
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.websiteName && formik.errors.website}
                        inputClass={`${getInputClasses(
                            formik, "website"
                        )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                        label={'Business Website address'}
                    />
                    {formik.touched.website && formik.errors.website ? (
                        <div className="text-red-700 text-sm mb-4" >{formik.errors.website}</div>
                    ) : null}

                </>
            }

            <InputField
                name={"email"}
                type={"text"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && formik.errors.email}
                svg={(
                    <Email color={'text-gray-500'} />
                )}
                inputClass={`${getInputClasses(
                    formik, "email"
                )} border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}
                label={'Email'}
            />
            {formik.touched.email && formik.errors.email &&
                <div className="text-red-700 text-sm mb-4" >{formik.errors.email}</div>
            }


            <div className={`floating-input ${formik.touched.password && formik.errors.password ? "mb-1" : "mb-4"} relative`}>
                <input
                    type={showPassword ? "text" : "password"}
                    id={'password'}
                    name={'password'}
                    className={`${getInputClasses(
                        formik, "password"
                    )}   border bg-gray-50 text-sm border-gray-200 focus:outline-none rounded-md focus:shadow-sm w-full px-2 py-3  h-12`}

                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="name@example.com"
                    autoComplete="off" />
                <label
                    htmlFor="password"
                    className="absolute top-0 left-0 px-2 py-3 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out ">
                    Password
                </label>
                <div onClick={() => { setShowPassword(!showPassword) }}
                    className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer ">
                    {
                        showPassword ?
                            <OpenEye color={'text-gray-500'} />
                            :
                            <CloseEye color={'text-gray-500'} />
                    }
                </div>
            </div>
            {formik.touched.password && formik.errors.password &&
                <div className="text-red-700 text-sm mb-4" >{formik.errors.password}</div>
            }
        </div>
    )
}

export default Index
