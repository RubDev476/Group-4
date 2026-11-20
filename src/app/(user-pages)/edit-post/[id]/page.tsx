import type { Metadata } from "next";

import { EditPostForm } from "@/src/components/forms";

import type { Params } from "@/src/types/components-props";

export const metadata: Metadata = {
    title: "myfeed | Edit post",
    description: "Explore, share, and express what you want with everyone",
};

export default async function Page({ params }: Params) {
    const { id } = await params;

    return (
        <EditPostForm idPost={id} />
    )
}
