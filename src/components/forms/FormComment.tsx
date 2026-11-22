'use client';

import { ChangeEvent, useContext, useState } from "react";

import { v4 as generateId } from 'uuid';

import type { CommentTypes, ReplyTypes } from "@/src/types";
import type { FormCommentProps } from "@/src/types/components-props";

import { GlobalContext } from "@/src/app/providers";

export default function FormComment({ post, isReplyForm, resetFormComment, commentId }: FormCommentProps) {
    const [comment, setComment] = useState<string>('');

    const {user, setAllPosts, allPosts} = useContext(GlobalContext);

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedComment = comment.trim();
        if (trimmedComment === '' || !user) return;

        try {
            const baseReply: ReplyTypes = {
                id: generateId(),
                idUser: user.uid,
                date: Date.now(),
                likes: [],
                comment: trimmedComment,
            };

            const { updatePosts } = update_state(baseReply);

            setAllPosts(updatePosts);
            setComment('');
        } catch {
            // Ignore when target comment no longer exists
        }
    };

    const update_post = (newEntry: ReplyTypes, currentComments: CommentTypes[]) => {
        if (!isReplyForm) {
            const newComment: CommentTypes = { ...newEntry, replies: [] };
            return [newComment, ...currentComments];
        }

        if (!commentId) return currentComments;

        const currentIndexComment = currentComments.findIndex(item => item.id === commentId);

        if (currentIndexComment !== -1) {
            currentComments[currentIndexComment].replies = [newEntry, ...currentComments[currentIndexComment].replies];
        } else {
            throw new Error('no comment...');
        }

        return currentComments;
    };

    const update_state = (newEntry: ReplyTypes) => {
        const currentComments_state: CommentTypes[] = JSON.parse(JSON.stringify(post.comments));

        const newComments = update_post(newEntry, currentComments_state);

        const updatePosts = allPosts.map(data => data.posts.id === post.id ? { ...data, posts: { ...data.posts, comments: newComments } } : data);

        return {
            updatePosts
        };
    };

    const cancel = () => {
        resetFormComment();
        setComment('');
    };

    return (
        <form
            onSubmit={submitComment}
            className={`${isReplyForm ? 'relative' : 'w-full'} bg-input`}
        >
            <textarea
                value={comment}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                name={`${isReplyForm ? 'form-replies' : 'form-comments'}`}
                id={`${isReplyForm ? 'form-replies' : 'form-comments'}`}
                className="w-full scroll-bar-style"
                placeholder={`Write ${isReplyForm ? 'reply' : 'comment'}`}
            />

            <div className="actions-form-container w-full flex align-center">
                <button className="cancel-btn pointer bg-hover-2" type="button" onClick={cancel}>Cancel</button>

                <button className="comment-btn pointer" type="submit">{`${isReplyForm ? 'Reply' : 'Comment'}`}</button>
            </div>
        </form>
    )
}