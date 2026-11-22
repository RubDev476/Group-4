'use client';

import { useContext, useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';

import { MenuItem, ListItemIcon, IconButton } from "@mui/material";
import { MoreHoriz, Delete, Edit } from '@mui/icons-material';

import themeColors from "@/src/utilities/themeColors";
import { GlobalContext } from "@/src/app/providers";
import StyledMenu, { getMenuItemHoverSx } from "@/src/components/ui/StyledMenu";

import type { PostProps } from '@/src/types/components-props';

export default function PostOptions({ idPost }: PostProps) {
    const menuId = useId();
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const path = usePathname();
    const router = useRouter();
    const { setAllPosts, allPosts, user } = useContext(GlobalContext);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !theme) return null;

    const menuItemHover = getMenuItemHoverSx(theme);

    const editPost = () => router.push('/edit-post/' + idPost);

    const deletePost = () => {
        if (!user) return;

        setAllPosts(allPosts.filter((item) => item.posts.id !== idPost));

        if (path.includes('/p/')) {
            router.push('/');
        }
    };

    return (
        <>
            <IconButton
                onClick={(event) => setAnchorEl(event.currentTarget)}
                size="small"
                sx={{ ml: 2 }}
                aria-label="Post options"
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
                <MenuItem sx={menuItemHover} onClick={editPost}>
                    <ListItemIcon>
                        <Edit className="primary-color" fontSize="small" />
                    </ListItemIcon>
                    Edit post
                </MenuItem>

                <MenuItem sx={menuItemHover} onClick={deletePost}>
                    <ListItemIcon>
                        <Delete className="primary-color" fontSize="small" />
                    </ListItemIcon>
                    Delete post
                </MenuItem>
            </StyledMenu>
        </>
    );
}
