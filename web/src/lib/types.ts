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
    results: T[] 
};

export type Episode = { 
  id: number; 
  name: string; 
  episode: string 
};

export type CharacterDetail = Character & {
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode: string[];  
};