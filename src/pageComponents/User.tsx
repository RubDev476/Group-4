'use client';

import { useContext, useMemo } from "react";

import { NotFound, AvatarImg } from "@/src/components/ui";
import { Post } from "../components/posts";

import { GlobalContext } from "@/src/app/providers";

import type { AllPostsType } from "@/src/types";
import type { UserProps } from "../types/components-props";

import { USERS } from "../fakeData";

export default function User({ userName }: UserProps) {
    const { allPosts, allUsers, loadingData } = useContext(GlobalContext);

    const user = useMemo(() => {
        const usersSource = allUsers ?? USERS;
        return usersSource.find((u) => u.displayName === userName) ?? null;
    }, [allUsers, userName]);

    const posts = useMemo(
        () => allPosts.filter((post) => post.user.displayName === userName),
        [allPosts, userName]
    );

    if (loadingData) return null;

    if (!user) return <NotFound message="User not found" />;

    const totalLikes = posts.reduce((acc, item) => acc + (item.posts.likes?.length || 0), 0);

    return (
        <div className="user-main-container w-full">
            <div className="profile-banner-card">
                <div className="profile-cover" />

                <div className="profile-body">
                    <div className="img-name-container flex justify-start">
                        <div className="avatar-ring">
                            <AvatarImg
                                size={96}
                                fontSize={44}
                                user={user}
                            />
                        </div>

                        <h4 className="logo-font">{'@' + user.displayName}</h4>
                    </div>

                    <div className="profile-meta">
                        <span className="meta-pill">{'Member since ' + user.dateRegister}</span>
                        <span className="meta-pill">{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span>
                        <span className="meta-pill">{totalLikes} {totalLikes === 1 ? 'like' : 'likes'}</span>
                    </div>
                </div>
            </div>

            {posts.length > 0 ? (
                <h5 className="logo-font">{'Published by @' + user.displayName}</h5>
            ) : (
                <h5 className="logo-font">{'@' + user.displayName + " hasn't published anything yet"}</h5>
            )}

            <div className="user-posts-grid">
                {posts.map((post: AllPostsType) => (
                    <Post key={post.posts.id} postData={post.posts} creator={post.user} />
                ))}
            </div>
        </div>
    )
}