import { describe, expect, it, vi, afterEach } from 'vitest';
import { handleLikes } from '@/src/utilities/handleLikes';
import formatDate from '@/src/utilities/formatDate';
import themeColors from '@/src/utilities/themeColors';
import { findTopicBySlug, topicIcons } from '@/src/utilities/asideLeftItems';
import {
    addCommentOrReply,
    mutateComment,
    mutateReply,
    togglePostLike,
} from '@/src/utilities/postMutations';
import { POSTS } from '@/src/fakeData';

describe('utilities', () => {
    describe('handleLikes', () => {
        it('prepends the uid when it is not yet in the likes list', () => {
            const current = ['2', '3'];
            const result = handleLikes(current, '1');

            expect(result).toEqual(['1', '2', '3']);
            expect(current).toEqual(['2', '3']);
        });

        it('removes the uid when it already exists in the likes list', () => {
            const current = ['1', '2', '3'];
            const result = handleLikes(current, '2');

            expect(result).toEqual(['1', '3']);
            expect(current).toEqual(['1', '2', '3']);
        });

        it('handles an empty likes array', () => {
            expect(handleLikes([], '5')).toEqual(['5']);
        });
    });

    describe('formatDate', () => {
        afterEach(() => {
            vi.useRealTimers();
        });

        it('strips "about" and appends "ago" for hour-based distances', () => {
            const now = new Date('2026-09-10T12:00:00Z').getTime();
            vi.useFakeTimers();
            vi.setSystemTime(now);

            const twoHoursAgo = now - 2 * 60 * 60 * 1000;
            const formatted = formatDate(twoHoursAgo);

            expect(formatted).not.toContain('about');
            expect(formatted).toContain('ago');
            expect(formatted).toBe('2 hours ago');
        });

        it('returns text without "ago" when less than a minute has elapsed', () => {
            const now = new Date('2026-09-10T12:00:00Z').getTime();
            vi.useFakeTimers();
            vi.setSystemTime(now);

            const fiveSecondsAgo = now - 5 * 1000;
            const formatted = formatDate(fiveSecondsAgo);

            expect(formatted).toContain('less');
            expect(formatted).not.toContain('ago');
        });

        it('appends "ago" for day-based distances', () => {
            const now = new Date('2026-09-10T12:00:00Z').getTime();
            vi.useFakeTimers();
            vi.setSystemTime(now);

            const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;
            expect(formatDate(threeDaysAgo)).toBe('3 days ago');
        });
    });

    describe('themeColors', () => {
        it('defines dark, light, and system values for every color token', () => {
            const keys = [
                'bgColor',
                'surfaceElevated',
                'color',
                'muted',
                'border',
                'itemHover',
                'accent',
            ] as const;

            keys.forEach((key) => {
                expect(themeColors[key].dark).toBeTruthy();
                expect(themeColors[key].light).toBeTruthy();
                expect(themeColors[key].system).toBeTruthy();
            });
        });
    });

    describe('asideLeftItems (topicIcons)', () => {
        it('defines 28 topics with valid title, slug, path, and icon', () => {
            expect(topicIcons).toHaveLength(28);

            for (const topic of topicIcons) {
                expect(topic.title.length).toBeGreaterThan(0);
                expect(topic.slug.length).toBeGreaterThan(0);
                expect(topic.path).toBe(`/topic/${topic.slug}`);
                expect(topic.icon).toBeDefined();
            }
        });

        it('finds existing topics by slug and returns undefined for unknown slugs', () => {
            expect(findTopicBySlug('videogames')?.title).toBe('Video games');
            expect(findTopicBySlug('unknown-topic')).toBeUndefined();
        });
    });

    describe('postMutations', () => {
        it('toggles post likes immutably without mutating the source array', () => {
            const originalLikes = [...POSTS[0].posts.likes];
            const updated = togglePostLike(POSTS, POSTS[0].posts.id, '999');

            expect(updated[0].posts.likes).toContain('999');
            expect(POSTS[0].posts.likes).toEqual(originalLikes);
        });

        it('adds comments and replies and safely ignores missing comment IDs', () => {
            const postId = POSTS[0].posts.id;
            const entry = { id: 'new-1', idUser: '1', date: 123, likes: [], comment: 'Hello!' };

            const withComment = addCommentOrReply(POSTS, postId, entry);
            expect(withComment[0].posts.comments[0].comment).toBe('Hello!');

            const withReply = addCommentOrReply(withComment, postId, { ...entry, id: 'rep-1' }, 'new-1');
            expect(withReply[0].posts.comments[0].replies[0].id).toBe('rep-1');

            const unchanged = addCommentOrReply(POSTS, postId, entry, 'missing-comment-id');
            expect(unchanged[0].posts.comments).toEqual(POSTS[0].posts.comments);
        });

        it('edits, likes, and deletes comments and replies immutably', () => {
            const postWithReplies = POSTS[2];
            const commentId = postWithReplies.posts.comments[0].id;
            const replyId = postWithReplies.posts.comments[0].replies[0].id;

            const edited = mutateComment(POSTS, postWithReplies.posts.id, commentId, 'edit', '1', 'Updated');
            expect(edited[2].posts.comments[0].comment).toBe('Updated');

            const replyDeleted = mutateReply(edited, postWithReplies.posts.id, commentId, replyId, 'delete', '1');
            expect(replyDeleted[2].posts.comments[0].replies.some((r) => r.id === replyId)).toBe(false);
        });
    });
});
