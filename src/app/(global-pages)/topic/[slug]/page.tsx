import type { Metadata } from 'next';

import Topic from '@/src/pageComponents/Topic';
import { findTopicBySlug } from '@/src/utilities/asideLeftItems';

import type { TopicParams } from '@/src/types/components-props';

export async function generateMetadata({ params }: TopicParams): Promise<Metadata> {
    const { slug } = await params;
    const topic = findTopicBySlug(decodeURIComponent(slug));

    if (!topic) return { title: 'Topic Not Found' };

    return {
        title: topic.title,
        description: `Explore posts and discussions in ${topic.title} on myfeed.`,
    };
}

export default async function Page({ params }: TopicParams) {
    const { slug } = await params;

    return <Topic slug={decodeURIComponent(slug)} />;
}
