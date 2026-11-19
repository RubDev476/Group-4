'use client';

import { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { FavoriteBorder, ChatBubbleOutline, IosShare, Favorite } from '@mui/icons-material';

import { AvatarImg } from '../ui';

import formatDate from '@/src/utilities/formatDate';

import firebase from '@/src/firebase/firebase';
import PostOptions from './PostOptions';

import { GlobalContext } from "@/src/app/providers";

import type { PostComponentProps } from '@/src/types/components-props';
import { handleLikes } from '@/src/firebase/utils';

export default function Post({ postData, creator }: PostComponentProps) {
    const path = usePathname();
    const router = useRouter();

    const {setFormModal, user, setAllPosts, allPosts} = useContext(GlobalContext);

    const totalComments = (): number => postData.comments.reduce((total: number, comment: any) => total + (comment.replies.length || 0), postData.comments.length);

    const likeToggle = async () => {
        if (!user) return setFormModal(true);

        const {updatePosts, currentPosts} = update_state(user.uid);

        try {
            setAllPosts(updatePosts);

            if (user.uid !== postData.idUser) await firebase.handleRecentActivity(user.uid, postData.idUser);

            await update_db(user.uid);
        } catch (error) {
            console.log(error);

            setAllPosts(currentPosts);
        }
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

    //modify data only for the db
    const update_db = async (uid: string) => {
        const currentPost_db = await firebase.getData('posts', postData.id);

        if(!currentPost_db) return;

        const currentLikes_db = handleLikes(currentPost_db.likes, uid);

        await firebase.updatePost({
            idPost: postData.id,
            idCreator: postData.idUser,
            currentData: currentPost_db.likes.length,
            key: 'likes',
            newData: currentLikes_db
        });
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
                        className="post-cover-img"
                        priority
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
                        <Image
                            src={postData.imgUrl}
                            alt={postData.title}
                            fill
                            className='bg-img absolute'
                            priority
                        />

                        <Image
                            src={postData.imgUrl}
                            alt={postData.title}
                            fill
                            className='img-post h-full absolute'
                            priority
                        />
                    </div>
                )}

                <div className="actions-container w-full flex align-center justify-between">
                    <div className="actions-left flex align-center">
                        <div className={`action-pill relative like all-center pointer ${isLiked ? 'liked' : ''}`} onClick={likeToggle}>
                            {isLiked ? (
                                <Favorite className='icon like-color' />
                            ) : (
                                <FavoriteBorder className='icon' />
                            )}

                            <span>{postData.likes.length.toString()}</span>
                        </div>

                        <div className="action-pill relative comment all-center pointer" onClick={redirectPost}>
                            <ChatBubbleOutline className='icon' />

                            <span>{totalComments().toString()}</span>
                        </div>
                    </div>

                    <div className="action-pill relative share all-center pointer">
                        <IosShare className='icon' />
                        {isDetailView && <span>Share</span>}
                    </div>
                </div>
            </div>
        </article>
    )
}
