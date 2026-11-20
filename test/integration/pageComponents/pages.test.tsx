import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Main from '@/src/pageComponents/Main';
import PostPage from '@/src/pageComponents/Post';
import UserPage from '@/src/pageComponents/User';
import { POSTS } from '@/src/fakeData';
import {
    mockUser,
    renderWithContext,
    renderWithStatefulContext,
} from '../../utils/renderWithContext';
import { mockUsePathname } from '../../setup';

describe('Page Components Integration', () => {
    describe('Main Feed', () => {
        it('displays the total post count and renders posts from context', () => {
            mockUsePathname.mockReturnValue('/');
            renderWithContext(<Main />);

            expect(screen.getByText('Latest in your feed')).toBeInTheDocument();
            expect(screen.getByText(String(POSTS.length))).toBeInTheDocument();
            expect(screen.getByText(POSTS[0].posts.title)).toBeInTheDocument();
        });

        it('renders empty state when there are no posts', () => {
            renderWithContext(<Main />, { allPosts: [] });

            expect(screen.getByText('Be the first to publish on myfeed...')).toBeInTheDocument();
        });
    });

    describe('Post Detail Flow (PostPage)', () => {
        it('updates likes and adds a new comment in real time', async () => {
            const user = userEvent.setup();
            mockUsePathname.mockReturnValue('/p/1');

            const { container } = renderWithStatefulContext(<PostPage idPost="1" />, {
                user: mockUser,
            });

            // Post '1' starts with 0 comments and 2 likes (uid '1' and '2')
            expect(screen.getByText('Hi Evryoneeee :)')).toBeInTheDocument();
            expect(screen.getByText('Be the first person to comment')).toBeInTheDocument();

            // Unlike as user '1' -> count drops from 2 to 1
            const likePill = container.querySelector('.action-pill.like') as HTMLElement;
            expect(likePill).toHaveTextContent('2');
            await user.click(likePill);
            expect(likePill).toHaveTextContent('1');

            // Open comment form and submit a new comment
            await user.click(screen.getByRole('button', { name: /Add comment/i }));
            await user.type(screen.getByPlaceholderText('Write comment'), 'First test comment');
            await user.click(screen.getByRole('button', { name: 'Comment' }));

            expect(await screen.findByText('First test comment')).toBeInTheDocument();
            expect(screen.queryByText('Be the first person to comment')).not.toBeInTheDocument();
        });

        it('opens login modal when clicking Add comment while unauthenticated', async () => {
            const user = userEvent.setup();
            mockUsePathname.mockReturnValue('/p/1');

            const { setFormModalSpy } = renderWithStatefulContext(<PostPage idPost="1" />, {
                user: null,
            });

            await user.click(screen.getByRole('button', { name: /Add comment/i }));
            expect(setFormModalSpy).toHaveBeenCalledWith(true);
        });

        it('renders NotFound when the post ID does not exist', () => {
            renderWithContext(<PostPage idPost="non-existent-id" />);

            expect(screen.getByText('Post not found or deleted')).toBeInTheDocument();
        });
    });

    describe('User Profile (UserPage)', () => {
        it('renders profile metadata, stats, and published posts', async () => {
            mockUsePathname.mockReturnValue('/u/cartman');
            renderWithContext(<UserPage userName="cartman" />);

            expect(await screen.findByText('Member since 14/06/2026')).toBeInTheDocument();
            expect(screen.getByText('Published by @cartman')).toBeInTheDocument();
            expect(screen.getByText('i like this')).toBeInTheDocument();
            expect(screen.getByText('Hellooooo')).toBeInTheDocument();
        });

        it('renders NotFound when the username does not exist', async () => {
            renderWithContext(<UserPage userName="unknown_user" />);

            expect(await screen.findByText('User not found')).toBeInTheDocument();
        });

        it('renders empty state when the user has not published any posts', async () => {
            renderWithContext(<UserPage userName="cyncyncynUwu" />);

            expect(
                await screen.findByText("@cyncyncynUwu hasn't published anything yet")
            ).toBeInTheDocument();
        });
    });
});
