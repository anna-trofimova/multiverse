export type Character = {
  id: number; 
  name: string; 
  status: string; 
  species: string; 
  image: string;
};

export type RMPaginated<T> = { 
    info: { 
        count: number; 
        pages: number; 
        next: string|null; 
        prev: string|null }, 
    results: T[] };
