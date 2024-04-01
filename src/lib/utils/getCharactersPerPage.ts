import axios from "axios";
import { CharactersResponse } from "../types/Character";
import { STAR_WARS_CHARACTERS_API_URL } from "./constants";

/**
 * Used to fetch characters from a specific page.
 * @param pageNumber The page number from which to fetch characters.
 * @returns A promise that resolves with the data containing characters from the specified page.
 */
export async function getCharactersPerPage(
    pageNumber: number
): Promise<CharactersResponse> {
    try {
        // Concatenate the URL to fetch characters from a specific page
        const { data } = await axios.get(STAR_WARS_CHARACTERS_API_URL + pageNumber); 
        return data;
    } catch (error) {
        console.error("Error fetching characters:", error);
        throw error;
    }
}
