"use client";

import React, { useEffect, useMemo, useState } from "react";
import ReactFlow, { Edge } from "reactflow";
import "reactflow/dist/style.css";

import { Character } from "@/lib/types/Character";
import { Movie } from "@/lib/types/Movie";

import { constructChartNodes, ChartNode } from "../../lib/utils/constructChartNodes";
import Loader from "../UI/Loader/Loader";


interface ChartProps {
    character: Character;
    movies: Movie[];
    setCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
}

const Chart = (props: ChartProps) => {
    const { character, movies, setCharacter } = props;

    const [nodes, setNodes] = useState<ChartNode[]>([]);

    useEffect(() => {
        const asyncConstructNodes = async() => {
            const nodesResult = await constructChartNodes(character, movies);

            setNodes(nodesResult);
        }

        asyncConstructNodes();
    }, [character, movies])

    const edges = useMemo(() => {
        let movieNode = "";
        return nodes.slice(1).map((node) => {
            const { id } = node;
            const edgeId = `e1-${id}`;

            const isMovieNode = id.includes("movie");

            const edge: Edge = {id: edgeId, target: id, source: "1", style: { stroke: "#93dffa"}}

            if (isMovieNode) {
                movieNode = id;
                return edge;
            } else {
                return {...edge, source: movieNode};
            }
        });
    }, [nodes]);

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col gap-2 items-center justify-center">
            <button className="text-xl hover:scale-110" onClick={() => setCharacter(null)}>
                Back to the list
            </button>
            <div className="lg:w-[800px] lg:h-[800px] w-80 h-80 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                {nodes.length && edges.length ? <ReactFlow nodes={nodes} edges={edges} /> : <Loader />}
            </div>
        </div>
    );
};

export default Chart;
