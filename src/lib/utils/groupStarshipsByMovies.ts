import { Character } from "../types/Character";
import { Movie } from "../types/Movie"

export async function groupStarshipsByMovie(
    character: Character,
    movies: Movie[]
) {
    const starshipByMovie = [];

    for (const movie of movies) {
        const movieStarships = movie.starships.filter((ship) =>
            character.starships.includes(ship)
        );

        const movieObject = {
            name: movie.title,
            starships: movieStarships,
        };

        starshipByMovie.push(movieObject);
    }

    return starshipByMovie;
}

