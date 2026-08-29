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
]

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
                            likes: []
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
                }
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
    }
]
