export type Character = {
    id: number;
    name: string;
    status: 'Alive' | 'Dead'| 'unknown' | string;
    type: string;
    gender: string;
    image: string;
    episode: string[]; 
};

export type RMPaginated <T> = {
    info: {count: number; pages: number; next: string | null; prev: string | null};
    results: T[];
};