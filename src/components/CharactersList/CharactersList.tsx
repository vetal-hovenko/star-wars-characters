"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Character } from "@/lib/types/Character";
import { Movie } from "@/lib/types/Movie";
import { getAllMovies } from "@/lib/utils/getAllMovies";
import { PAGE_SEARCH_PARAMETER } from "@/lib/utils/constants";

import CharacterItem from "../CharacterItem/CharacterItem";
import Chart from "../Chart/Chart";

interface CharactersListProps {
    characters: Character[];
}

const CharactersList = (props: CharactersListProps) => {
    const { characters } = props;
    const currentPage = useSearchParams().get(PAGE_SEARCH_PARAMETER);

    const [movies, setMovies] = useState<Movie[]>([]);

    const [character, setCharacter] = useState<Character | null>(null);

    useEffect(() => {
        (async () => {
            const { results: movieResults } = await getAllMovies();
            setMovies(movieResults || []);
        })();
    }, []);

    useEffect(() => {
        setCharacter(null);
    }, [currentPage]);

    const moviesByCharacter = useMemo(() => {
        return movies.filter((movie) =>
            character?.films.some((film) => movie.episode_id === film)
        );
    }, [character?.films, movies]);

    return (
        <article className="relative h-4/5 w-full overflow-hidden">
            <ul className="flex flex-col lg:gap-8 gap-4">
                {characters.map((characterFromAPI) => {
                    return (
                        <CharacterItem
                            setCharacter={setCharacter}
                            key={characterFromAPI.name}
                            character={characterFromAPI}
                            selectedCharacter={character}
                        />
                    );
                })}
            </ul>

            {!!character && (
                <Chart
                    setCharacter={setCharacter}
                    movies={moviesByCharacter}
                    character={character}
                />
            )}
        </article>
    );
};

export default CharactersList;
