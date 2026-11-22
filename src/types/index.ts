export interface GlobalContextType {
    navModal: boolean;
    formModal: boolean;
    setNavModal: React.Dispatch<React.SetStateAction<boolean>>;
    setFormModal: React.Dispatch<React.SetStateAction<boolean>>;
    allPosts: AllPostsType[];
    setAllPosts: React.Dispatch<React.SetStateAction<AllPostsType[]>>;
    allUsers: UserDbType[] | null;
    loadingData: boolean;
    popularUsers: UserDbType[];
    loadingPopular: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<{ refresh: boolean; redirectTo: string }>>;
    user: UserDbType | null;
    fetchError: boolean;
}

export type RegisterType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type UserDbType = {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
    dateRegister: string;
};

export type LoginType = Pick<RegisterType, 'email' | 'password'>;

type MainPostProperties = {
    title: string;
    description: string;
};

export type UserFormType = MainPostProperties & Pick<RegisterType, 'name'>;

type GlobalTypesPost = {
    id: string;
    idUser: string;
    date: number;
    likes: string[];
};

export interface ReplyTypes extends GlobalTypesPost {
    comment: string;
}

export interface CommentTypes extends ReplyTypes {
    replies: ReplyTypes[];
}

export interface PostTypes extends GlobalTypesPost, MainPostProperties {
    imgUrl: string | null;
    topic?: string;
    comments: CommentTypes[];
}

export type AllPostsType = {
    user: UserDbType;
    posts: PostTypes;
};
