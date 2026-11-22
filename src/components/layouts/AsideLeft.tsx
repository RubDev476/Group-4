'use client';

import { ReactNode, useState, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Close } from "@mui/icons-material";

import { TopicIcon, topicIcons } from "@/src/utilities/asideLeftItems";
import { AvatarImg } from "../ui";
import { GlobalContext } from "@/src/app/providers";
import { USERS } from "@/src/fakeData";
import type { UserDbType } from "@/src/types";

export default function AsideLeft() {
    const [recentActivity] = useState<UserDbType[]>(USERS);

    const path = usePathname();
    
    const { navModal, setNavModal, popularUsers } = useContext(GlobalContext);

    return (
        <aside className={`topics-drawer ${navModal ? 'open' : ''} bg-color scroll-bar-style`} aria-hidden={!navModal}>
            <div className="drawer-header flex align-center justify-between w-full">
                <div>
                    <h3 className="logo-font">Explore Topics</h3>
                    <p>Pick what you care about. Zero algorithmic noise.</p>
                </div>

                <button
                    type="button"
                    className="drawer-close all-center pointer"
                    onClick={() => setNavModal(false)}
                    aria-label="Close topics drawer"
                >
                    <Close />
                </button>
            </div>

            <div className="drawer-section w-full">
                <span className="drawer-label">All {topicIcons.length} Communities</span>
                <div className="drawer-topics-grid">
                    {topicIcons.map((topic: TopicIcon): ReactNode => (
                        <Link
                            key={topic.title}
                            href={topic.path}
                            onClick={() => setNavModal(false)}
                            className={`drawer-topic-chip ${path === topic.path ? 'active' : ''}`}
                        >
                            {topic.iconPath && path === topic.path ? (
                                <topic.iconPath className="icon" />
                            ) : (
                                <topic.icon className="icon" />
                            )}
                            <span>{topic.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {popularUsers.length > 0 && (
                <div className="drawer-section w-full">
                    <span className="drawer-label">Popular Creators</span>
                    <div className="drawer-creators-list">
                        {popularUsers.map((creator: UserDbType) => (
                            <Link
                                key={creator.uid}
                                href={`/u/${creator.displayName}`}
                                onClick={() => setNavModal(false)}
                                className="drawer-creator-item"
                            >
                                <AvatarImg size={32} fontSize={15} user={creator} />
                                <span>{`@${creator.displayName}`}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {recentActivity.length > 0 && (
                <div className="drawer-section w-full">
                    <span className="drawer-label">Recently Visited</span>
                    <div className="drawer-creators-list">
                        {recentActivity.map((recentUser: UserDbType) => (
                            <Link
                                key={recentUser.uid}
                                href={`/u/${recentUser.displayName}`}
                                onClick={() => setNavModal(false)}
                                className="drawer-creator-item"
                            >
                                <AvatarImg size={32} fontSize={15} user={recentUser} />
                                <span>{`@${recentUser.displayName}`}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <p className="drawer-footer">
                <span>myfeed</span> · Created by <span>Rub</span>Developer © {new Date().getFullYear()}
            </p>
        </aside>
    )
}
