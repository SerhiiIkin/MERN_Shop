export interface IProducts {
    _id?: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface AuthState {
    error: string;
    token: string;
    isAuth: boolean;
    username: string;
}

export interface AuthPayload {
    username: string;
    token: string;
    role:string
}

export interface AuthPayloadRegister {
    message: string;
}

export interface IComments {
    postId: string;
    _id?: string;
    username: string;
    body: string;
    date: string;
}
