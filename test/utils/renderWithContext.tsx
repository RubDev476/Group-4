import React, { useState } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { vi } from 'vitest';

import { GlobalContext } from '@/src/app/providers';
import { POSTS, USERS } from '@/src/fakeData';
import type { AllPostsType, GlobalContextType, UserDbType } from '@/src/types';

export const mockUser: UserDbType = {
    uid: '1',
    displayName: 'someone',
    photoURL: '#8a7500',
    dateRegister: '08/12/2025',
};

export const mockImageUser: UserDbType = {
    uid: '2',
    displayName: 'cartman',
    photoURL: '/images/user/cartman.webp',
    dateRegister: '14/06/2026',
};

export function createMockContextValue(
    overrides: Partial<GlobalContextType> = {}
): GlobalContextType {
    return {
        navModal: false,
        formModal: false,
        setNavModal: vi.fn(),
        setFormModal: vi.fn(),
        allPosts: JSON.parse(JSON.stringify(POSTS)) as AllPostsType[],
        setAllPosts: vi.fn(),
        allUsers: [...USERS],
        loadingData: false,
        popularUsers: [...USERS],
        loadingPopular: false,
        setRefresh: vi.fn(),
        user: null,
        fetchError: false,
        ...overrides,
    };
}

export function renderWithContext(
    ui: React.ReactElement,
    overrides: Partial<GlobalContextType> = {},
    options?: Omit<RenderOptions, 'wrapper'>
) {
    const contextValue = createMockContextValue(overrides);

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );

    return {
        contextValue,
        ...render(ui, { wrapper: Wrapper, ...options }),
    };
}

/**
 * Stateful wrapper for integration tests where user actions
 * (likes, comments, replies, post deletion, modals) update context state.
 */
export function renderWithStatefulContext(
    ui: React.ReactElement,
    initialOverrides: Partial<GlobalContextType> = {},
    options?: Omit<RenderOptions, 'wrapper'>
) {
    const initialPosts =
        initialOverrides.allPosts ?? (JSON.parse(JSON.stringify(POSTS)) as AllPostsType[]);
    const setFormModalSpy = vi.fn();
    const setNavModalSpy = vi.fn();

    function StatefulWrapper({ children }: { children: React.ReactNode }) {
        const [allPosts, setAllPosts] = useState<AllPostsType[]>(initialPosts);
        const [formModal, setFormModalState] = useState<boolean>(
            initialOverrides.formModal ?? false
        );
        const [navModal, setNavModalState] = useState<boolean>(
            initialOverrides.navModal ?? false
        );
        const [, setRefresh] = useState({ refresh: false, redirectTo: '' });

        const setFormModal: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
            setFormModalSpy(value);
            setFormModalState(value);
        };

        const setNavModal: React.Dispatch<React.SetStateAction<boolean>> = (value) => {
            setNavModalSpy(value);
            setNavModalState(value);
        };

        const value: GlobalContextType = {
            navModal,
            formModal,
            setNavModal,
            setFormModal,
            allPosts,
            setAllPosts,
            allUsers: initialOverrides.allUsers ?? [...USERS],
            loadingData: initialOverrides.loadingData ?? false,
            popularUsers: initialOverrides.popularUsers ?? [...USERS],
            loadingPopular: initialOverrides.loadingPopular ?? false,
            setRefresh,
            user: initialOverrides.user ?? null,
            fetchError: initialOverrides.fetchError ?? false,
        };

        return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
    }

    return {
        setFormModalSpy,
        setNavModalSpy,
        ...render(ui, { wrapper: StatefulWrapper, ...options }),
    };
}
