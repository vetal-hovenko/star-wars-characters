import { CharactersResponse } from "../types/Character";
import { getCharactersPerPage } from "./getCharactersPerPage";

/**
 * Fetches unique characters data for a specific page number, utilizing caching to avoid redundant API calls.
 * @param key A string used to identify the cache entry for the specific data being fetched.
 * @param pageNumber The page number from which to fetch characters.
 * @param cacheState The current cache state containing cached characters data.
 * @param setCacheState A function to update the cache state.
 * @returns A promise that resolves with the characters data for the specified page number.
 */
export async function fetchUniqueCharacters(
    key: string,
    pageNumber: number,
    cacheState: Record<string, CharactersResponse>,
    setCacheState: React.Dispatch<React.SetStateAction<Record<string, CharactersResponse>>>,
) {
    // Check if the characters data for the specified key (page number) exists in the cache
    if (cacheState[key]) {
        // If data exists in the cache, return it immediately
        return cacheState[key];
    }

    // If data does not exist in the cache, fetch characters data from the API
    const data = await getCharactersPerPage(pageNumber);
    
    // Update the cache state by adding the fetched characters data for the specified key
    setCacheState({ ...cacheState, [key]: data });

    // Return the fetched characters data
    return data;
}
