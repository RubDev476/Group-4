'use client';

import { useContext } from 'react';

import { Post } from '../components/posts';

import type { AllPostsType } from '@/src/types';

import { GlobalContext } from '@/src/app/providers';

export default function Main() {
    const { allPosts } = useContext(GlobalContext);

    if (allPosts.length === 0) {
        return (
            <div className="main-container w-full">
                <div className="empty-feed-card">
                    <p>Be the first to publish on myfeed...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="main-container w-full">
            <div className="feed-toolbar flex align-center justify-between">
                <div className="feed-heading flex align-center">
                    <h2 className="logo-font">Latest in your feed</h2>
                    <span className="feed-count">{allPosts.length}</span>
                </div>
            </div>

            <div className="feed-posts feed-grid">
                {allPosts.map((data: AllPostsType) => (
                    <Post
                        key={data.posts.id}
                        postData={data.posts}
                        creator={data.user}
                    />
                ))}
            </div>
        </div>
    );
}
