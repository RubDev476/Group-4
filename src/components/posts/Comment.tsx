'use client';

import { ChangeEvent, useContext, useState } from "react";
import Link from "next/link";

import { FavoriteBorder, ChatBubbleOutline, Favorite } from '@mui/icons-material';

import { GlobalContext } from "@/src/app/providers";

import formatDate from "@/src/utilities/formatDate";
import { handleLikes } from "@/src/utilities/handleLikes";

import { AvatarImg } from "../ui";
import CommentOptions from "./CommentOptions";

import type { CommentTypes, PostTypes } from "@/src/types";
import type { CommentProps } from "@/src/types/components-props";
import { CommentActions } from "@/src/types/components-functions";

export default function Comment({commentDoc, setCommentId, currentPost, userPost}: CommentProps) {
    const [edit, setEdit] = useState(false);
    const [commentEdit, setCommentEdit] = useState<string>(commentDoc.comment);

    const { setFormModal, user, allPosts, setAllPosts } = useContext(GlobalContext);

    const likeToggle = async () => {
        if (!user) return setFormModal(true);

        const { updatePosts } = update_state('like', user.uid);
        setAllPosts(updatePosts);
    }

    const saveEditComment = () => {
        const trimmed = commentEdit.trim();
        if (trimmed === commentDoc.comment) {
            setEdit(false);
            return;
        }
        if (!user || trimmed === '') return;

        const { updatePosts } = update_state('edit', user.uid, trimmed);
        setAllPosts(updatePosts);
        setEdit(false);
    };

    const cancelEdit = () => {
        setCommentEdit(commentDoc.comment);
        setEdit(false);
    };

    const deleteComm = () => {
        if (!user) return;

        const { updatePosts } = update_state('delete', user.uid);
        setAllPosts(updatePosts);
    };

    const update_post = (type: CommentActions, post: PostTypes, uid: string, editedText?: string) => {
        const currentIndexComment = post.comments.findIndex((currentComment: CommentTypes) => currentComment.id === commentDoc.id);

        if (currentIndexComment === -1) throw new Error('this comment does not exist...');

        switch (type) {
            case 'like': {
                const currentLikes: string[] = post.comments[currentIndexComment].likes;

                post.comments[currentIndexComment].likes = handleLikes(currentLikes, uid);
                
                break;
            }
            case 'edit': {
                post.comments[currentIndexComment].comment = editedText ?? commentEdit;

                break;
            }
            case 'delete': {
                post.comments = post.comments.filter((currentComment: CommentTypes) => currentComment.id !== commentDoc.id);  

                break;
            }

            default: break;
        }
    };

    const update_state = (type: CommentActions, uid: string, editedText?: string) => {
        const newPost: PostTypes = JSON.parse(JSON.stringify(currentPost));

        update_post(type, newPost, uid, editedText);

        const updatePosts = allPosts.map(data => data.posts.id === currentPost.id ? { ...data, posts: newPost } : data);

        return {
            updatePosts
        };
    };

    const replyBtn = () => {
        if (!user) return setFormModal(true);

        setCommentId(commentDoc.id);
    };

    const handleStartEdit: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
        setCommentEdit(commentDoc.comment);
        setEdit(value);
    };

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
                            <div className="relative like all-center pointer bg-hover" onClick={likeToggle}>
                                {(user && commentDoc.likes.includes(user.uid)) ? (
                                    <Favorite className='icon like-color' />
                                ) : (
                                    <FavoriteBorder className='icon' />
                                )}

                                <span>{commentDoc.likes.length.toString()}</span>
                            </div>

                            <div className="relative all-center pointer bg-hover" onClick={replyBtn}>
                                <ChatBubbleOutline className='icon' />

                                <span>Reply</span>
                            </div>
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
    )
}