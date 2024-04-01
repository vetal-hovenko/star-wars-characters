import { usePathname, useSearchParams, useRouter } from "next/navigation";

/**
 * Custom hook for managing URL search parameters conveniently.
 * @returns {Function} setNewParams - Function to update URL parameters.
 */
export const useSetNewSearchParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Check if all required hooks are initialized properly, throw error if not
    if (!router || !pathname || !searchParams) {
        throw new Error(
            "Failed to initialize required Next.js hooks (useRouter, usePathname, useSearchParams) within the useSetNewSearchParams hook."
        );
    }

    const setNewParams = (key: string, value: string | number) => {
        // Create a new URLSearchParams object from the current search parameters
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        current.set(key, value.toString()); // Set or update the specified key with the provided value

        const search = current.toString();

        const query = search ? `?${search}` : ""; // Format the query string to be appended to the URL

        // Update the route with the new pathname and search parameters, without scrolling
        router.push(`${pathname}${query}`, { scroll: false });
    };

    // Return the function for updating search parameters
    return setNewParams;
};
