import '@testing-library/jest-dom/vitest';
import React from 'react';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

// Global next/navigation mock (can be overridden per test)
export const mockPush = vi.fn();
export const mockReplace = vi.fn();
export const mockBack = vi.fn();
export const mockUsePathname = vi.fn(() => '/');

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
        replace: mockReplace,
        back: mockBack,
        prefetch: vi.fn(),
        refresh: vi.fn(),
    }),
    usePathname: () => mockUsePathname(),
}));

// Global next/image mock rendering a standard <img> tag in jsdom
vi.mock('next/image', () => ({
    default: (
        props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }
    ) => {
        const { src, alt, ...rest } = props;
        delete rest.fill;
        delete rest.priority;
        const resolvedSrc = typeof src === 'string' ? src : '';
        return React.createElement('img', { src: resolvedSrc, alt: alt ?? '', ...rest });
    },
}));

// Global next/link mock rendering a standard <a> tag
vi.mock('next/link', () => ({
    default: ({
        href,
        children,
        ...rest
    }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) =>
        React.createElement('a', { href, ...rest }, children),
}));

// Global next-themes mock
export const mockSetTheme = vi.fn();
export const mockUseTheme = vi.fn(() => ({
    theme: 'dark',
    setTheme: mockSetTheme,
    resolvedTheme: 'dark',
}));

vi.mock('next-themes', () => ({
    useTheme: () => mockUseTheme(),
    ThemeProvider: ({ children }: { children: React.ReactNode }) =>
        React.createElement(React.Fragment, null, children),
}));

// Required jsdom polyfills
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

class ResizeObserverMock {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
}

global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

if (!URL.createObjectURL) {
    URL.createObjectURL = vi.fn(() => 'blob:mock-preview-url');
}
