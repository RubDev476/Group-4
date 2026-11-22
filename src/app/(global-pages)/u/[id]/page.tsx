import type { Metadata } from 'next';

import User from '@/src/pageComponents/User';
import { USERS } from '@/src/fakeData';

import type { Params, DynamicParams } from '@/src/types/components-props';

export async function generateMetadata(
    { params }: DynamicParams
): Promise<Metadata> {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);

    const user = USERS.find(u => u.displayName === decodedId);

    if (!user) return { title: 'User Not Found' };

    return {
        title: `@${user.displayName}`,
        description: `Explore posts by @${user.displayName} on myfeed.`,
    };
}

export default async function Page({ params }: Params) {
    const { id } = await params;

    return <User userName={decodeURIComponent(id)} />;
}
