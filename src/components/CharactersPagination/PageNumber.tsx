import React from "react";

interface PageNumberProps {
    pageNumber: number | null;
    isCurrent: boolean;
}

const PageNumber = (props: PageNumberProps) => {
    const { pageNumber, isCurrent } = props;

    return (
        <p className={`${isCurrent ? "" : "opacity-50"} lg:text-2xl text-xl w-6 text-center`}>
            {pageNumber}
        </p>
    );
};

export default PageNumber;
