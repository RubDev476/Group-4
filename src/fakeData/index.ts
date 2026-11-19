export const USERS = [
    {
        displayName: 'someone',
        uid: '1',
        photoURL: '#8a7500',
        dateRegister: '08/12/2025'
    },
    {
        displayName: 'cartman',
        uid: '2',
        photoURL: '/images/user/cartman.webp',
        dateRegister: '14/06/2026'
    },
    {
        displayName: 'theBest476',
        uid: '3',
        photoURL: '#108888',
        dateRegister: '11/02/2026'
    },
    {
        displayName: 'cyncyncynUwu',
        uid: '4',
        photoURL: '#b41b1b',
        dateRegister: '05/08/2026'
    },
    {
        displayName: 'pixelNora',
        uid: '5',
        photoURL: 'https://picsum.photos/seed/pixelnora-avatar/240/240',
        dateRegister: '19/03/2026'
    },
    {
        displayName: 'mateoReads',
        uid: '6',
        photoURL: 'https://picsum.photos/seed/mateoreads-avatar/240/240',
        dateRegister: '02/05/2026'
    },
    {
        displayName: 'vibeCine',
        uid: '7',
        photoURL: 'https://picsum.photos/seed/vibecine-avatar/240/240',
        dateRegister: '21/07/2026'
    },
]

const SETUP_EXTRA_COMMENTS = [
    'That lighting looks so clean!!',
    'What monitor is that? The colors pop so much.',
    'Cable management 10/10, not a single wire in sight.',
    'Bro this setup is literally my dream desk.',
    'How big is that desk? Looks super spacious.',
    'Love the vibe, super cozy for late-night gaming.',
    'Specs please!! Need to know what GPU you are running.',
    'Is that a mechanical keyboard? Which switches?',
    'Honestly cleaner than 90% of setups I see online.',
    'Wait, where did you get that desk mat?',
    'Respect my authoritah and drop the full parts list!',
    'The ambient backlight makes a huge difference.',
    'I could spend 12 hours straight coding here ngl.',
    'How are the temps on that PC case?',
    'That chair looks comfy as hell.',
    'Minimalist and functional, love it.',
    'Do you use a dual monitor arm or the stock stand?',
    'The color palette matches the wallpaper so well.',
    'Saved this for inspiration when I upgrade mine.',
    'Seriously jealous right now haha.',
    'How much did the whole setup cost roughly?',
    'That microphone arm placement is super neat.',
    'Would love to see a night-time photo with all lights off!',
    'Cleanest setup on myfeed so far.',
    'Are those studio monitors or regular speakers?',
    'My desk looks like a warzone compared to this.',
    '10/10 would play RPGs here all weekend.',
    'What wallpaper is that? Drop the link!',
    'The symmetry is weirdly satisfying.',
    'Wait is that an ultrawide or a 27 inch?',
    'I need to organize my cables after seeing this...',
    'Super aesthetic without going overboard on RGB.',
    'Do you mostly game or work on this setup?',
    'Those headphones look fire.',
    'Loving the dark wood + subtle glow combo.',
    'How do you keep it so dust-free?!',
    'Peak comfort right there.',
    'Add a small plant on the corner and it is perfection.',
    'What mouse are you using? Wireless?',
    'This deserves way more likes.',
    'Finally a setup that actually looks livable.',
    'The ergonomics look spot on.',
    'I had the same keyboard, best purchase ever.',
    'How long did it take you to put everything together?',
    'Lowkey want to copy this exact layout.',
    'That screen refresh rate must feel buttery smooth.',
    'Clean, sharp, zero clutter. Love it.',
    'Now show us the underside of the desk haha.',
    'Inspiring me to clean my room today.',
    'Absolute masterpiece of a setup!!'
].map((text, index) => {
    const userIds = ['1', '2', '3', '4'];
    const idUser = userIds[index % userIds.length];
    const commentId = String(index + 3);
    const baseTime = new Date("2026-08-28T10:00:00").getTime() + index * 3600 * 1000 * 6;
    const likes = index % 3 === 0 ? ['3', '1'] : index % 2 === 0 ? ['4'] : [];
    const replies = index % 10 === 0
        ? [
            {
                id: `${commentId}-r1`,
                idUser: '3',
                comment: 'Thanks! Appreciate it a lot 🙌',
                date: baseTime + 1800 * 1000,
                likes: [idUser]
            }
        ]
        : [];

    return {
        id: commentId,
        idUser,
        replies,
        date: baseTime,
        comment: text,
        likes
    };
});

export const POSTS = [
    {
        posts: {
            id: '2',
            comments: [
                {
                    id: '1',
                    idUser: '1',
                    replies: [],
                    date: new Date("2026-06-15T10:00:00").getTime(),
                    comment: 'thats cool',
                    likes: ['2']
                }
            ],
            idUser: '2',
            likes: ['1'],
            date: new Date("2026-06-15T10:00:00").getTime(),
            title: 'i like this',
            description: '',
            imgUrl: '/images/posts/post-2.jpg'
        },
        user: USERS[1]
    },
    {
        posts: {
            id: '1',
            comments: [],
            idUser: '1',
            likes: ['1', '2'],
            date: new Date("2026-01-05T10:00:00").getTime(),
            title: 'Hi Evryoneeee :)',
            description: 'Welcome to this page hehehe',
            imgUrl: ''
        },
        user: USERS[0]
    },
    {
        posts: {
            id: '4',
            comments: [
                {
                    id: '1',
                    idUser: '4',
                    replies: [
                        {
                            id: '1',
                            idUser: '3',
                            comment: 'thank youu',
                            date: new Date("2026-06-15T10:00:00").getTime(),
                            likes: ['4']
                        },
                        {
                            id: '1-r2',
                            idUser: '4',
                            comment: 'how long did it take you to hide all the cables like that??',
                            date: new Date("2026-06-15T10:15:00").getTime(),
                            likes: ['3', '1']
                        },
                        {
                            id: '1-r3',
                            idUser: '3',
                            comment: 'like an entire Sunday afternoon and way too many zip ties haha',
                            date: new Date("2026-06-15T10:28:00").getTime(),
                            likes: ['4', '2', '1']
                        },
                        {
                            id: '1-r4',
                            idUser: '1',
                            comment: 'worth every minute honestly, it looks super clean',
                            date: new Date("2026-06-15T11:02:00").getTime(),
                            likes: ['3']
                        },
                        {
                            id: '1-r5',
                            idUser: '2',
                            comment: 'meanwhile mine looks like a plate of spaghetti under the desk',
                            date: new Date("2026-06-15T11:30:00").getTime(),
                            likes: ['1', '3', '4']
                        },
                        {
                            id: '1-r6',
                            idUser: '3',
                            comment: 'an under-desk cable tray is a total lifesaver, 100% recommend it!',
                            date: new Date("2026-06-15T12:05:00").getTime(),
                            likes: ['2', '4']
                        }
                    ],
                    date: new Date("2026-06-15T10:00:00").getTime(),
                    comment: 'nice',
                    likes: ['3']
                },
                {
                    id: '2',
                    idUser: '2',
                    replies: [],
                    date: new Date("2026-08-27T10:00:00").getTime(),
                    comment: 'woooaaa',
                    likes: []
                },
                ...SETUP_EXTRA_COMMENTS
            ],
            idUser: '3',
            likes: ['4', '2', '1'],
            date: new Date("2026-04-09T10:00:00").getTime(),
            title: 'my setup, yeah !!',
            description: 'my sweet adiction',
            imgUrl: '/images/posts/post-4.jpg'
        },
        user: USERS[2]
    },
    {
        posts: {
            id: '3',
            comments: [],
            idUser: '2',
            likes: [],
            date: new Date("2026-07-03T10:00:00").getTime(),
            title: 'Hellooooo',
            description: 'I hate you guys (Stan, Kyle and Kenny :))',
            imgUrl: ''
        },
        user: USERS[1]
    },
    {
        posts: {
            id: '5',
            comments: [
                {
                    id: '5-c1',
                    idUser: '6',
                    replies: [
                        {
                            id: '5-r1',
                            idUser: '5',
                            comment: 'Totally! Hollow Knight and Outer Wilds are still unmatched for me.',
                            date: new Date("2026-09-02T14:20:00").getTime(),
                            likes: ['6', '3']
                        }
                    ],
                    date: new Date("2026-09-02T13:10:00").getTime(),
                    comment: 'Indie games have been carrying the whole industry lately.',
                    likes: ['5', '1']
                },
                {
                    id: '5-c2',
                    idUser: '7',
                    replies: [],
                    date: new Date("2026-09-02T16:45:00").getTime(),
                    comment: 'Give Hades II a try if you have not yet, pure gold.',
                    likes: ['5']
                }
            ],
            idUser: '5',
            likes: ['1', '3', '6', '7'],
            date: new Date("2026-09-02T11:30:00").getTime(),
            title: 'Best indie games you played this year?',
            description: 'Looking for something atmospheric with a great soundtrack to play over the weekend. Drop your hidden gems!',
            imgUrl: 'https://picsum.photos/seed/myfeed-indie-games/960/600'
        },
        user: USERS[4]
    },
    {
        posts: {
            id: '6',
            comments: [
                {
                    id: '6-c1',
                    idUser: '5',
                    replies: [],
                    date: new Date("2026-09-04T19:00:00").getTime(),
                    comment: 'Project Hail Mary! Could not put it down for a single second.',
                    likes: ['6', '7']
                }
            ],
            idUser: '6',
            likes: ['5', '4', '7'],
            date: new Date("2026-09-04T17:15:00").getTime(),
            title: 'One sci-fi book everyone should read at least once',
            description: 'I just finished Dune Messiah and now I have a massive reading hangover. What sci-fi novel completely changed how you see the genre?',
            imgUrl: ''
        },
        user: USERS[5]
    },
    {
        posts: {
            id: '7',
            comments: [
                {
                    id: '7-c1',
                    idUser: '6',
                    replies: [
                        {
                            id: '7-r1',
                            idUser: '7',
                            comment: 'Same! Practical effects age ten times better than rushed CGI.',
                            date: new Date("2026-09-06T21:10:00").getTime(),
                            likes: ['6']
                        }
                    ],
                    date: new Date("2026-09-06T20:05:00").getTime(),
                    comment: 'Arrival and Blade Runner 2049 still look like they came out yesterday.',
                    likes: ['7', '5']
                }
            ],
            idUser: '7',
            likes: ['5', '6', '2'],
            date: new Date("2026-09-06T18:40:00").getTime(),
            title: 'Why practical effects still hit harder than CGI',
            description: 'Rewatched some classic 90s and 2000s sci-fi films this week and the miniatures + real lighting hold up unbelievably well.',
            imgUrl: 'https://picsum.photos/seed/myfeed-cinema-fx/960/600'
        },
        user: USERS[6]
    },
    {
        posts: {
            id: '8',
            comments: [],
            idUser: '5',
            likes: ['3', '7'],
            date: new Date("2026-09-08T09:20:00").getTime(),
            title: 'Late night pixel art session',
            description: 'Trying out a new limited 8-color palette for a small platformer prototype. Way harder than it looks but super relaxing.',
            imgUrl: 'https://picsum.photos/seed/myfeed-pixel-art/960/600'
        },
        user: USERS[4]
    },
    {
        posts: {
            id: '9',
            comments: [
                {
                    id: '9-c1',
                    idUser: '1',
                    replies: [],
                    date: new Date("2026-09-10T12:15:00").getTime(),
                    comment: 'The Bronze Age Collapse is still one of the wildest mysteries ever.',
                    likes: ['6', '5']
                },
                {
                    id: '9-c2',
                    idUser: '7',
                    replies: [],
                    date: new Date("2026-09-10T15:40:00").getTime(),
                    comment: 'Library of Alexandria always makes me sad to think about.',
                    likes: ['6']
                }
            ],
            idUser: '6',
            likes: ['1', '5', '7'],
            date: new Date("2026-09-10T10:00:00").getTime(),
            title: 'Underrated historical events that feel like fiction',
            description: 'History class barely scratches the surface. Share a real historical event that sounds completely made up until you look it up.',
            imgUrl: ''
        },
        user: USERS[5]
    },
    {
        posts: {
            id: '10',
            comments: [],
            idUser: '7',
            likes: ['5', '4'],
            date: new Date("2026-09-12T22:00:00").getTime(),
            title: 'TV shows with a genuinely perfect ending?',
            description: 'So many great series stumble in the final season. Breaking Bad and Dark nailed it — what else belongs on that list?',
            imgUrl: ''
        },
        user: USERS[6]
    },
    {
        posts: {
            id: '11',
            comments: [
                {
                    id: '11-c1',
                    idUser: '3',
                    replies: [],
                    date: new Date("2026-09-14T16:30:00").getTime(),
                    comment: 'Switched to a 75% tactile board last month and never going back.',
                    likes: ['5']
                }
            ],
            idUser: '5',
            likes: ['3', '6', '1'],
            date: new Date("2026-09-14T14:00:00").getTime(),
            title: 'Mechanical keyboards: linear vs tactile for daily typing',
            description: 'Debating whether to build a quiet tactile board for coding or stick with lubed linears. Curious what everyone here prefers.',
            imgUrl: 'https://picsum.photos/seed/myfeed-keyboard/960/600'
        },
        user: USERS[4]
    },
    {
        posts: {
            id: '12',
            comments: [],
            idUser: '6',
            likes: ['7', '5'],
            date: new Date("2026-09-16T08:45:00").getTime(),
            title: 'Reading 20 pages every morning changed my routine',
            description: 'Swapped morning doomscrolling for 20 pages of a physical book with coffee. Best habit I picked up all year.',
            imgUrl: 'https://picsum.photos/seed/myfeed-morning-book/960/600'
        },
        user: USERS[5]
    },
    {
        posts: {
            id: '13',
            comments: [
                {
                    id: '13-c1',
                    idUser: '4',
                    replies: [],
                    date: new Date("2026-09-18T19:20:00").getTime(),
                    comment: 'Interstellar soundtrack while studying hits different.',
                    likes: ['7', '6', '5']
                }
            ],
            idUser: '7',
            likes: ['4', '5', '6'],
            date: new Date("2026-09-18T17:50:00").getTime(),
            title: 'Favorite movie soundtracks to listen to while working',
            description: 'Hans Zimmer, Joe Hisaishi, and Trent Reznor pretty much run my focus playlists. Drop your go-to film scores!',
            imgUrl: ''
        },
        user: USERS[6]
    },
    {
        posts: {
            id: '14',
            comments: [],
            idUser: '5',
            likes: ['2', '6'],
            date: new Date("2026-09-20T15:10:00").getTime(),
            title: 'Co-op games that are actually fun with 2 players',
            description: 'We already beat It Takes Two and Portal 2. Need something fresh for couch co-op this Friday!',
            imgUrl: ''
        },
        user: USERS[4]
    },
    {
        posts: {
            id: '15',
            comments: [
                {
                    id: '15-c1',
                    idUser: '7',
                    replies: [],
                    date: new Date("2026-09-22T11:45:00").getTime(),
                    comment: 'Clean design, no algorithm chaos, just topics I actually picked.',
                    likes: ['6', '5', '1']
                }
            ],
            idUser: '6',
            likes: ['7', '5', '3', '1'],
            date: new Date("2026-09-22T09:30:00").getTime(),
            title: 'Why smaller niche communities feel so much better',
            description: 'When a feed is not trying to outrage you every 5 seconds, talking about books, games, and movies online is actually fun again.',
            imgUrl: ''
        },
        user: USERS[5]
    },
    {
        posts: {
            id: '16',
            comments: [],
            idUser: '7',
            likes: ['5', '3'],
            date: new Date("2026-09-24T20:15:00").getTime(),
            title: 'Weekend cinema watchlist: neo-noir edition',
            description: 'Lining up Chinatown, Nightcrawler, and Memories of Murder for a rainy weekend marathon. Any must-add picks?',
            imgUrl: 'https://picsum.photos/seed/myfeed-neonoir/960/600'
        },
        user: USERS[6]
    },
    {
        posts: {
            id: '17',
            comments: [
                {
                    id: '17-c1',
                    idUser: '6',
                    replies: [],
                    date: new Date("2026-09-26T14:10:00").getTime(),
                    comment: 'Chrono Trigger still holds up effortlessly.',
                    likes: ['5', '3']
                }
            ],
            idUser: '5',
            likes: ['6', '7'],
            date: new Date("2026-09-26T12:00:00").getTime(),
            title: 'Retro consoles you still play in 2026',
            description: 'Pulled out my old handheld this week and ended up playing for 4 hours straight. Nostalgia or just better game design?',
            imgUrl: 'https://picsum.photos/seed/myfeed-retro-console/960/600'
        },
        user: USERS[4]
    },
    {
        posts: {
            id: '18',
            comments: [],
            idUser: '6',
            likes: ['5'],
            date: new Date("2026-09-28T16:40:00").getTime(),
            title: 'Short stories that stayed with you for years',
            description: 'Ted Chiang and Borges pack more ideas into 20 pages than most 600-page trilogies. What is your favorite short story?',
            imgUrl: ''
        },
        user: USERS[5]
    },
    {
        posts: {
            id: '19',
            comments: [
                {
                    id: '19-c1',
                    idUser: '5',
                    replies: [
                        {
                            id: '19-r1',
                            idUser: '7',
                            comment: '100% agree, Spider-Verse proved animation has zero limits.',
                            date: new Date("2026-09-30T19:00:00").getTime(),
                            likes: ['5', '4']
                        }
                    ],
                    date: new Date("2026-09-30T18:15:00").getTime(),
                    comment: 'Studio Ghibli and Spider-Verse are in a league of their own.',
                    likes: ['7', '6']
                }
            ],
            idUser: '7',
            likes: ['5', '6', '4'],
            date: new Date("2026-09-30T17:00:00").getTime(),
            title: 'Animated movies with better cinematography than live-action',
            description: 'Lighting, framing, and color storytelling in modern animation have reached an insane level. Which film blew you away visually?',
            imgUrl: 'https://picsum.photos/seed/myfeed-animated-film/960/600'
        },
        user: USERS[6]
    }
]
