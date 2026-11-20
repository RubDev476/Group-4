'use client';

import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useState, useEffect, createContext } from 'react';

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
    fetchError: false
};

export const GlobalContext = createContext<GlobalContextType>(defaultValues);

export function Providers({ children }: { children: React.ReactNode }) {
    const [navModal, setNavModal] = useState(false);
    const [formModal, setFormModal] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [loadingPopular, setLoadingPopular] = useState(true);

    const [popularUsers, setPopularUsers] = useState<UserDbType[]>([]);
    const [allPosts, setAllPosts] = useState<AllPostsType[]>([]);
    const [allUsers, setAllUsers] = useState<UserDbType[] | null>(null);
    const [user] = useState<UserDbType | null>(null);
    const [fetchError] = useState(false);

    const [refresh, setRefresh] = useState({ refresh: false, redirectTo: '' });

    const router = useRouter();

    const loadFakeData = () => {
        setAllPosts(POSTS);
        setAllUsers(USERS);
        setPopularUsers(USERS);
        setLoadingData(false);
        setLoadingPopular(false);
    };

    useEffect(() => {
        loadFakeData();
    }, []);

    useEffect(() => {
        if (refresh.refresh) {
            loadFakeData();
            setRefresh(prev => ({ ...prev, refresh: false }));

            if (refresh.redirectTo !== '') router.push(refresh.redirectTo);
        }
    }, [refresh, router]);

    useEffect(() => {
        document.body.classList.toggle('no-scrollY', navModal || formModal);
    }, [navModal, formModal]);

    return (
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
            <GlobalContext.Provider
                value={{
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
                    fetchError
                }}
            >
                {children}
            </GlobalContext.Provider>
        </ThemeProvider>
    );
}
