import { Character } from "@/lib/types/Character";
import React from "react";

interface CharacterItemProps {
    character: Character;
    setCharacter: React.Dispatch<React.SetStateAction<Character | null>>;
    selectedCharacter: Character | null;
}

const CharacterItem = (props: CharacterItemProps) => {
    const { character, setCharacter, selectedCharacter } = props;

    return (
        <li>
            <button
                onClick={() => setCharacter(character)}
                className={`w-full text-center lg:text-2xl text-xl character-button ${
                    !!selectedCharacter && "hidden"
                }`}
            >
                {character.name}
            </button>
        </li>
    );
};

export default CharacterItem;
