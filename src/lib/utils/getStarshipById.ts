import axios from "axios";
import { STAR_WARS_STARSHIP_API_URL } from "./constants";
import { Starship } from "../types/Starship";

/**
 * Function to fetch all starships from the API.
 * @returns A Promise that resolves to a MoviesResponse object containing information about all starships.
 */
export async function getStarshipById(starshipId: number): Promise<Starship> {
    try {
        const { data } = await axios.get(STAR_WARS_STARSHIP_API_URL + starshipId);
        return data;
    } catch (error) {
        console.error("Error fetching starships:", error);
        throw error;
    }
}
