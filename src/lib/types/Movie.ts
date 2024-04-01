export interface Movie {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: number[];
    planets: number[];
    starships: number[];
    vehicles: number[];
    species: number[];
    created: string;
    edited: string;
    url: string;
}

export interface MoviesResponse {
    count: number;
    results: Movie[];
}
