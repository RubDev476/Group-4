import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
    Comment,
    CommentsContainer,
    Post,
    PostOptions,
    Reply,
} from '@/src/components/posts';
import { POSTS, USERS } from '@/src/fakeData';
import type { AllPostsType } from '@/src/types';
import { mockUser, renderWithContext } from '../../../utils/renderWithContext';
import { mockPush, mockUsePathname } from '../../../setup';

describe('Post and Comment Components', () => {
    const sampleItem = POSTS[0]; // post id '2', author USERS[1] ('cartman'), 1 comment, 1 like (uid '1')
    const postWithReplies = POSTS[2]; // post id '4', comment id '1' with multiple replies

    describe('Post', () => {
        it('renders title, author, cover image, and like/comment counters', () => {
            mockUsePathname.mockReturnValue('/');
            renderWithContext(
                <Post postData={sampleItem.posts} creator={sampleItem.user} />
            );

            expect(screen.getByText(sampleItem.posts.title)).toBeInTheDocument();
            expect(screen.getByText(`@${sampleItem.user.displayName}`)).toBeInTheDocument();
            expect(screen.getByAltText(sampleItem.posts.title)).toHaveAttribute(
                'src',
                sampleItem.posts.imgUrl
            );
            expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(2);
        });

        it('opens the login modal when liking while unauthenticated', async () => {
            const user = userEvent.setup();
            mockUsePathname.mockReturnValue('/');
            const { contextValue, container } = renderWithContext(
                <Post postData={sampleItem.posts} creator={sampleItem.user} />,
                { user: null }
            );

            const likeBtn = container.querySelector('.action-pill.like') as HTMLElement;
            await user.click(likeBtn);

            expect(contextValue.setFormModal).toHaveBeenCalledWith(true);
            expect(contextValue.setAllPosts).not.toHaveBeenCalled();
        });

        it('toggles like in allPosts when authenticated', async () => {
            const user = userEvent.setup();
            mockUsePathname.mockReturnValue('/');
            const { contextValue, container } = renderWithContext(
                <Post postData={sampleItem.posts} creator={sampleItem.user} />,
                { user: mockUser } // uid '1' already liked this post, so clicking removes the like
            );

            const likeBtn = container.querySelector('.action-pill.like') as HTMLElement;
            await user.click(likeBtn);

            expect(contextValue.setAllPosts).toHaveBeenCalledTimes(1);
            const updatedPosts = vi.mocked(contextValue.setAllPosts).mock.calls[0][0] as AllPostsType[];
            const updatedPost = updatedPosts.find((p) => p.posts.id === sampleItem.posts.id);
            expect(updatedPost?.posts.likes).not.toContain(mockUser.uid);
        });

        it('navigates to post detail when clicking the comments button in feed view', async () => {
            const user = userEvent.setup();
            mockUsePathname.mockReturnValue('/');
            const { container } = renderWithContext(
                <Post postData={sampleItem.posts} creator={sampleItem.user} />
            );

            const commentBtn = container.querySelector('.action-pill.comment') as HTMLElement;
            await user.click(commentBtn);

            expect(mockPush).toHaveBeenCalledWith(`/p/${sampleItem.posts.id}`);
        });
    });

    describe('PostOptions', () => {
        it('navigates to edit page and deletes post from global state', async () => {
            const user = userEvent.setup();
            mockUsePathname.mockReturnValue('/p/2');
            const { contextValue } = renderWithContext(<PostOptions idPost="2" />, {
                user: mockUser,
            });

            await user.click(screen.getByRole('button'));
            await user.click(screen.getByText('Edit post'));
            expect(mockPush).toHaveBeenCalledWith('/edit-post/2');

            await user.click(screen.getByRole('button'));
            await user.click(screen.getByText('Delete post'));

            expect(contextValue.setAllPosts).toHaveBeenCalledTimes(1);
            const remaining = vi.mocked(contextValue.setAllPosts).mock.calls[0][0] as AllPostsType[];
            expect(remaining.some((item) => item.posts.id === '2')).toBe(false);
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    describe('Comment', () => {
        const commentDoc = sampleItem.posts.comments[0]; // idUser '1'

        it('renders comment content and prompts login when liking or replying while logged out', async () => {
            const user = userEvent.setup();
            const setCommentId = vi.fn();
            const { contextValue, container } = renderWithContext(
                <Comment
                    commentDoc={commentDoc}
                    currentPost={sampleItem.posts}
                    userPost={USERS[0]}
                    setCommentId={setCommentId}
                />,
                { user: null }
            );

            expect(screen.getByText(commentDoc.comment)).toBeInTheDocument();

            await user.click(container.querySelector('.like') as HTMLElement);
            expect(contextValue.setFormModal).toHaveBeenCalledWith(true);

            await user.click(screen.getByText('Reply'));
            expect(contextValue.setFormModal).toHaveBeenCalledTimes(2);
            expect(setCommentId).not.toHaveBeenCalled();
        });

        it('allows editing and deleting the comment when the authenticated user is the author', async () => {
            const user = userEvent.setup();
            const { contextValue } = renderWithContext(
                <Comment
                    commentDoc={commentDoc}
                    currentPost={sampleItem.posts}
                    userPost={USERS[0]}
                    setCommentId={vi.fn()}
                />,
                { user: mockUser } // uid '1' === commentDoc.idUser
            );

            await user.click(screen.getByRole('button'));
            await user.click(screen.getByText('Edit comment'));

            const textarea = screen.getByDisplayValue(commentDoc.comment);
            await user.clear(textarea);
            await user.type(textarea, 'Edited comment text');
            await user.click(screen.getByRole('button', { name: 'Edit' }));

            expect(contextValue.setAllPosts).toHaveBeenCalledTimes(1);

            await user.click(screen.getByRole('button'));
            await user.click(screen.getByText('Delete comment'));
            expect(contextValue.setAllPosts).toHaveBeenCalledTimes(2);
        });
    });

    describe('Reply and CommentsContainer', () => {
        const parentComment = postWithReplies.posts.comments[0];
        const firstReply = parentComment.replies[0]; // idUser '3'

        it('renders a reply and toggles like when authenticated', async () => {
            const user = userEvent.setup();
            const { contextValue, container } = renderWithContext(
                <Reply
                    reply={firstReply}
                    currentPost={postWithReplies.posts}
                    commentId={parentComment.id}
                />,
                { user: mockUser }
            );

            expect(screen.getByText(firstReply.comment)).toBeInTheDocument();
            await user.click(container.querySelector('.like') as HTMLElement);
            expect(contextValue.setAllPosts).toHaveBeenCalledTimes(1);
        });

        it('CommentsContainer renders the comment, its replies, and the reply form when commentId matches', () => {
            renderWithContext(
                <CommentsContainer
                    commentDoc={parentComment}
                    currentPost={postWithReplies.posts}
                    commentId={parentComment.id}
                    setCommentId={vi.fn()}
                    resetFormComment={vi.fn()}
                />,
                { user: mockUser }
            );

            expect(screen.getByText(parentComment.comment)).toBeInTheDocument();
            expect(screen.getByText(firstReply.comment)).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Write reply')).toBeInTheDocument();
        });
    });
});
