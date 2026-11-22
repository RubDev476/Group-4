'use client';

import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form";

import Dropzone from "./Dropzone";
import PostFields from "./PostFields";
import { AvatarImg } from "../ui";

import { PostTypes, UserFormType } from '@/src/types';
import type { PostProps } from "@/src/types/components-props";

import { GlobalContext } from "@/src/app/providers";

export default function EditPostForm({ idPost }: PostProps) {
    const [imgFile, setImgFile] = useState<File | null | string>(null)
    const [loadingPage, setLoadingPage] = useState(true);
    const [errorImg, setErrorImg] = useState<string>('');
    const [currentPost, setCurrentPost] = useState<PostTypes | undefined>(undefined);

    const { register, handleSubmit, formState: { errors } } = useForm<UserFormType>();

    const router = useRouter();

    const { user, allPosts, loadingData } = useContext(GlobalContext);

    useEffect(() => {
        if (!loadingData && loadingPage) {
            const getPost = allPosts.find(data => data.posts.id === idPost);

            if (getPost && user && getPost.posts.idUser === user.uid) {
                setCurrentPost(getPost.posts);
                setImgFile(getPost.posts.imgUrl);
            }

            setLoadingPage(false);
        }

        if (!loadingPage && (!user || !currentPost)) router.push('/');
    }, [loadingPage, loadingData, user, allPosts, idPost, currentPost, router]);

    const onSubmit: SubmitHandler<UserFormType> = () => {
        if (!currentPost) return;

        router.push('/p/' + idPost);
    };

    if (user && currentPost) return (
        <div className="user-form-container">
            <h3>Edit post</h3>

            <div className="user-form">
                <div className="header relative flex align-center justify-start">
                    <AvatarImg
                        size={30}
                        fontSize={20}
                        user={user}
                    />

                    <span>{'@' + user?.displayName} </span>
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
                                getImg={setImgFile}
                                img={imgFile}
                                setErrorImg={setErrorImg}
                                errorImg={errorImg}
                            />

                            {imgFile && <button type="button" className="bg-hover-2 pointer" onClick={() => setImgFile(null)}>Replace / Cancel</button>}
                        </div>

                        <div className="actions-post">
                            <button className="w-full create-btn pointer" type="submit">Update post</button>

                            <button className="w-full cancel-btn bg-hover-2 pointer" onClick={() => router.push('/')} type="button">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
