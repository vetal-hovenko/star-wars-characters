import axios from "axios";
import { STAR_WARS_MOVIES_API_URL } from "./constants";
import { MoviesResponse } from "../types/Movie";

/**
 * Function to fetch all Star Wars movies from the API.
 * @returns A Promise that resolves to a MoviesResponse object containing information about all Star Wars movies.
 */
export async function getAllMovies(): Promise<MoviesResponse> {
    try {
        const { data } = await axios.get(STAR_WARS_MOVIES_API_URL);
        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}
