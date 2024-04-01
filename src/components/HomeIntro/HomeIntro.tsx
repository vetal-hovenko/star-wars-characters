import { COLOR_YELLOW } from "@/lib/utils/constants";
import Link from "next/link";
import { PiRocketLaunchThin } from "react-icons/pi";

const HomeIntro = () => {
    return (
        <header className="flex flex-col justify-center items-center min-h-screen gap-8">
            <h1 className="lg:text-8xl text-4xl font-bold text-yellow-300">
                Star wars
            </h1>

            <Link
                href="/characters"
                className="flex items-center rocket-container relative flex-col"
            >
                <h3 className="lg:text-3xl text-xl font-bold text-yellow-300">
                    Check out star wars characters
                </h3>

                <div className="opacity-0 rocket">
                    <PiRocketLaunchThin color={COLOR_YELLOW} fontSize={48} />
                </div>
            </Link>
        </header>
    );
};

export default HomeIntro;
