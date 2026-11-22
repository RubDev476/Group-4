'use client';

import { useContext } from "react";

import { GlobalContext } from "@/src/app/providers";
import { FormComment } from "@/src/components/forms";
import { Reply, Comment } from "@/src/components/posts";

import type { ReplyTypes, UserDbType } from "@/src/types";
import type { CommentsContainerProps } from "@/src/types/components-props";

export default function CommentsContainer({
    commentDoc,
    setCommentId,
    currentPost,
    commentId,
    resetFormComment,
}: CommentsContainerProps) {
    const { allUsers } = useContext(GlobalContext);

    const userPost = allUsers?.find((user: UserDbType) => user.uid === commentDoc.idUser);

    if (!userPost) return null;

    return (
        <div className="comment-main-container w-full">
            <Comment
                userPost={userPost}
                commentDoc={commentDoc}
                setCommentId={setCommentId}
                currentPost={currentPost}
            />

            {commentId === commentDoc.id && (
                <div className={`form-container-2 w-full ${commentDoc.replies.length > 0 ? 'reply-true' : ''}`}>
                    <FormComment
                        post={currentPost}
                        commentId={commentId}
                        isReplyForm={true}
                        resetFormComment={resetFormComment}
                    />
                </div>
            )}

            {commentDoc.replies.map((reply: ReplyTypes) => (
                <Reply
                    key={reply.id}
                    reply={reply}
                    currentPost={currentPost}
                    commentId={commentDoc.id}
                />
            ))}
        </div>
    );
}
