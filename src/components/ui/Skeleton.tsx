import { Skeleton as SkeletonMUI } from "@mui/material";

import type { SkeletonProps } from "@/src/types/components-props";

export default function Skeleton({ variant, width, height }: SkeletonProps) {
    return (
        <SkeletonMUI
            sx={{ backgroundColor: 'rgba(148, 163, 184, 0.22)', borderRadius: variant === 'rectangular' ? '999px' : undefined }}
            width={width}
            height={height}
            variant={variant}
        />
    )
}