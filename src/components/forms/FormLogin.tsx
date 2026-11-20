'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { LoginType } from "@/src/types";
import type { FormsSessionProps } from "@/src/types/components-props";

export default function FormLogin({ select, setFormRegister, blur, setErrorSubmit, errorSubmit, setFormModal }: FormsSessionProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginType>();

    const onSubmit: SubmitHandler<LoginType> = async () => {
        if (setFormModal) setFormModal(false);
    }

    return ( 
        <>
            <div className="modal-brand logo-font">
                <span>my<span className="logo-accent">feed</span></span>
            </div>
            <h3 className="logo-font">Welcome back</h3>
            <p className="modal-subtitle">Sign in to continue to your feed.</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/*This tag helps me correct the error when changing forms, where the input values ​​were mixed, that's why the other registration form does not have this 'fieldset' tag...*/}
                <fieldset>
                    <div className="bg-input relative">
                        <label htmlFor="email-s" className="email-s absolute">Email <span>*</span></label>
                        <input 
                            type="email" 
                            className="relative w-full"
                            {...register("email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                            })} 
                            onBlur={blur}
                            onSelect={select} 
                            id="email-s"
                            autoComplete="off" 
                        />

                        {errors.email && <span className="error-input">Email required*</span>}
                    </div>

                    <div className="bg-input relative">
                        <label htmlFor="password-s" className="password-s absolute">Password <span>*</span></label>
                        <input 
                            type="password" 
                            className="relative w-full"
                            {...register('password', {
                                required: true
                            })} 
                            onBlur={blur}
                            onSelect={select} 
                            id="password-s"
                            autoComplete="off"  
                        />

                        {errors.password && <span className="error-input">Password required*</span>}
                    </div>
                </fieldset>

                <p>First time on myfeed? <span className="pointer" onClick={() => setFormRegister(true)}>Create an account</span></p>

                <div className="action-container relative text-center">
                    {errorSubmit !== '' && <span className="error-submit absolute w-full">{errorSubmit}</span>}

                    <button type="submit" className="btn-submit w-full">Sign in</button>
                </div>
            </form>
        </>
    )
}
