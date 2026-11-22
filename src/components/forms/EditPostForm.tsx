'use client';

import { useEffect, useMemo, useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form";

import Dropzone from "./Dropzone";
import PostFields from "./PostFields";
import { AvatarImg } from "../ui";

import type { UserFormType } from '@/src/types';
import type { PostProps } from "@/src/types/components-props";

import { GlobalContext } from "@/src/app/providers";

export default function EditPostForm({ idPost }: PostProps) {
    const [imgFileOverride, setImgFileOverride] = useState<File | null | string | undefined>(undefined);
    const [errorImg, setErrorImg] = useState<string>('');

    const { register, handleSubmit, formState: { errors } } = useForm<UserFormType>();

    const router = useRouter();
    const { user, allPosts, loadingData } = useContext(GlobalContext);

    const currentPost = useMemo(() => {
        if (!user) return undefined;
        const found = allPosts.find((data) => data.posts.id === idPost);
        return found && found.posts.idUser === user.uid ? found.posts : undefined;
    }, [allPosts, idPost, user]);

    const imgFile: File | null | string =
        imgFileOverride === undefined ? (currentPost?.imgUrl ?? null) : imgFileOverride;

    const handleImgChange: React.Dispatch<React.SetStateAction<File | null | string>> = (value) => {
        setImgFileOverride((prev) => {
            const current = prev === undefined ? (currentPost?.imgUrl ?? null) : prev;
            return typeof value === 'function' ? value(current) : value;
        });
    };

    useEffect(() => {
        if (!loadingData && (!user || !currentPost)) {
            router.push('/');
        }
    }, [loadingData, user, currentPost, router]);

    const onSubmit: SubmitHandler<UserFormType> = () => {
        if (!currentPost) return;

        router.push('/p/' + idPost);
    };

    if (!user || !currentPost) return null;

    return (
        <div className="user-form-container">
            <h3>Edit post</h3>

            <div className="user-form">
                <div className="header relative flex align-center justify-start">
                    <AvatarImg
                        size={30}
                        fontSize={20}
                        user={user}
                    />

                    <span>{'@' + user.displayName} </span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="inputs-container w-full relative">
                        <PostFields
                            register={register}
                            errors={errors}
                            defaultTitle={currentPost.title}
                            defaultDescription={currentPost.description}
                            requiredTitleMessage="required*"
                            requiredDescriptionMessage="required*"
                        />

                        <div className="dropzone-main-container relative">
                            <p className={`${errorImg !== '' ? 'error' : ''}`}>{'Choose/change your photo:'}</p>

                            <Dropzone
                                getImg={handleImgChange}
                                img={imgFile}
                                setErrorImg={setErrorImg}
                                errorImg={errorImg}
                            />

                            {imgFile && (
                                <button
                                    type="button"
                                    className="bg-hover-2 pointer"
                                    onClick={() => setImgFileOverride(null)}
                                >
                                    Replace / Cancel
                                </button>
                            )}
                        </div>

                        <div className="actions-post">
                            <button className="w-full create-btn pointer" type="submit">Update post</button>

                            <button
                                className="w-full cancel-btn bg-hover-2 pointer"
                                onClick={() => router.push('/')}
                                type="button"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
