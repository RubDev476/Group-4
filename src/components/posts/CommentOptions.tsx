'use client';

import { useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

import { MenuItem, ListItemIcon, IconButton } from "@mui/material";
import { MoreHoriz, Delete, Edit } from '@mui/icons-material';

import themeColors from "@/src/utilities/themeColors";
import StyledMenu, { getMenuItemHoverSx } from "@/src/components/ui/StyledMenu";

import type { CommentOptionsProps } from '@/src/types/components-props';

export default function CommentOptions({ deleteF, setEdit }: CommentOptionsProps) {
    const menuId = useId();
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !theme) return null;

    const menuItemHover = getMenuItemHoverSx(theme);

    return (
        <>
            <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                size="small"
                sx={{ ml: 2, padding: 0 }}
                aria-label="Comment options"
                aria-controls={open ? menuId : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <MoreHoriz
                    sx={{
                        fontSize: 30,
                        borderRadius: '100%',
                        cursor: 'pointer',
                        color: themeColors.color[theme],
                        padding: 0,
                    }}
                    className='bg-hover-2'
                />
            </IconButton>

            <StyledMenu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                theme={theme}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem sx={menuItemHover} onClick={() => setEdit(true)}>
                    <ListItemIcon>
                        <Edit className="primary-color" fontSize="small" />
                    </ListItemIcon>
                    Edit comment
                </MenuItem>

                <MenuItem sx={menuItemHover} onClick={() => deleteF()}>
                    <ListItemIcon>
                        <Delete className="primary-color" fontSize="small" />
                    </ListItemIcon>
                    Delete comment
                </MenuItem>
            </StyledMenu>
        </>
    );
}
