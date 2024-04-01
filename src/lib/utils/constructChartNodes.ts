import { CSSProperties } from "react";
import { Character } from "../types/Character";
import { Movie } from "../types/Movie";
import { groupStarshipsByMovie } from "./groupStarshipsByMovies";
import { getStarshipById } from "./getStarshipById";

export interface ChartNode {
    id: string;
    position: { x: number; y: number };
    data: { label: string };
    style?: CSSProperties;
}

/**
 * Constructs chart nodes for react flow based on a character and their associated movies.
 * @param character - The character for whom the chart nodes are being constructed.
 * @param movies - An array of movies associated with the character.
 * @returns An array of chart nodes representing the character and associated movies and starships.
 */
export async function constructChartNodes(
    character: Character,
    movies: Movie[]
) {
    const initialCoordinates = { x: 300, y: 300 }; // Center coordinates
    const minRadius = 200;
    const radiusByMovies = 100 * movies.length;
    const radius = Math.max(radiusByMovies, minRadius); // Circle radius
    const angleStep = (2 * Math.PI) / movies.length; // Even parts of the circle

    const nodes: ChartNode[] = [
        {
            ...generateNode(
                "1",
                initialCoordinates.x,
                initialCoordinates.y,
                character.name,
                "yellow"
            ),
        },
    ];

    const starshipsByMovie = await groupStarshipsByMovie(character, movies);

    for (let movieIndex = 0; movieIndex < movies.length; movieIndex++) {
        const currentMovie = movies[movieIndex];

        const moviePosition = calculateNodePosition(
            initialCoordinates,
            radius,
            angleStep,
            movieIndex,
            true
        );

        const moveId = `movie-${(movieIndex + 2).toString()}`;
        const movieName = `Movie: ${currentMovie.title}`;
        const movieColor = "#ce5ef7";

        nodes.push(
            generateNode(
                moveId,
                moviePosition.x,
                moviePosition.y,
                movieName,
                movieColor
            )
        );

        const movieStarships = starshipsByMovie[movieIndex].starships || [];
        const starshipAngleStep =
            (2 * Math.PI) / Math.max(movieStarships.length, 3);
        const starshipRadius = 150;

        for (
            let starshipIndex = 0;
            starshipIndex < movieStarships.length;
            starshipIndex++
        ) {
            const starshipPosition = calculateNodePosition(
                moviePosition,
                starshipRadius,
                starshipAngleStep,
                starshipIndex,
                false
            );

            const ship = await getStarshipById(movieStarships[starshipIndex]);

            if (ship) {
                const shipId = `starship-${movieIndex + 1}-${
                    starshipIndex + 1
                }`;
                const shipName = `Ship: ${ship.name}`;
                const shipColor = "#14b582";

                nodes.push(
                    generateNode(
                        shipId,
                        starshipPosition.x,
                        starshipPosition.y,
                        shipName,
                        shipColor
                    )
                );
            }
        }
    }

    return nodes;
}

/**
 * Generates CSS styles for a chart node based on the provided color.
 * @param color - The color to be applied to the chart node.
 * @returns CSS properties object representing the styles for the chart node.
 */
function generateNodeStyles(color: string): CSSProperties {
    return {
        backgroundColor: "black",
        color,
        borderWidth: 0.5,
        borderColor: color,
    };
}

/**
 * Generates a chart node with the provided parameters.
 * @param id - The unique identifier for the chart node.
 * @param positionX - The x-coordinate of the chart node.
 * @param positionY - The y-coordinate of the chart node.
 * @param name - The label/name associated with the chart node.
 * @param color - The color of the chart node.
 * @returns A ChartNode object representing the generated chart node.
 */
function generateNode(
    id: string,
    positionX: number,
    positionY: number,
    name: string,
    color: string
): ChartNode {
    return {
        id,
        position: { x: positionX, y: positionY },
        data: { label: name },
        style: generateNodeStyles(color),
    };
}

/**
 * Calculate the position of a node based on its index around a center point.
 * For movies, the radius is divided by 2. For starships, the position is adjusted by a factor of 1.2.
 * @param centerPosition - The position of the center point.
 * @param radius - The radius from the center point to the node.
 * @param angleStep - The angle step between each node.
 * @param index - The index of the node.
 * @param isMovie - Indicates whether the node is a movie (true) or a starship (false).
 * @returns The calculated position of the node.
 */
function calculateNodePosition(
    centerPosition: { x: number; y: number },
    radius: number,
    angleStep: number,
    index: number,
    isMovie: boolean
): { x: number; y: number } {
    // Calculate the angle based on the index and angle step
    const angle = index * angleStep;

    const positionXMultiplier = isMovie ? 1 : 1.2;
    const positionYDivider = isMovie ? 2 : 1;

    // Calculate the x and y coordinates of the node
    const nodePositionX =
        (centerPosition.x + radius * Math.cos(angle)) * positionXMultiplier;
    const nodePositionY =
        centerPosition.y + (radius * Math.sin(angle)) / positionYDivider;

    return { x: nodePositionX, y: nodePositionY };
}
