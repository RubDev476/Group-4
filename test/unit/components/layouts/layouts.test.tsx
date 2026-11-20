import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
    AccordionPopulars,
    AsideLeft,
    AsideRight,
    GridLayout,
    Header,
    ImgHero,
    TopicBar,
} from '@/src/components/layouts';
import { topicIcons } from '@/src/utilities/asideLeftItems';
import { mockUser, renderWithContext } from '../../../utils/renderWithContext';
import { mockPush, mockSetTheme, mockUsePathname } from '../../../setup';

describe('Layout Components', () => {
    describe('Header', () => {
        it('renders navigation, search input, and Sign in button when unauthenticated, opening drawer and login modal', async () => {
            const user = userEvent.setup();
            const { contextValue } = renderWithContext(<Header />);

            expect(
                screen.getByPlaceholderText('Search stories, topics, or @creators...')
            ).toBeInTheDocument();
            expect(screen.getByRole('link', { name: 'Explore' })).toHaveAttribute('href', '/');

            await user.click(screen.getByRole('button', { name: 'Topics' }));
            expect(contextValue.setNavModal).toHaveBeenCalledWith(true);

            await user.click(screen.getByRole('button', { name: 'Sign in' }));
            expect(contextValue.setFormModal).toHaveBeenCalledWith(true);
        });

        it('renders "New post" link and hides "Sign in" when authenticated', () => {
            renderWithContext(<Header />, { user: mockUser });

            expect(screen.queryByRole('button', { name: 'Sign in' })).not.toBeInTheDocument();
            expect(screen.getByRole('link', { name: /New post/i })).toHaveAttribute('href', '/create');
        });

        it('toggles theme when clicking the dark/light mode button', async () => {
            const user = userEvent.setup();
            renderWithContext(<Header />);

            const themeBtn = screen.getByTitle('Switch to light mode');
            await user.click(themeBtn);
            expect(mockSetTheme).toHaveBeenCalledWith('light');
        });
    });

    describe('TopicBar', () => {
        it('renders "All Feed", topic pills, and "All topics" button that opens the drawer', async () => {
            const user = userEvent.setup();
            const { contextValue } = renderWithContext(<TopicBar />);

            expect(screen.getByRole('link', { name: 'All Feed' })).toHaveAttribute('href', '/');
            expect(screen.getByRole('link', { name: topicIcons[0].title })).toBeInTheDocument();

            await user.click(screen.getByRole('button', { name: 'All topics' }));
            expect(contextValue.setNavModal).toHaveBeenCalledWith(true);
        });
    });

    describe('ImgHero', () => {
        it('opens login modal on "Start a post" when logged out and opens drawer on "Explore topics"', async () => {
            const user = userEvent.setup();
            const { contextValue } = renderWithContext(<ImgHero />);

            expect(
                screen.getByText('Share freely across the topics you actually care about.')
            ).toBeInTheDocument();
            expect(screen.getByText('28 Topics')).toBeInTheDocument();

            await user.click(screen.getByRole('button', { name: /Start a post/i }));
            expect(contextValue.setFormModal).toHaveBeenCalledWith(true);

            await user.click(screen.getByRole('button', { name: /Explore topics/i }));
            expect(contextValue.setNavModal).toHaveBeenCalledWith(true);
        });

        it('navigates to /create when logged in and switches between Popular and Recent creator tabs', async () => {
            const user = userEvent.setup();
            renderWithContext(<ImgHero />, { user: mockUser });

            await user.click(screen.getByRole('button', { name: /Start a post/i }));
            expect(mockPush).toHaveBeenCalledWith('/create');

            expect(screen.getByText('Popular Creators')).toBeInTheDocument();
            await user.click(screen.getByRole('tab', { name: 'Recent' }));
            expect(screen.getByText('Recently Visited')).toBeInTheDocument();
        });
    });

    describe('AsideLeft', () => {
        it('renders "Explore Topics", all topics, and closes drawer on close button click', async () => {
            const user = userEvent.setup();
            const { contextValue } = renderWithContext(<AsideLeft />, { navModal: true });

            expect(screen.getByText('Explore Topics')).toBeInTheDocument();
            expect(screen.getByText(`All ${topicIcons.length} Communities`)).toBeInTheDocument();

            await user.click(screen.getByRole('button', { name: 'Close topics drawer' }));
            expect(contextValue.setNavModal).toHaveBeenCalledWith(false);
        });
    });

    describe('AccordionPopulars and AsideRight', () => {
        it('renders popular users linking to their profile pages', () => {
            renderWithContext(<AsideRight />);

            expect(screen.getByText('popular users')).toBeInTheDocument();
            expect(screen.getByText('Your feed, your topics')).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /@someone/i })).toHaveAttribute('href', '/u/someone');
        });

        it('renders empty state when there are no popular users', () => {
            renderWithContext(<AccordionPopulars />, { popularUsers: [], loadingPopular: false });

            expect(screen.getByText('Not users to show...')).toBeInTheDocument();
        });
    });

    describe('GridLayout', () => {
        it('renders ImgHero and children on the root "/" route when loaded', () => {
            mockUsePathname.mockReturnValue('/');
            renderWithContext(
                <GridLayout>
                    <div>Feed Content</div>
                </GridLayout>
            );

            expect(screen.getByText('Feed Content')).toBeInTheDocument();
            expect(
                screen.getByText('Share freely across the topics you actually care about.')
            ).toBeInTheDocument();
        });

        it('hides ImgHero on non-root routes', () => {
            mockUsePathname.mockReturnValue('/p/2');
            renderWithContext(
                <GridLayout>
                    <div>Detail Content</div>
                </GridLayout>
            );

            expect(screen.getByText('Detail Content')).toBeInTheDocument();
            expect(
                screen.queryByText('Share freely across the topics you actually care about.')
            ).not.toBeInTheDocument();
        });

        it('renders Spinner while loading and error message when fetchError is true', () => {
            const { container } = renderWithContext(
                <GridLayout>
                    <div>Hidden</div>
                </GridLayout>,
                { loadingData: true }
            );

            expect(container.querySelector('.loader')).toBeInTheDocument();
            expect(screen.queryByText('Hidden')).not.toBeInTheDocument();

            renderWithContext(
                <GridLayout>
                    <div>Hidden Error</div>
                </GridLayout>,
                { loadingData: false, fetchError: true }
            );
            expect(
                screen.getByText('server error, reload the page or try again later...')
            ).toBeInTheDocument();
        });
    });
});
