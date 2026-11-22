import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
    AvatarImg,
    NotFound,
    Skeleton,
    SkeletonUser,
    Spinner,
    UserOptions,
} from '@/src/components/ui';
import { mockImageUser, mockUser } from '../../../utils/renderWithContext';
import { mockPush } from '../../../setup';

describe('UI Components', () => {
    describe('AvatarImg', () => {
        it('renders the uppercase initial when photoURL is a hex color', () => {
            render(<AvatarImg size={32} fontSize={16} user={mockUser} />);

            expect(screen.getByText('S')).toBeInTheDocument();
        });

        it('renders an image when photoURL is a path or URL', () => {
            render(<AvatarImg size={32} fontSize={16} user={mockImageUser} />);

            const img = screen.getByAltText(`${mockImageUser.displayName} avatar`) as HTMLImageElement;
            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute('src', mockImageUser.photoURL);
        });
    });

    describe('NotFound', () => {
        it('renders the 404 heading and provided message', () => {
            render(<NotFound message="Post not found or deleted" />);

            expect(screen.getByText('Post not found or deleted')).toBeInTheDocument();
            expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('404');
        });
    });

    describe('Skeleton, SkeletonUser, and Spinner', () => {
        it('renders circular and rectangular Skeleton variants', () => {
            const { container } = render(
                <>
                    <Skeleton variant="circular" width={34} height={34} />
                    <Skeleton variant="rectangular" width={86} height={34} />
                </>
            );

            expect(container.querySelectorAll('.MuiSkeleton-root')).toHaveLength(2);
        });

        it('renders SkeletonUser without errors', () => {
            const { container } = render(<SkeletonUser />);
            expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThanOrEqual(2);
        });

        it('renders Spinner without errors', () => {
            const { container } = render(<Spinner />);
            expect(container.querySelector('.loader')).toBeInTheDocument();
        });
    });

    describe('UserOptions', () => {
        it('opens the user menu and navigates to profile, create post, and edit profile', async () => {
            const user = userEvent.setup();
            render(<UserOptions theme="dark" user={mockUser} />);

            const triggerBtn = screen.getByRole('button');
            await user.click(triggerBtn);

            expect(screen.getByText(`@${mockUser.displayName}`)).toBeInTheDocument();
            expect(screen.getByText('Create post')).toBeInTheDocument();
            expect(screen.getByText('Edit profile')).toBeInTheDocument();
            expect(screen.getByText('Log out')).toBeInTheDocument();

            await user.click(screen.getByText(`@${mockUser.displayName}`));
            expect(mockPush).toHaveBeenCalledWith(`/u/${mockUser.displayName}`);

            await user.click(triggerBtn);
            await user.click(screen.getByText('Create post'));
            expect(mockPush).toHaveBeenCalledWith('/create');

            await user.click(triggerBtn);
            await user.click(screen.getByText('Edit profile'));
            expect(mockPush).toHaveBeenCalledWith('/edit-profile');
        });
    });
});
