'use client';

import { useState, useContext, useCallback, useMemo } from "react";
import Link from "next/link";
import { ArrowBackRounded } from "@mui/icons-material";

import { NotFound } from "@/src/components/ui";
import { Post as PostComponent, CommentsContainer } from "@/src/components/posts";
import { FormComment } from "@/src/components/forms";

import { GlobalContext } from "@/src/app/providers";

import type { AllPostsType, CommentTypes } from "@/src/types";
import type { PostProps } from "../types/components-props";

export default function Post({ idPost }: PostProps) {
    const [commentFormForPost, setCommentFormForPost] = useState<AllPostsType | null>(null);
    const [replyState, setReplyState] = useState<{ post: AllPostsType | null; commentId: string }>({
        post: null,
        commentId: '',
    });

    const { allPosts, loadingData, setFormModal, user } = useContext(GlobalContext);

    const currentPost = useMemo(
        () => allPosts.find((post) => post.posts.id === idPost) ?? null,
        [allPosts, idPost]
    );

    const formComment = currentPost !== null && commentFormForPost === currentPost;
    const commentId = currentPost !== null && replyState.post === currentPost ? replyState.commentId : '';

    const setCommentId = useCallback<React.Dispatch<React.SetStateAction<string>>>(
        (value) => {
            setReplyState((prev) => {
                const prevId = prev.post === currentPost ? prev.commentId : '';
                const nextId = typeof value === 'function' ? value(prevId) : value;
                return { post: currentPost, commentId: nextId };
            });
        },
        [currentPost]
    );

    const resetFormComment = useCallback(() => {
        setCommentFormForPost(null);
        setReplyState({ post: null, commentId: '' });
    }, []);

    const addCommentBtn = useCallback(() => {
        if (!user) {
            setFormModal(true);
            return;
        }
        setCommentFormForPost(currentPost);
    }, [user, setFormModal, currentPost]);

    if (loadingData) return null;

    if (!currentPost) return <NotFound message="Post not found or deleted" />;

    return (
        <div className="post-detail-shell w-full">
            <Link href="/" className="back-feed-link">
                <ArrowBackRounded />
                <span>Back to feed</span>
            </Link>

            <div className="post-detail-grid">
                <div className="post-detail-main">
                    <PostComponent postData={currentPost.posts} creator={currentPost.user} />
                </div>

                <section className="comments-section w-full">
                    <div className="comments-header flex align-center justify-between">
                        <h4 className="logo-font">Discussion</h4>
                        {!formComment && (
                            <button
                                type="button"
                                onClick={addCommentBtn}
                                className="btn-add-comment all-center pointer border-color"
                            >
                                <span className="all-center">+</span> Add comment
                            </button>
                        )}
                    </div>

                    {formComment && (
                        <FormComment
                            post={currentPost.posts}
                            isReplyForm={false}
                            resetFormComment={resetFormComment}
                        />
                    )}

                    <div className="comments">
                        {currentPost.posts.comments.map((commentPost: CommentTypes) => (
                            <CommentsContainer
                                key={commentPost.id}
                                commentDoc={commentPost}
                                setCommentId={setCommentId}
                                currentPost={currentPost.posts}
                                commentId={commentId}
                                resetFormComment={resetFormComment}
                            />
                        ))}

                        {currentPost.posts.comments.length === 0 && (
                            <div className="no-comments">
                                <h4>Be the first person to comment</h4>
                                <p>Say what you think and start this conversation.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
