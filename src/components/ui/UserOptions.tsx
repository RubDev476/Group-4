'use client';

import { useId, useState } from "react";
import { useRouter } from "next/navigation";

import AvatarImg from "./AvatarImg";
import StyledMenu, { getMenuItemHoverSx } from "./StyledMenu";

import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import {
    MenuItem,
    ListItemIcon,
    Divider,
    IconButton,
    Tooltip,
} from "@mui/material";
import { Settings, Logout, Create } from "@mui/icons-material";

import type { UserOptionsProps } from "@/src/types/components-props";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        color: '#FFFFFF',
        backgroundColor: '#0D9488',
        borderRadius: 8,
        fontSize: theme.typography.pxToRem(13),
        fontWeight: 500,
    },
}));

export default function UserOptions({ theme, user }: UserOptionsProps) {
    const menuId = useId();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const menuItemHover = getMenuItemHoverSx(theme);
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const logout = () => {};

    return (
        <>
            <CustomTooltip title="See profile options">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-label="Profile options"
                    aria-controls={open ? menuId : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <AvatarImg
                        size={32}
                        fontSize={20}
                        user={user}
                    />
                </IconButton>
            </CustomTooltip>

            <StyledMenu
                id={menuId}
                anchorEl={anchorEl}
                open={open}
                theme={theme}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => router.push(`/u/${user.displayName}`)} sx={menuItemHover}>
                    <AvatarImg
                        size={32}
                        fontSize={20}
                        user={user}
                    />

                    {'@' + user.displayName}
                </MenuItem>

                <Divider />

                <MenuItem onClick={() => router.push('/create')} sx={menuItemHover}>
                    <ListItemIcon>
                        <Create className="primary-color" fontSize="small" />
                    </ListItemIcon>
                    Create post
                </MenuItem>

                <MenuItem onClick={() => router.push('/edit-profile')} sx={menuItemHover}>
                    <ListItemIcon>
                        <Settings className="primary-color" fontSize="small" />
                    </ListItemIcon>
                    Edit profile
                </MenuItem>

                <MenuItem onClick={logout} sx={menuItemHover}>
                    <ListItemIcon>
                        <Logout className="primary-color" fontSize="small" />
                    </ListItemIcon>
                    Log out
                </MenuItem>
            </StyledMenu>
        </>
    );
}
