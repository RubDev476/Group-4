'use client';

import { useEffect, useState, useContext } from "react";

import { NotFound, AvatarImg } from "@/src/components/ui";
import { Post } from "../components/posts";

import { GlobalContext } from "@/src/app/providers";

import type { DocumentData } from "firebase/firestore";
import type { AllPostsType } from "@/src/types";
import type { UserProps } from "../types/components-props";
 
import firebase from "@/src/firebase/firebase";
import { USERS } from "../fakeData";

export default function User({ userName }: UserProps) {
    const [loadingPageUser, setLoadingPageUser] = useState(true);
    const [user, setUser] = useState<DocumentData | null>(null);
    const [posts, setPosts] = useState<AllPostsType[] | []>([]);

    const {allPosts, loadingData } = useContext(GlobalContext);

    useEffect(() => {
        const getDataUser = async () => {
            //const getUser = await firebase.getData('users', userName);
            const getUser = USERS.find(user => user.displayName === userName);

            if(!getUser) return setLoadingPageUser(false);

            const loadingPost: AllPostsType[] = allPosts.filter(post => post.user.displayName === userName);
    
            setUser(getUser);
            setPosts(loadingPost);
            setLoadingPageUser(false);
        }

        if(!loadingData && allPosts.length > 0) getDataUser();
        if(!loadingData && allPosts.length === 0) setLoadingPageUser(false);
    }, [allPosts, userName, loadingData])

    if (loadingPageUser && !user) return null;

    if(!loadingPageUser && !user) return <NotFound message="User not found" />;

    const totalLikes = posts.reduce((acc, item) => acc + (item.posts.likes?.length || 0), 0);

    if(!loadingPageUser && user) return (
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