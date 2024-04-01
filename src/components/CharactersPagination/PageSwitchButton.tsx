import React from "react";

interface PageSwitchButtonProps {
    isSwitchPossible: boolean;
    handlePageSwitch: () => void;
    renderIcon: () => React.ReactNode;
}
const PageSwitchButton = (props: PageSwitchButtonProps) => {
    const { handlePageSwitch, isSwitchPossible, renderIcon} = props;
    return (
        <button
            className={`${
                isSwitchPossible
                    ? "opacity-100 hover:scale-130 hover:opacity-70"
                    : "opacity-50"
            }`}
            disabled={!isSwitchPossible}
            onClick={() => handlePageSwitch()}
        >
            {renderIcon()}
        </button>
    );
};

export default PageSwitchButton;
