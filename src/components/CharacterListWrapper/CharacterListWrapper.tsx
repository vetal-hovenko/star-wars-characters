"use client";

import { CharactersResponse } from "@/lib/types/Character";
import { fetchUniqueCharacters } from "@/lib/utils/fetchUniqueCharacters";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";
import Loader from "../UI/Loader/Loader";
import CharactersList from "../CharactersList/CharactersList";
import CharactersPagination from "../CharactersPagination/CharactersPagination";

const CharacterListWrapper = () => {
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
        <>
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

            <CharactersPagination currentResponse={currentResponse} />
        </>
    );
};

export default CharacterListWrapper;
