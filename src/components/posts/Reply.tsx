'use client';

import { ChangeEvent, useContext, useEffect, useState } from "react";
import Link from "next/link";

import { Favorite, FavoriteBorder } from '@mui/icons-material';

import { GlobalContext } from "@/src/app/providers";

import { AvatarImg } from "../ui";

import formatDate from "@/src/utilities/formatDate";
import { handleLikes } from "@/src/utilities/handleLikes";
import CommentOptions from "./CommentOptions";

import type { CommentTypes, PostTypes, ReplyTypes, UserDbType } from "@/src/types";
import type { ReplyProps } from "@/src/types/components-props";
import type { CommentActions } from "@/src/types/components-functions";

export default function Reply({ reply, currentPost, commentId }: ReplyProps) {
    const [edit, setEdit] = useState(false);
    const [commentEdit, setCommentEdit] = useState<string>(reply.comment);
    const [userReply, setUserReply] = useState<UserDbType | undefined>(undefined);

    const { allUsers, setFormModal, user, allPosts, setAllPosts } = useContext(GlobalContext);

    useEffect(() => {
        if (allUsers) {
            const getUser = allUsers.find((u: UserDbType) => u.uid === reply.idUser);

            setUserReply(getUser);
        }
    }, [allUsers, reply])

    const likeToggle = async () => {
        if (!user) return setFormModal(true);

        const { updatePosts } = update_state('like', user.uid);
        setAllPosts(updatePosts);
    }

    const saveEditComment = () => {
        const trimmed = commentEdit.trim();
        if (trimmed === reply.comment) {
            setEdit(false);
            return;
        }

        if (!user || trimmed === '') return;

        const { updatePosts } = update_state('edit', user.uid, trimmed);
        setAllPosts(updatePosts);
        setEdit(false);
    };

    const cancelEdit = () => {
        setCommentEdit(reply.comment);
        setEdit(false);
    };

    const deleteComm = () => {
        if (!user) return;

        const { updatePosts } = update_state('delete', user.uid);
        setAllPosts(updatePosts);
        setEdit(false);
    };

    const update_state = (type: CommentActions, uid: string, editedText?: string) => {
        const currentPost_state: PostTypes = JSON.parse(JSON.stringify(currentPost));

        update_post(type, uid, currentPost_state, editedText);

        const updatePosts = allPosts.map(data => data.posts.id === currentPost.id ? { ...data, posts: currentPost_state } : data);

        return {
            updatePosts,
        };
    };

    const update_post = (type: CommentActions, uid: string, post: PostTypes, editedText?: string) => {
        const commentIndex = post.comments.findIndex((currentComment: CommentTypes) => currentComment.id === commentId);

        if (commentIndex === -1) throw new Error('this comment does not exist...');

        const replyIndex = post.comments[commentIndex].replies.findIndex((currentReply: ReplyTypes) => currentReply.id === reply.id);

        if (replyIndex === -1) throw new Error('this reply does not exist...');

        switch (type) {
            case 'like': {
                const currentLikes = post.comments[commentIndex].replies[replyIndex].likes;

                post.comments[commentIndex].replies[replyIndex].likes = handleLikes(currentLikes, uid);

                break;
            }
            case 'edit': {
                post.comments[commentIndex].replies[replyIndex].comment = editedText ?? commentEdit;

                break;
            }
            case 'delete': {
                post.comments[commentIndex].replies = post.comments[commentIndex].replies.filter((com: ReplyTypes) => com.id !== reply.id);

                break;
            }

            default: break;
        }
    };

    const handleStartEdit: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
        setCommentEdit(reply.comment);
        setEdit(value);
    };

    if (userReply) return (
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
                            <div className="relative like all-center pointer bg-hover" onClick={likeToggle}>
                                {(user && reply.likes.includes(user.uid)) ? (
                                    <Favorite className='icon like-color' />
                                ) : (
                                    <FavoriteBorder className='icon' />
                                )}

                                <span>{reply.likes.length.toString()}</span>
                            </div>
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
    )
}
