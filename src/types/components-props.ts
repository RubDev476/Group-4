import { Dispatch, SetStateAction } from "react";
import type { CommentTypes, PostTypes, ReplyTypes, UserDbType } from "./index";

//====================== COMPONENTS > forms ==========
export type DZProps = {
    getImg: Dispatch<SetStateAction<File | null | string>>;
    img: File | null | string;
    setErrorImg: Dispatch<SetStateAction<string>>;
    errorImg: string;
};

export type FormCommentProps = {
    post: PostTypes;
    isReplyForm: boolean;
    commentId?: string;
    resetFormComment: () => void;
};

export type FormsSessionProps = {
    select: (e: React.FocusEvent<HTMLInputElement>) => void;
    blur: (e: React.FocusEvent<HTMLInputElement>) => void;
    activeFields?: Record<string, boolean>;
    setFormRegister: Dispatch<SetStateAction<boolean>>;
    setSucces: Dispatch<SetStateAction<boolean>>;
    errorSubmit: string;
    setErrorSubmit: Dispatch<SetStateAction<string>>;
    setFormModal?: Dispatch<SetStateAction<boolean>>;
};

export type TypeOfFormProps = {
    typeForm: 'createPost' | 'editProfile';
};

//================ COMPONENTS > posts =========
export type CommentsContainerProps = Pick<FormCommentProps, 'commentId' | 'resetFormComment'> & {
    commentDoc: CommentTypes;
    setCommentId: Dispatch<SetStateAction<string>>;
    currentPost: PostTypes;
};

export type CommentProps = Pick<CommentsContainerProps, 'commentDoc' | 'setCommentId' | 'currentPost'> & {
    userPost: UserDbType;
};

export type CommentOptionsProps = {
    deleteF: () => void;
    setEdit: Dispatch<SetStateAction<boolean>>;
};

export type PostComponentProps = {
    postData: PostTypes;
    creator: UserDbType;
};

export type ReplyProps = {
    reply: ReplyTypes;
    currentPost: PostTypes;
    commentId: string;
};

//================ COMPONENTS > ui =========
export type AvatarProps = {
    size: number;
    fontSize: number;
    user: UserDbType;
};

export type SkeletonProps = {
    variant: 'circular' | 'rectangular';
    width: number;
    height: number;
};

export type UserOptionsProps = {
    theme: string;
    user: UserDbType;
};

//===================== PAGE, PAGE COMPONENTS PROPS ============
export type Params = {
    params: Promise<{ id: string }>;
};

export type TopicParams = {
    params: Promise<{ slug: string }>;
};

export type DynamicParams = Params & {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

//=============== ID ============
export type PostProps = {
    idPost: string;
};

export type UserProps = {
    userName: string;
};

export type TopicProps = {
    slug: string;
};
