import type { Metadata } from "next";

import Main from "../pageComponents/Main";

export const metadata: Metadata = {
    title: "myfeed | Your interests, zero noise",
    description: "Explore, share, and express what you want with everyone",
}; 

export default function Home() {
    return <Main />;
}
