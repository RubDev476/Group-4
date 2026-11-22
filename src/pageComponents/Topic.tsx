'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AddRounded, ArrowBackRounded, ExploreOutlined } from '@mui/icons-material';

import { GlobalContext } from '@/src/app/providers';
import { NotFound } from '@/src/components/ui';
import { Post } from '@/src/components/posts';
import { findTopicBySlug } from '@/src/utilities/asideLeftItems';

import type { AllPostsType } from '@/src/types';
import type { TopicProps } from '@/src/types/components-props';

export default function Topic({ slug }: TopicProps) {
    const router = useRouter();
    const { allPosts, user, setFormModal } = useContext(GlobalContext);

    const topic = findTopicBySlug(slug);

    if (!topic) {
        return <NotFound message="Topic not found. Explore our communities from the main feed." />;
    }

    const TopicIconComp = topic.iconPath ?? topic.icon;
    const topicPosts = allPosts.filter((item: AllPostsType) => item.posts.topic === topic.slug);

    const handleStartPost = () => {
        if (!user) {
            setFormModal(true);
            return;
        }
        router.push('/create');
    };

    return (
        <section className="topic-page-container w-full">
            <Link href="/" className="back-feed-link">
                <ArrowBackRounded />
                <span>Back to feed</span>
            </Link>

            <div className="topic-hero-card">
                <div className="topic-hero-icon all-center" aria-hidden="true">
                    <TopicIconComp />
                </div>

                <div className="topic-hero-info">
                    <span className="topic-badge">Community Topic</span>
                    <h2 className="logo-font">{topic.title}</h2>
                    <p>
                        Chronological stories, discussions, and perspectives shared by the{' '}
                        <strong>{topic.title}</strong> community — zero algorithmic noise.
                    </p>
                </div>

                <span className="feed-count">
                    {topicPosts.length} {topicPosts.length === 1 ? 'post' : 'posts'}
                </span>
            </div>

            {topicPosts.length > 0 ? (
                <div className="feed-posts feed-grid w-full">
                    {topicPosts.map((post: AllPostsType) => (
                        <Post
                            key={post.posts.id}
                            postData={post.posts}
                            creator={post.user}
                        />
                    ))}
                </div>
            ) : (
                <div className="topic-empty-card w-full">
                    <div className="topic-empty-icon all-center" aria-hidden="true">
                        <TopicIconComp />
                    </div>

                    <h3 className="logo-font">No posts related to this topic yet</h3>
                    <p>
                        There are no publications in <strong>{topic.title}</strong> right now. Be the first to
                        start the conversation or explore the latest stories across all topics.
                    </p>

                    <div className="topic-empty-actions">
                        <button
                            type="button"
                            className="topic-btn-primary pointer"
                            onClick={handleStartPost}
                        >
                            <AddRounded />
                            <span>Start a post</span>
                        </button>

                        <Link href="/" className="topic-btn-secondary">
                            <ExploreOutlined />
                            <span>Explore all feed</span>
                        </Link>
                    </div>
                </div>
            )}
        </section>
    );
}
