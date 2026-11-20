import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useContext } from 'react';

import { GlobalContext, Providers } from '@/src/app/providers';
import { POSTS, USERS } from '@/src/fakeData';

describe('Providers (GlobalContext) Integration', () => {
    function ContextInspector() {
        const { allPosts, allUsers, popularUsers, loadingData, loadingPopular } =
            useContext(GlobalContext);

        return (
            <div>
                <span data-testid="posts-count">{allPosts.length}</span>
                <span data-testid="users-count">{allUsers?.length ?? 0}</span>
                <span data-testid="popular-count">{popularUsers.length}</span>
                <span data-testid="loading-data">{String(loadingData)}</span>
                <span data-testid="loading-popular">{String(loadingPopular)}</span>
            </div>
        );
    }

    it('loads POSTS and USERS from fakeData on mount and clears loading flags', async () => {
        render(
            <Providers>
                <ContextInspector />
            </Providers>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading-data')).toHaveTextContent('false');
            expect(screen.getByTestId('loading-popular')).toHaveTextContent('false');
        });

        expect(screen.getByTestId('posts-count')).toHaveTextContent(String(POSTS.length));
        expect(screen.getByTestId('users-count')).toHaveTextContent(String(USERS.length));
        expect(screen.getByTestId('popular-count')).toHaveTextContent(String(USERS.length));
    });
});
