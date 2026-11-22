'use client';

import { ChangeEvent, useContext, useState } from "react";
import Link from "next/link";

import { FavoriteBorder, ChatBubbleOutline, Favorite } from '@mui/icons-material';

import { GlobalContext } from "@/src/app/providers";
import formatDate from "@/src/utilities/formatDate";
import { mutateComment } from "@/src/utilities/postMutations";

import { AvatarImg } from "../ui";
import CommentOptions from "./CommentOptions";

import type { CommentProps } from "@/src/types/components-props";

export default function Comment({ commentDoc, setCommentId, currentPost, userPost }: CommentProps) {
    const [edit, setEdit] = useState(false);
    const [commentEdit, setCommentEdit] = useState<string>(commentDoc.comment);

    const { setFormModal, user, allPosts, setAllPosts } = useContext(GlobalContext);

    const likeToggle = () => {
        if (!user) return setFormModal(true);

        setAllPosts(mutateComment(allPosts, currentPost.id, commentDoc.id, 'like', user.uid));
    };

    const saveEditComment = () => {
        const trimmed = commentEdit.trim();
        if (trimmed === commentDoc.comment) {
            setEdit(false);
            return;
        }
        if (!user || trimmed === '') return;

        setAllPosts(mutateComment(allPosts, currentPost.id, commentDoc.id, 'edit', user.uid, trimmed));
        setEdit(false);
    };

    const cancelEdit = () => {
        setCommentEdit(commentDoc.comment);
        setEdit(false);
    };

    const deleteComm = () => {
        if (!user) return;

        setAllPosts(mutateComment(allPosts, currentPost.id, commentDoc.id, 'delete', user.uid));
    };

    const replyBtn = () => {
        if (!user) return setFormModal(true);

        setCommentId(commentDoc.id);
    };

    const handleStartEdit: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
        setCommentEdit(commentDoc.comment);
        setEdit(value);
    };

    const isLiked = Boolean(user && commentDoc.likes.includes(user.uid));

    return (
        <div className="comment-container relative w-full">
            <div className="header-comment relative flex justify-between">
                <div className='flex info-creator'>
                    <Link href={`/u/${userPost.displayName}`} className="user text-color flex align-center">
                        <AvatarImg
                            size={30}
                            fontSize={16}
                            user={userPost}
                        />

                        <span className='user-name'>{`@${userPost.displayName}`} </span>
                    </Link>

                    <p className='time text-opacity relative'>{formatDate(commentDoc.date)}</p>
                </div>

                {(user && commentDoc.idUser === user.uid) && (
                    <CommentOptions deleteF={deleteComm} setEdit={handleStartEdit} />
                )}
            </div>

            <div className={`comment ${commentDoc.replies.length === 0 ? 'unique' : ''}`}>
                {!edit && <p>{commentDoc.comment}</p>}

                {edit && (
                    <textarea
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCommentEdit(e.target.value)}
                        name='edit-comment'
                        id={`edit-comment-${commentDoc.id}`}
                        className="w-full scroll-bar-style"
                        value={commentEdit}
                    />
                )}

                <div className="actions-container w-full flex align-center justify-start">
                    {!edit && (
                        <>
                            <button
                                type="button"
                                className="comment-action-btn relative like all-center pointer bg-hover"
                                onClick={likeToggle}
                                aria-label={isLiked ? 'Unlike comment' : 'Like comment'}
                                aria-pressed={isLiked}
                            >
                                {isLiked ? (
                                    <Favorite className='icon like-color' />
                                ) : (
                                    <FavoriteBorder className='icon' />
                                )}

                                <span>{commentDoc.likes.length.toString()}</span>
                            </button>

                            <button
                                type="button"
                                className="comment-action-btn relative all-center pointer bg-hover"
                                onClick={replyBtn}
                                aria-label="Reply to comment"
                            >
                                <ChatBubbleOutline className='icon' />

                                <span>Reply</span>
                            </button>
                        </>
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
    );
}
