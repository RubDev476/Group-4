import type { Metadata, ResolvingMetadata } from 'next';

import User from '@/src/pageComponents/User';
import firebase from '@/src/firebase/firebase';
import { USERS } from '@/src/fakeData';

import type { Params, DynamicParams } from '@/src/types/components-props';

export async function generateMetadata(
    { params, searchParams }: DynamicParams,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);

    const fakeUser = USERS.find(u => u.displayName === decodedId);
    let user: any = fakeUser;

    if (!user) {
        try {
            user = await firebase.getData('users', decodedId);
        } catch {
            user = null;
        }
    }

    if (!user) return { title: 'User Not Found | myfeed' };

    return {
        title: `@${user.displayName} | myfeed`,
        description: `Explore posts by @${user.displayName} on myfeed.`,
    };
}

export default async function Page({ params }: Params) {
    const { id } = await params;

    return <User userName={decodeURIComponent(id)} />
}
