'use client';

import { useContext, useEffect, useState } from "react";

import { GlobalContext } from "@/src/app/providers";
import { FormLogin, FormRegister } from '@/src/components/forms';

import { Close } from "@mui/icons-material";

export default function FormSession() {
    const [formRegister, setFormRegister] = useState(false);
    const { setFormModal, user, setRefresh, formModal } = useContext(GlobalContext);

    const [success, setSuccess] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState<string>('');
    const [activeFields, setActiveFields] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (success && user) {
            setSuccess(false);

            setRefresh({ refresh: true, redirectTo: `/u/${user.displayName}` });

            setFormModal(false);
        }
    }, [success, setFormModal, setRefresh, user]);

    const closeLoginModal = (e: React.MouseEvent<HTMLElement>): void => {
        const target = e.target as HTMLElement;

        if (!target.dataset.set) return;

        setFormModal(false);
    };

    const select = (e: React.FocusEvent<HTMLInputElement>): void => {
        const id = e.target.id;
        if (!id) return;
        setActiveFields((prev) => ({ ...prev, [id]: true }));
    };

    const blur = (e: React.FocusEvent<HTMLInputElement>): void => {
        const id = e.target.id;
        if (!id || e.target.value !== '') return;

        setActiveFields((prev) => ({ ...prev, [id]: false }));
    };

    return (
        <div className={`bg-modal login-modal ${formModal ? 'active' : ''} w-full none`} onClick={closeLoginModal} data-set='modal'>
            <div className="form-container bg-color relative w-full">
                <button
                    type="button"
                    aria-label="Close modal"
                    className="all-center pointer bg-hover absolute btn-close"
                    onClick={() => setFormModal(false)}
                >
                    <Close className="icon" />
                </button>

                {!formRegister ? (
                    <FormLogin
                        key="login"
                        select={select}
                        setFormRegister={setFormRegister}
                        blur={blur}
                        activeFields={activeFields}
                        setSuccess={setSuccess}
                        errorSubmit={errorSubmit}
                        setErrorSubmit={setErrorSubmit}
                        setFormModal={setFormModal}
                    />
                ) : (
                    <FormRegister
                        key="register"
                        select={select}
                        setFormRegister={setFormRegister}
                        blur={blur}
                        activeFields={activeFields}
                        setSuccess={setSuccess}
                        errorSubmit={errorSubmit}
                        setErrorSubmit={setErrorSubmit}
                    />
                )}
            </div>
        </div>
    );
}
