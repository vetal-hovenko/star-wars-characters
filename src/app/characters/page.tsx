import React from "react";
import CharacterListWrapper from "@/components/CharacterListWrapper/CharacterListWrapper";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

const CharactersPage = () => {
    return (
        <>
            <header className="p-4 text-xl absolute">
                <Link className="flex items-center gap-2 hover:scale-105" href="/">
                    <IoArrowBackOutline />
                    Go back
                </Link>
            </header>
            <main className="flex flex-col justify-center items-center h-screen">
                <CharacterListWrapper />
            </main>
        </>
    );
};

export default CharactersPage;
