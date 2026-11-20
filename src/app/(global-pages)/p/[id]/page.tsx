import type { Metadata } from 'next';

import Post from "@/src/pageComponents/Post";
import { POSTS } from '@/src/fakeData';

import type { Params, DynamicParams } from '@/src/types/components-props';

export async function generateMetadata(
    { params }: DynamicParams
): Promise<Metadata> {
    const { id } = await params;

    const post = POSTS.find(item => item.posts.id === id)?.posts;

    if (!post) return { title: 'Post Not Found | myfeed' };

    return {
        title: `${post.title} | myfeed`,
        description: post.description || 'Read this post and join the discussion on myfeed.',
    };
}

export default async function Page({ params }: Params) {
    const { id } = await params;

    return <Post idPost={id} />;
}
