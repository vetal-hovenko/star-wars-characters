"use client";

import React from "react";

import { useSetNewSearchParams } from "@/lib/hooks/useSetSearchParams";
import { useSearchParams } from "next/navigation";

import { CharactersResponse } from "@/lib/types/Character";
import { PAGE_SEARCH_PARAMETER } from "@/lib/utils/constants";

import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import PageNumber from "./PageNumber";
import PageSwitchButton from "./PageSwitchButton";

interface CharactersPaginationProps {
    currentResponse: CharactersResponse;
}

const ICON_SIZE = 32;

const CharactersPagination = (props: CharactersPaginationProps) => {
    const { currentResponse } = props;

    const params = useSearchParams();
    const setNewParams = useSetNewSearchParams();

    const currentPage = params.get("page") || 1;

    const handlePageSwitch = (isNext?: boolean) => {
        const page = +currentPage + (isNext ? 1 : -1);
        setNewParams(PAGE_SEARCH_PARAMETER, page);
    };

    const isPreviousPageAvailable = +currentPage !== 1;
    // Check if pagination for the next page is possible by checking the 'next' field in the API response.
    const isNextPageAvailable = !!currentResponse && !!currentResponse.next;

    const previousPage = isPreviousPageAvailable ? +currentPage - 1 : null;
    const nextPage = isNextPageAvailable ? +currentPage + 1 : null;

    return (
        <div className="flex items-center gap-8">
            <PageSwitchButton
                isSwitchPossible={isPreviousPageAvailable}
                handlePageSwitch={handlePageSwitch}
                renderIcon={() => <IoCaretBack fontSize={ICON_SIZE} />}
            />

            <div className="flex items-center">
                <PageNumber pageNumber={previousPage} isCurrent={false} />

                <PageNumber pageNumber={+currentPage} isCurrent={true} />

                <PageNumber pageNumber={nextPage} isCurrent={false} />
            </div>

            <PageSwitchButton
                isSwitchPossible={isNextPageAvailable}
                handlePageSwitch={() => handlePageSwitch(true)}
                renderIcon={() => <IoCaretForward fontSize={ICON_SIZE} />}
            />
        </div>
    );
};

export default CharactersPagination;
