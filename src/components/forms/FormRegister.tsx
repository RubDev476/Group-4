'use client';

import { useForm, useWatch, SubmitHandler } from "react-hook-form";
import { RegisterType } from "@/src/types";
import type { FormsSessionProps } from "@/src/types/components-props";

export default function FormRegister({ select, setFormRegister, blur, activeFields, setSuccess, errorSubmit }: FormsSessionProps) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<RegisterType>();
    const [passwordValue, confirmPasswordValue] = useWatch({
        control,
        name: ['password', 'confirmPassword'],
    });

    const onSubmit: SubmitHandler<RegisterType> = (data) => {
        if (data.password !== data.confirmPassword) return;

        setSuccess(true);
    };

    return (
        <>
            <div className="modal-brand logo-font">
                <span>my<span className="logo-accent">feed</span></span>
            </div>
            <h3 className="logo-font">Join myfeed</h3>
            <p className="modal-subtitle">Share freely in the communities you choose.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-input relative">
                    <label htmlFor="username" className={`username absolute ${activeFields?.['username'] ? 'active' : ''}`}>User name <span>*</span></label>
                    <input
                        type="text"
                        className="relative w-full"
                        onFocus={select}
                        id="username"
                        autoComplete="username"
                        {...register("name", {
                            required: true,
                            pattern: /^[A-Za-z0-9_]+$/,
                            maxLength: { value: 10, message: 'Max. 10 chars.*' },
                            onBlur: blur,
                        })}
                    />

                    {errors.name?.type === 'pattern' && <span className="error-input">Invalid name*</span>}
                    {errors.name?.type === 'required' && <span className="error-input">Name required*</span>}
                    {errors.name?.type === 'maxLength' && <span className="error-input">{errors.name.message}</span>}
                </div>

                <div className="bg-input relative">
                    <label htmlFor="email" className={`email absolute ${activeFields?.['email'] ? 'active' : ''}`}>Email <span>*</span></label>
                    <input
                        type="email"
                        className="relative w-full"
                        onFocus={select}
                        id="email"
                        autoComplete="email"
                        {...register("email", {
                            required: "Email required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email'
                            },
                            onBlur: blur,
                        })}
                    />

                    {errors.email && <span className="error-input">{errors.email.message + '*'}</span>}
                </div>

                <div className="bg-input relative">
                    <label htmlFor="password" className={`password absolute ${activeFields?.['password'] ? 'active' : ''}`}>Password <span>*</span></label>
                    <input
                        type="password"
                        className="relative w-full"
                        onFocus={select}
                        id="password"
                        autoComplete="new-password"
                        {...register('password', {
                            required: 'Password required*',
                            minLength: {
                                value: 6,
                                message: 'Min. 6 chars.*'
                            },
                            onBlur: blur,
                        })}
                    />

                    {errors.password && <span className="error-input">{errors.password.message}</span>}
                </div>

                <div className="bg-input relative">
                    <label htmlFor="password-confirm" className={`password-confirm absolute ${activeFields?.['password-confirm'] ? 'active' : ''}`}>Confirm password <span>*</span></label>
                    <input
                        type="password"
                        className="relative w-full"
                        {...register('confirmPassword', {
                            required: true,
                            onBlur: blur,
                        })}
                        onFocus={select}
                        id="password-confirm"
                        autoComplete="new-password"
                    />

                    {(passwordValue !== undefined && confirmPasswordValue !== undefined) && (confirmPasswordValue !== passwordValue && <span className="error-input">Password does not match*</span>)}
                </div>

                <p>Already a member of myfeed? <button type="button" className="form-switch-btn pointer" onClick={() => setFormRegister(false)}>Sign in</button></p>

                <div className="action-container relative text-center">
                    {errorSubmit !== '' && <span className="error-submit absolute w-full">{errorSubmit}</span>}

                    <button type="submit" className="btn-submit w-full pointer">Register</button>
                </div>
            </form>
        </>
    );
}