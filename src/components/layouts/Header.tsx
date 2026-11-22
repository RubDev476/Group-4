'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from 'next-themes';
import { useState, useEffect, useContext } from "react";

import { GlobalContext } from "@/src/app/providers";

import { Skeleton as SkeletonComponent, UserOptions } from "../ui";

import { 
    Menu as MenuIcon, 
    Close, 
    Search, 
    ArrowBack, 
    LightMode, 
    DarkMode,
    AddRounded,
} from "@mui/icons-material"; 

function BrandMark() {
    return (
        <span className="logo-mark" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="4" rx="2" fill="currentColor" />
                <rect x="3" y="10.5" width="12" height="4" rx="2" fill="currentColor" fillOpacity="0.85" />
                <rect x="3" y="17" width="15" height="4" rx="2" fill="currentColor" fillOpacity="0.65" />
            </svg>
        </span>
    );
}

export default function Header() {
    const [mounted, setMounted] = useState(false);
    const [searchActive, setSearchActive] = useState(false);

    const { theme, setTheme } = useTheme();
    const path = usePathname();

    const { navModal, setNavModal, setFormModal, user, loadingData } = useContext(GlobalContext);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSearchActive(false);
            }
        };

        window.addEventListener('resize', handleResize);
        setMounted(true);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => setNavModal(!navModal);

    const toggleSearch = () => {
        setSearchActive(!searchActive);
        setNavModal(false);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <header className='flex align-center border-bottom bg-color w-full'>
            <div className="header-inner">
                {!searchActive && (
                    <div className='all-center header-left'>
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="icon-btn menu-toggle-btn pointer"
                            aria-label="Toggle topics drawer"
                        >
                            {!navModal ? (
                                <MenuIcon className="icon" />
                            ) : (
                                <Close className="icon" />
                            )}
                        </button>

                        <Link href='/' className="logo-mobile logo-font pointer" aria-label="myfeed home">
                            <BrandMark />
                        </Link>

                        <Link href='/' className="logo-desktop logo-font pointer">
                            <BrandMark />
                            <span>my<span className="logo-accent">feed</span></span>
                        </Link>

                        <nav className="header-nav" aria-label="Main navigation">
                            <Link href="/" className={path === '/' ? 'active' : ''}>Explore</Link>
                            <button type="button" className="pointer" onClick={() => setNavModal(true)}>Topics</button>
                        </nav>
                    </div>
                )}

                {searchActive && (
                    <button type="button" onClick={toggleSearch} className="icon-btn pointer" aria-label="Close search">
                        <ArrowBack className="icon" />
                    </button>
                )}

                <form
                    onSubmit={handleSearchSubmit}
                    className={`bg-input align-center justify-center relative ${searchActive ? 'flex' : ''}`}
                >
                    <label htmlFor="search" className="all-center absolute">
                        <Search className="icon-label" />
                    </label>

                    <input type="text" placeholder="Search stories, topics, or @creators..." id="search" className="w-full h-full relative" />
                </form>

                <div className="all-center header-right">
                    {!searchActive && (
                        <button type="button" onClick={toggleSearch} className="icon-btn search-toggle-btn pointer" aria-label="Search">
                            <Search className="icon" />
                        </button>
                    )}

                    {((user && !loadingData) && !searchActive) && (
                        <Link href="/create" className="btn-create-header pointer">
                            <AddRounded />
                            <span>New post</span>
                        </Link>
                    )}

                    {mounted ? (
                        (!searchActive && (
                            <div
                                className="theme-container pointer"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {(theme === 'light' || theme === 'system') && <DarkMode />}
                                {(theme === 'dark') && <LightMode />}
                            </div>
                        ))
                    ) : (
                        <SkeletonComponent 
                            variant="circular"
                            width={34}
                            height={34}
                        />
                    )}

                    {loadingData && (
                        <SkeletonComponent
                            variant="rectangular"
                            width={86}
                            height={34}
                        />
                    )}

                    {((!user && !loadingData) && !searchActive) && (
                        <button className="btn-signin pointer" onClick={() => setFormModal(true)}>Sign in</button>
                    )}

                    {(((user && !loadingData) && theme !== undefined) && !searchActive) && (
                        <UserOptions 
                            theme={theme}
                            user={user}
                        />
                    )}
                </div>
            </div>
        </header>
    )
}
