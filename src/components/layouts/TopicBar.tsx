'use client';

import { useContext, useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppsRounded, ChevronLeftRounded, ChevronRightRounded, ExploreOutlined } from "@mui/icons-material";

import { topicIcons } from "@/src/utilities/asideLeftItems";
import { GlobalContext } from "@/src/app/providers";

export default function TopicBar() {
    const path = usePathname();
    const { setNavModal } = useContext(GlobalContext);

    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, dragged: false });

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    const updateScrollEdges = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;

        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        updateScrollEdges();
        window.addEventListener('resize', updateScrollEdges);
        return () => window.removeEventListener('resize', updateScrollEdges);
    }, [updateScrollEdges]);

    const scrollByAmount = (direction: 'left' | 'right') => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollBy({
            left: direction === 'left' ? -280 : 280,
            behavior: 'smooth',
        });
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = scrollerRef.current;
        if (!el) return;
        dragState.current = {
            isDown: true,
            startX: e.pageX - el.offsetLeft,
            scrollLeft: el.scrollLeft,
            dragged: false,
        };
        setIsDragging(true);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = scrollerRef.current;
        if (!el || !dragState.current.isDown) return;

        const x = e.pageX - el.offsetLeft;
        const walk = x - dragState.current.startX;
        if (Math.abs(walk) > 6) {
            dragState.current.dragged = true;
            e.preventDefault();
            el.scrollLeft = dragState.current.scrollLeft - walk;
        }
    };

    const handleMouseUpOrLeave = () => {
        dragState.current.isDown = false;
        setIsDragging(false);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (dragState.current.dragged) {
            e.preventDefault();
            dragState.current.dragged = false;
        }
    };

    return (
        <nav className="topic-bar w-full" aria-label="Topics navigation">
            <div className="topic-bar-inner">
                <div className="topic-scroller-wrap relative">
                    {canScrollLeft && (
                        <button
                            type="button"
                            className="topic-scroll-arrow left all-center pointer"
                            onClick={() => scrollByAmount('left')}
                            aria-label="Scroll topics left"
                        >
                            <ChevronLeftRounded />
                        </button>
                    )}

                    <div
                        ref={scrollerRef}
                        className={`topic-pills ${isDragging ? 'dragging' : ''}`}
                        onScroll={updateScrollEdges}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUpOrLeave}
                        onMouseLeave={handleMouseUpOrLeave}
                    >
                        <Link
                            href="/"
                            onClick={handleLinkClick}
                            draggable={false}
                            className={`topic-pill ${path === '/' ? 'active' : ''}`}
                        >
                            <ExploreOutlined className="pill-icon" />
                            <span>All Feed</span>
                        </Link>

                        {topicIcons.map(topic => {
                            const IconComp = topic.iconPath && path === topic.path ? topic.iconPath : topic.icon;
                            return (
                                <Link
                                    key={topic.path}
                                    href={topic.path}
                                    onClick={handleLinkClick}
                                    draggable={false}
                                    className={`topic-pill ${path === topic.path ? 'active' : ''}`}
                                >
                                    <IconComp className="pill-icon" />
                                    <span>{topic.title}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {canScrollRight && (
                        <button
                            type="button"
                            className="topic-scroll-arrow right all-center pointer"
                            onClick={() => scrollByAmount('right')}
                            aria-label="Scroll topics right"
                        >
                            <ChevronRightRounded />
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    className="topic-all-btn pointer"
                    onClick={() => setNavModal(true)}
                >
                    <AppsRounded className="pill-icon" />
                    <span>All topics</span>
                </button>
            </div>
        </nav>
    );
}
