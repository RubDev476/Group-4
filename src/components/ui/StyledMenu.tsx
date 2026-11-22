'use client';

import type { ReactNode } from 'react';
import { Menu } from '@mui/material';
import themeColors from '@/src/utilities/themeColors';

interface StyledMenuProps {
    id: string;
    anchorEl: HTMLElement | null;
    open: boolean;
    theme: string;
    onClose: () => void;
    children: ReactNode;
}

export const getMenuItemHoverSx = (theme: string) => ({
    ':hover': { backgroundColor: themeColors.itemHover[theme] },
});

export default function StyledMenu({
    id,
    anchorEl,
    open,
    theme,
    onClose,
    children,
}: StyledMenuProps) {
    return (
        <Menu
            anchorEl={anchorEl}
            id={id}
            open={open}
            onClose={onClose}
            onClick={onClose}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        backgroundColor: themeColors.bgColor[theme],
                        color: themeColors.color[theme],
                        border: `1px solid ${themeColors.border[theme]}`,
                        borderRadius: '14px',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.22))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: themeColors.bgColor[theme],
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {children}
        </Menu>
    );
}
