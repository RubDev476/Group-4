'use client';

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AddRounded, AppsRounded, ArrowForwardRounded } from "@mui/icons-material";

import { GlobalContext } from "@/src/app/providers";
import { USERS } from "@/src/fakeData";
import { topicIcons } from "@/src/utilities/asideLeftItems";
import type { UserDbType } from "@/src/types";
import { AvatarImg, SkeletonUser } from "../ui";

export default function ImgHero() {
    const { user, setFormModal, setNavModal, popularUsers, loadingPopular, allUsers } = useContext(GlobalContext);
    const [creatorTab, setCreatorTab] = useState<'popular' | 'recent'>('popular');
    const recentActivity = allUsers ?? USERS;
    const router = useRouter();

    const handleStartPost = () => {
        if (!user) return setFormModal(true);
        router.push('/create');
    };

    const displayedCreators = creatorTab === 'popular' ? popularUsers : recentActivity;
    const isLoadingList = creatorTab === 'popular' && loadingPopular;

    return (
        <section className="hero-bento w-full">
            <div className="hero-main-card relative overflow-h">
                <Image
                    src='/images/hero.jpg'
                    alt="myfeed community banner"
                    priority
                    fill
                    sizes="(max-width: 900px) 100vw, 66vw"
                    className="hero-bg-img w-full h-full"
                />

                <div className="hero-overlay w-full h-full">
                    <span className="hero-pill">Your feed · Zero algorithmic noise</span>

                    <h1 className="logo-font">
                        Share freely across the topics you actually care about.
                    </h1>

                    <p className="hero-sub">
                        Gaming, cinema, books, history, TV, tech & more — curated by people, not random feeds.
                    </p>

                    <div className="hero-cta-row">
                        <button type="button" className="hero-btn-primary pointer" onClick={handleStartPost}>
                            <AddRounded />
                            <span>Start a post</span>
                        </button>

                        <button type="button" className="hero-btn-secondary pointer" onClick={() => setNavModal(true)}>
                            <AppsRounded />
                            <span>Explore topics</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="hero-side-card">
                <div className="side-card-top">
                    <div className="side-card-head">
                        <span className="side-eyebrow">Community Voices</span>
                        <h2 className="logo-font">
                            {creatorTab === 'popular' ? 'Popular Creators' : 'Recently Visited'}
                        </h2>
                    </div>

                    <div className="side-switcher" role="tablist" aria-label="Filter creators">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={creatorTab === 'popular'}
                            className={`side-switch-btn pointer ${creatorTab === 'popular' ? 'active' : ''}`}
                            onClick={() => setCreatorTab('popular')}
                        >
                            Popular
                        </button>

                        <button
                            type="button"
                            role="tab"
                            aria-selected={creatorTab === 'recent'}
                            className={`side-switch-btn pointer ${creatorTab === 'recent' ? 'active' : ''}`}
                            onClick={() => setCreatorTab('recent')}
                        >
                            Recent
                        </button>
                    </div>
                </div>

                <div className="creators-stack">
                    {isLoadingList && (
                        <>
                            <SkeletonUser />
                            <SkeletonUser />
                            <SkeletonUser />
                        </>
                    )}

                    {!isLoadingList && displayedCreators.slice(0, 4).map((creator: UserDbType) => (
                        <Link
                            key={creator.uid}
                            href={`/u/${creator.displayName}`}
                            className="creator-row"
                        >
                            <div className="creator-info flex align-center">
                                <AvatarImg size={36} fontSize={16} user={creator} />
                                <div className="creator-meta">
                                    <span className="creator-name">{`@${creator.displayName}`}</span>
                                    <span className="creator-sub">
                                        {creatorTab === 'popular' ? 'Active contributor' : 'Visited recently'}
                                    </span>
                                </div>
                            </div>
                            <ArrowForwardRounded className="creator-arrow" />
                        </Link>
                    ))}

                    {!isLoadingList && displayedCreators.length === 0 && (
                        <p className="empty-creators">
                            {creatorTab === 'popular' ? 'No creators to show yet.' : 'No recently visited creators.'}
                        </p>
                    )}
                </div>

                <div className="side-card-stats">
                    <span>{`${topicIcons.length} Topics`}</span>
                    <span>·</span>
                    <span>Chronological</span>
                    <span>·</span>
                    <span>Open</span>
                </div>
            </div>
        </section>
    )
}
