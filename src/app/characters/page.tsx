"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import CharactersList from "@/components/CharactersList/CharactersList";
import CharactersPagination from "@/components/CharactersPagination/CharactersPagination";
import { CharactersResponse } from "@/lib/types/Character";
import useSWR from "swr";
import { fetchUniqueCharacters } from "@/lib/utils/fetchUniqueCharacters";
import Loader from "@/components/UI/Loader/Loader";

const Characters = () => {
    const currentPage = useSearchParams().get("page") || 1;

    const [cachedData, setCachedData] = useState<
        Record<string, CharactersResponse>
    >({});

    const cacheKey = `characters-${currentPage}`;

    const { data, error, isLoading } = useSWR(cacheKey, () =>
        fetchUniqueCharacters(cacheKey, +currentPage, cachedData, setCachedData)
    );

    const currentResponse = cachedData[cacheKey];

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <section className="h-3/4 flex flex-col justify-center items-center w-full">
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <p className="text-3xl">
                        We encountered an error while trying to fetch the
                        characters. Please try again later.
                    </p>
                ) : (
                    <CharactersList characters={data ? data.results : []} />
                )}
            </section>

            <CharactersPagination
                currentResponse={currentResponse}
            />
        </main>
    );
};

export default Characters;
