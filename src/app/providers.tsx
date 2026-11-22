'use client';

import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback, createContext } from 'react';

import { AllPostsType, GlobalContextType, UserDbType } from '../types';
import { POSTS, USERS } from '../fakeData';

const defaultValues: GlobalContextType = {
    navModal: false,
    formModal: false,
    setNavModal: () => {},
    setFormModal: () => {},
    allPosts: [],
    setAllPosts: () => {},
    allUsers: null,
    loadingData: true,
    popularUsers: [],
    loadingPopular: true,
    setRefresh: () => {},
    user: null,
    fetchError: false,
};

export const GlobalContext = createContext<GlobalContextType>(defaultValues);

export function Providers({ children }: { children: React.ReactNode }) {
    const [navModal, setNavModal] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [loadingPopular, setLoadingPopular] = useState(false);

    const [popularUsers, setPopularUsers] = useState<UserDbType[]>(USERS);
    const [allPosts, setAllPosts] = useState<AllPostsType[]>(POSTS);
    const [allUsers, setAllUsers] = useState<UserDbType[] | null>(USERS);
    const [user] = useState<UserDbType | null>(null);
    const [fetchError] = useState(false);

    const router = useRouter();

    const setRefresh = useCallback<React.Dispatch<React.SetStateAction<{ refresh: boolean; redirectTo: string }>>>(
        (action) => {
            const next = typeof action === 'function'
                ? action({ refresh: false, redirectTo: '' })
                : action;

            if (next.refresh) {
                setAllPosts(POSTS);
                setAllUsers(USERS);
                setPopularUsers(USERS);
                setLoadingData(false);
                setLoadingPopular(false);

                if (next.redirectTo !== '') {
                    router.push(next.redirectTo);
                }
            }
        },
        [router]
    );

    useEffect(() => {
        document.body.classList.toggle('no-scrollY', navModal || formModal);
        return () => {
            document.body.classList.remove('no-scrollY');
        };
    }, [navModal, formModal]);

    const contextValue = useMemo<GlobalContextType>(
        () => ({
            navModal,
            formModal,
            setNavModal,
            setFormModal,
            allPosts,
            setAllPosts,
            allUsers,
            loadingData,
            popularUsers,
            loadingPopular,
            setRefresh,
            user,
            fetchError,
        }),
        [navModal, formModal, allPosts, allUsers, loadingData, popularUsers, loadingPopular, setRefresh, user, fetchError]
    );

    return (
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
            <GlobalContext.Provider value={contextValue}>
                {children}
            </GlobalContext.Provider>
        </ThemeProvider>
    );
}
