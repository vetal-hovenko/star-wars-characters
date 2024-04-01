import { Starship } from "../types/Starship";
import { getStarshipById } from "./getStarshipById";

export async function getStarshipsByCharacter(starshipIds: number[]) {
    const starships: Starship[] = [];

    for (const starshipId of starshipIds) {
        const starshipFromAPI = await getStarshipById(starshipId);

        if (starshipFromAPI) {
            starships.push(starshipFromAPI);
        }
    }

    return starships;
}