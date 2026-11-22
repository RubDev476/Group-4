'use client';

import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { FavoriteBorder, ChatBubbleOutline, IosShare, Favorite } from '@mui/icons-material';

import { AvatarImg } from '../ui';

import formatDate from '@/src/utilities/formatDate';
import { handleLikes } from '@/src/utilities/handleLikes';
import PostOptions from './PostOptions';

import { GlobalContext } from "@/src/app/providers";

import type { CommentTypes } from '@/src/types';
import type { PostComponentProps } from '@/src/types/components-props';

export default function Post({ postData, creator }: PostComponentProps) {
    const [copied, setCopied] = useState(false);
    const path = usePathname();
    const router = useRouter();

    const {setFormModal, user, setAllPosts, allPosts} = useContext(GlobalContext);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const handleShare = () => {
        if (typeof window === 'undefined') return;
        const shareUrl = `${window.location.origin}/p/${postData.id}`;
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(shareUrl).catch(() => {});
        }
        setCopied(true);
    };

    const totalComments = (): number => postData.comments.reduce((total: number, comment: CommentTypes) => total + (comment.replies.length || 0), postData.comments.length);

    const likeToggle = async () => {
        if (!user) return setFormModal(true);

        const { updatePosts } = update_state(user.uid);
        setAllPosts(updatePosts);
    }

    //Modify data only for the state
    const update_state = (uid: string) => {
        const currentPosts = [...allPosts];

        const currentPost_state = JSON.parse(JSON.stringify(postData));

        const currentLikes_state: string[] = JSON.parse(JSON.stringify(postData.likes));
        currentPost_state.likes = handleLikes(currentLikes_state, uid);

        const updatePosts = allPosts.map(data => data.posts.id === postData.id ? { ...data, posts: currentPost_state } : data);

        return {
            currentPosts,
            updatePosts
        }
    }

    const redirectPost = () => {
        if(path.includes('/p/')) return;

        router.push('/p/' + postData.id);
    }

    const isLiked = Boolean(user && postData.likes.includes(user.uid));
    const isDetailView = path.includes('/p/');
    const isFeedCard = !isDetailView;

    return (
        <article className={`w-full relative ${isFeedCard ? 'post-card-feed' : 'post-card-detail'}`}>
            {isFeedCard && <Link href={`/p/${postData.id}`} className='link-post absolute w-full h-full' aria-label={postData.title}></Link>}

            {isFeedCard && postData.imgUrl && (
                <div className="post-cover relative w-full overflow-h">
                    <Image
                        src={postData.imgUrl}
                        alt={postData.title}
                        fill
                        sizes="(max-width: 520px) 100vw, 225px"
                        className="post-cover-img"
                    />
                </div>
            )}

            <div className="post-body flex direction-column">
                <div className="header-post relative flex justify-between">
                    <div className='flex info-creator'>
                        <Link href={`/u/${creator.displayName}`} className="user text-color flex align-center">
                            <AvatarImg
                                size={isDetailView ? 38 : 30}
                                fontSize={isDetailView ? 18 : 14}
                                user={creator}
                            />

                            <span className='user-name'>{`@${creator.displayName}`}</span>
                        </Link>

                        <p className='time text-opacity relative'>{formatDate(postData.date)}</p>
                    </div>

                    {(user && user.uid === creator.uid) && (
                        <PostOptions idPost={postData.id} />
                    )}
                </div>

                <h3 className="logo-font">{postData.title}</h3>

                {postData.description && (
                    <p className={`description ${isFeedCard ? 'description-clamp' : ''}`}>
                        {postData.description}
                    </p>
                )}

                {isDetailView && postData.imgUrl && (
                    <div className="img-container relative w-full all-center">
                        <div
                            className='bg-img absolute w-full h-full'
                            style={{ backgroundImage: `url(${postData.imgUrl})` }}
                            aria-hidden="true"
                        />

                        <Image
                            src={postData.imgUrl}
                            alt={postData.title}
                            fill
                            sizes="(max-width: 820px) 100vw, 760px"
                            className='img-post h-full absolute'
                            priority
                        />
                    </div>
                )}

                <div className="actions-container w-full flex align-center justify-between">
                    <div className="actions-left flex align-center">
                        <button
                            type="button"
                            className={`action-pill relative like all-center pointer ${isLiked ? 'liked' : ''}`}
                            onClick={likeToggle}
                            aria-label={isLiked ? 'Unlike post' : 'Like post'}
                            aria-pressed={isLiked}
                        >
                            {isLiked ? (
                                <Favorite className='icon like-color' />
                            ) : (
                                <FavoriteBorder className='icon' />
                            )}

                            <span>{postData.likes.length.toString()}</span>
                        </button>

                        <button
                            type="button"
                            className="action-pill relative comment all-center pointer"
                            onClick={redirectPost}
                            aria-label="View comments"
                        >
                            <ChatBubbleOutline className='icon' />

                            <span>{totalComments().toString()}</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="action-pill relative share all-center pointer"
                        onClick={handleShare}
                        aria-label="Share post link"
                    >
                        <IosShare className='icon' />
                        {(isDetailView || copied) && <span>{copied ? 'Copied!' : 'Share'}</span>}
                    </button>
                </div>
            </div>
        </article>
    )
}
