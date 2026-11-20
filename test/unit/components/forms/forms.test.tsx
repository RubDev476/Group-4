import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
    Dropzone,
    EditPostForm,
    FormComment,
    FormLogin,
    FormRegister,
    FormSesion,
    UserForm,
} from '@/src/components/forms';
import { POSTS } from '@/src/fakeData';
import { mockUser, renderWithContext } from '../../../utils/renderWithContext';
import { mockPush } from '../../../setup';

describe('Form Components', () => {
    describe('FormLogin', () => {
        const baseProps = () => ({
            select: vi.fn(),
            blur: vi.fn(),
            setFormRegister: vi.fn(),
            setSucces: vi.fn(),
            errorSubmit: '',
            setErrorSubmit: vi.fn(),
            setFormModal: vi.fn(),
        });

        it('shows validation errors when submitted empty', async () => {
            const user = userEvent.setup();
            render(<FormLogin {...baseProps()} />);

            await user.click(screen.getByRole('button', { name: 'Sign in' }));

            expect(await screen.findByText('Email required*')).toBeInTheDocument();
            expect(await screen.findByText('Password required*')).toBeInTheDocument();
        });

        it('closes modal on valid credentials and switches to register form', async () => {
            const user = userEvent.setup();
            const props = baseProps();
            render(<FormLogin {...props} />);

            await user.type(screen.getByLabelText(/Email/i), 'test@example.com');
            await user.type(screen.getByLabelText(/Password/i), 'secret123');
            await user.click(screen.getByRole('button', { name: 'Sign in' }));

            expect(props.setFormModal).toHaveBeenCalledWith(false);

            await user.click(screen.getByText('Create an account'));
            expect(props.setFormRegister).toHaveBeenCalledWith(true);
        });
    });

    describe('FormRegister', () => {
        const baseProps = () => ({
            select: vi.fn(),
            blur: vi.fn(),
            setFormRegister: vi.fn(),
            setSucces: vi.fn(),
            errorSubmit: '',
            setErrorSubmit: vi.fn(),
        });

        it('shows an error when passwords do not match and prevents submission', async () => {
            const user = userEvent.setup();
            const props = baseProps();
            render(<FormRegister {...props} />);

            await user.type(screen.getByLabelText(/User name/i), 'rubdev');
            await user.type(screen.getByLabelText(/Email/i), 'rub@example.com');
            await user.type(screen.getByLabelText(/^Password/i), '123456');
            await user.type(screen.getByLabelText(/Confirm password/i), '654321');

            expect(screen.getByText('Password does not match*')).toBeInTheDocument();

            await user.click(screen.getByRole('button', { name: 'Register' }));
            expect(props.setSucces).not.toHaveBeenCalled();
        });

        it('calls setSucces(true) when valid registration data is submitted', async () => {
            const user = userEvent.setup();
            const props = baseProps();
            render(<FormRegister {...props} />);

            await user.type(screen.getByLabelText(/User name/i), 'rubdev');
            await user.type(screen.getByLabelText(/Email/i), 'rub@example.com');
            await user.type(screen.getByLabelText(/^Password/i), '123456');
            await user.type(screen.getByLabelText(/Confirm password/i), '123456');
            await user.click(screen.getByRole('button', { name: 'Register' }));

            expect(props.setSucces).toHaveBeenCalledWith(true);
        });
    });

    describe('FormSesion', () => {
        it('toggles between login and register views and closes modal on close button click', async () => {
            const user = userEvent.setup();
            const { contextValue } = renderWithContext(<FormSesion />, { formModal: true });

            expect(screen.getByText('Welcome back')).toBeInTheDocument();

            await user.click(screen.getByText('Create an account'));
            expect(screen.getByText('Join myfeed')).toBeInTheDocument();

            await user.click(screen.getByText('Sign in'));
            expect(screen.getByText('Welcome back')).toBeInTheDocument();

            const closeBtn = document.querySelector('.btn-close') as HTMLButtonElement;
            await user.click(closeBtn);
            expect(contextValue.setFormModal).toHaveBeenCalledWith(false);
        });
    });

    describe('FormComment', () => {
        const samplePost = JSON.parse(JSON.stringify(POSTS[0].posts));

        it('adds a new comment to global state when submitted by an authenticated user', async () => {
            const user = userEvent.setup();
            const resetFormComment = vi.fn();
            const { contextValue } = renderWithContext(
                <FormComment
                    post={samplePost}
                    isReplyForm={false}
                    resetFormComment={resetFormComment}
                />,
                { user: mockUser }
            );

            await user.type(screen.getByPlaceholderText('Write comment'), 'Great post!');
            await user.click(screen.getByRole('button', { name: 'Comment' }));

            expect(contextValue.setAllPosts).toHaveBeenCalledTimes(1);
            const updatedPosts = vi.mocked(contextValue.setAllPosts).mock.calls[0][0] as typeof POSTS;
            const updatedTarget = updatedPosts.find((p) => p.posts.id === samplePost.id);
            expect(updatedTarget?.posts.comments[0].comment).toBe('Great post!');
        });

        it('calls resetFormComment when clicking Cancel in reply mode', async () => {
            const user = userEvent.setup();
            const resetFormComment = vi.fn();

            renderWithContext(
                <FormComment
                    post={samplePost}
                    isReplyForm={true}
                    commentId="1"
                    resetFormComment={resetFormComment}
                />,
                { user: mockUser }
            );

            expect(screen.getByPlaceholderText('Write reply')).toBeInTheDocument();
            await user.click(screen.getByRole('button', { name: 'Cancel' }));
            expect(resetFormComment).toHaveBeenCalledTimes(1);
        });
    });

    describe('UserForm', () => {
        it('redirects to "/" when no user is authenticated', () => {
            renderWithContext(<UserForm typeForm="createPost" />, { user: null });
            expect(mockPush).toHaveBeenCalledWith('/');
        });

        it('validates required fields in createPost mode and redirects on valid submit', async () => {
            const user = userEvent.setup();
            renderWithContext(<UserForm typeForm="createPost" />, { user: mockUser });

            expect(screen.getByText('Create post')).toBeInTheDocument();

            await user.click(screen.getByRole('button', { name: 'Create' }));
            expect(await screen.findByText('Title required*')).toBeInTheDocument();
            expect(await screen.findByText('Description required*')).toBeInTheDocument();

            await user.type(screen.getByPlaceholderText('Post title'), 'My new post');
            await user.type(screen.getByPlaceholderText('Post description'), 'Sample test description');
            await user.click(screen.getByRole('button', { name: 'Create' }));

            expect(mockPush).toHaveBeenCalledWith('/');
        });

        it('displays current username in editProfile mode', () => {
            renderWithContext(<UserForm typeForm="editProfile" />, { user: mockUser });

            expect(screen.getByText('Edit profile')).toBeInTheDocument();
            expect(screen.getByText(mockUser.displayName!)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: 'Update profile' })).toBeInTheDocument();
        });
    });

    describe('EditPostForm', () => {
        it('pre-fills post title and description and navigates to post detail on submit', async () => {
            const user = userEvent.setup();
            renderWithContext(<EditPostForm idPost="1" />, { user: mockUser });

            expect(screen.getByText('Edit post')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Hi Evryoneeee :)')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Welcome to this page hehehe')).toBeInTheDocument();

            await user.click(screen.getByRole('button', { name: 'Update post' }));
            expect(mockPush).toHaveBeenCalledWith('/p/1');
        });
    });

    describe('Dropzone', () => {
        it('renders drop instructions when empty and image preview with error when provided', () => {
            const { rerender } = render(
                <Dropzone getImg={vi.fn()} img={null} setErrorImg={vi.fn()} errorImg="" />
            );

            expect(
                screen.getByText('Drag and drop an image or click here to choose one')
            ).toBeInTheDocument();

            rerender(
                <Dropzone
                    getImg={vi.fn()}
                    img="/images/posts/post-2.jpg"
                    setErrorImg={vi.fn()}
                    errorImg="Error (Max. 10Mb, 'jpeg/png')*"
                />
            );

            expect(screen.getByAltText('img-preview')).toHaveAttribute('src', '/images/posts/post-2.jpg');
            expect(screen.getByText("Error (Max. 10Mb, 'jpeg/png')*")).toBeInTheDocument();
        });
    });
});
