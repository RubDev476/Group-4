'use client';

import { ChangeEvent, useContext, useState } from "react";
import Link from "next/link";

import { Favorite, FavoriteBorder } from '@mui/icons-material';

import { GlobalContext } from "@/src/app/providers";
import formatDate from "@/src/utilities/formatDate";
import { mutateReply } from "@/src/utilities/postMutations";

import { AvatarImg } from "../ui";
import CommentOptions from "./CommentOptions";

import type { UserDbType } from "@/src/types";
import type { ReplyProps } from "@/src/types/components-props";

export default function Reply({ reply, currentPost, commentId }: ReplyProps) {
    const [edit, setEdit] = useState(false);
    const [commentEdit, setCommentEdit] = useState<string>(reply.comment);

    const { allUsers, setFormModal, user, allPosts, setAllPosts } = useContext(GlobalContext);

    const userReply = allUsers?.find((u: UserDbType) => u.uid === reply.idUser);

    if (!userReply) return null;

    const likeToggle = () => {
        if (!user) return setFormModal(true);

        setAllPosts(mutateReply(allPosts, currentPost.id, commentId, reply.id, 'like', user.uid));
    };

    const saveEditComment = () => {
        const trimmed = commentEdit.trim();
        if (trimmed === reply.comment) {
            setEdit(false);
            return;
        }
        if (!user || trimmed === '') return;

        setAllPosts(mutateReply(allPosts, currentPost.id, commentId, reply.id, 'edit', user.uid, trimmed));
        setEdit(false);
    };

    const cancelEdit = () => {
        setCommentEdit(reply.comment);
        setEdit(false);
    };

    const deleteComm = () => {
        if (!user) return;

        setAllPosts(mutateReply(allPosts, currentPost.id, commentId, reply.id, 'delete', user.uid));
        setEdit(false);
    };

    const handleStartEdit: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
        setCommentEdit(reply.comment);
        setEdit(value);
    };

    const isLiked = Boolean(user && reply.likes.includes(user.uid));

    return (
        <div className="reply-main-container relative flex">
            <div className="line"></div>

            <div className="reply-container w-full">
                <div className="header-comment relative flex justify-between w-full">
                    <div className='flex info-creator'>
                        <Link href={`/u/${userReply.displayName}`} className="user text-color flex align-center">
                            <AvatarImg
                                size={30}
                                fontSize={16}
                                user={userReply}
                            />

                            <span className='user-name'>{`@${userReply.displayName}`} </span>
                        </Link>

                        <p className='time text-opacity relative'>{formatDate(reply.date)}</p>
                    </div>

                    {(user && user.uid === reply.idUser) && (
                        <CommentOptions deleteF={deleteComm} setEdit={handleStartEdit} />
                    )}
                </div>

                <div className="reply">
                    {!edit && <p>{reply.comment}</p>}

                    {edit && (
                        <textarea
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCommentEdit(e.target.value)}
                            name='edit-reply'
                            id={`edit-reply-${reply.id}`}
                            className="w-full scroll-bar-style"
                            value={commentEdit}
                        />
                    )}

                    <div className="actions-container w-full flex align-center justify-start">
                        {!edit && (
                            <button
                                type="button"
                                className="comment-action-btn relative like all-center pointer bg-hover"
                                onClick={likeToggle}
                                aria-label={isLiked ? 'Unlike reply' : 'Like reply'}
                                aria-pressed={isLiked}
                            >
                                {isLiked ? (
                                    <Favorite className='icon like-color' />
                                ) : (
                                    <FavoriteBorder className='icon' />
                                )}

                                <span>{reply.likes.length.toString()}</span>
                            </button>
                        )}

                        {edit && (
                            <>
                                <button type="button" className="cancel-btn pointer bg-hover-2" onClick={cancelEdit}>Cancel</button>

                                <button type="button" className="comment-btn pointer" onClick={saveEditComment}>Edit</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
