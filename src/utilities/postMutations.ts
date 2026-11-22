import { handleLikes } from '@/src/utilities/handleLikes';
import type { AllPostsType, CommentTypes, PostTypes, ReplyTypes } from '@/src/types';
import type { CommentActions } from '@/src/types/components-functions';

function mapPostById(
    allPosts: AllPostsType[],
    postId: string,
    updater: (post: PostTypes) => PostTypes
): AllPostsType[] {
    return allPosts.map((item) =>
        item.posts.id === postId ? { ...item, posts: updater(item.posts) } : item
    );
}

export function togglePostLike(
    allPosts: AllPostsType[],
    postId: string,
    uid: string
): AllPostsType[] {
    return mapPostById(allPosts, postId, (post) => ({
        ...post,
        likes: handleLikes(post.likes, uid),
    }));
}

export function addCommentOrReply(
    allPosts: AllPostsType[],
    postId: string,
    entry: ReplyTypes,
    commentId?: string
): AllPostsType[] {
    return mapPostById(allPosts, postId, (post) => {
        if (!commentId) {
            const newComment: CommentTypes = { ...entry, replies: [] };
            return { ...post, comments: [newComment, ...post.comments] };
        }

        const hasTarget = post.comments.some((comment) => comment.id === commentId);
        if (!hasTarget) return post;

        return {
            ...post,
            comments: post.comments.map((comment) =>
                comment.id === commentId
                    ? { ...comment, replies: [entry, ...comment.replies] }
                    : comment
            ),
        };
    });
}

export function mutateComment(
    allPosts: AllPostsType[],
    postId: string,
    commentId: string,
    action: CommentActions,
    uid: string,
    editedText?: string
): AllPostsType[] {
    return mapPostById(allPosts, postId, (post) => {
        if (action === 'delete') {
            return {
                ...post,
                comments: post.comments.filter((comment) => comment.id !== commentId),
            };
        }

        return {
            ...post,
            comments: post.comments.map((comment) => {
                if (comment.id !== commentId) return comment;

                if (action === 'like') {
                    return { ...comment, likes: handleLikes(comment.likes, uid) };
                }

                if (action === 'edit' && editedText !== undefined) {
                    return { ...comment, comment: editedText };
                }

                return comment;
            }),
        };
    });
}

export function mutateReply(
    allPosts: AllPostsType[],
    postId: string,
    commentId: string,
    replyId: string,
    action: CommentActions,
    uid: string,
    editedText?: string
): AllPostsType[] {
    return mapPostById(allPosts, postId, (post) => ({
        ...post,
        comments: post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;

            if (action === 'delete') {
                return {
                    ...comment,
                    replies: comment.replies.filter((reply) => reply.id !== replyId),
                };
            }

            return {
                ...comment,
                replies: comment.replies.map((reply) => {
                    if (reply.id !== replyId) return reply;

                    if (action === 'like') {
                        return { ...reply, likes: handleLikes(reply.likes, uid) };
                    }

                    if (action === 'edit' && editedText !== undefined) {
                        return { ...reply, comment: editedText };
                    }

                    return reply;
                }),
            };
        }),
    }));
}
