import type { Metadata, ResolvingMetadata } from 'next';

import Post from "@/src/pageComponents/Post";
import firebase from '@/src/firebase/firebase';
import { POSTS } from '@/src/fakeData';

import type { Params, DynamicParams } from '@/src/types/components-props';

export async function generateMetadata(
    { params, searchParams }: DynamicParams,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;

    const fakePost = POSTS.find(item => item.posts.id === id)?.posts;
    let post: any = fakePost;

    if (!post) {
        try {
            post = await firebase.getData('posts', id);
        } catch {
            post = null;
        }
    }

    if (!post) return { title: 'Post Not Found | myfeed' };

    return {
        title: `${post.title} | myfeed`,
        description: post.description || 'Read this post and join the discussion on myfeed.',
    };
}

export default async function Page({ params }: Params) {
    const { id } = await params;

    return <Post idPost={id} />
}
