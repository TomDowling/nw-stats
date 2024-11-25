"use client";

import { useEffect } from "react";
import localFont from "next/font/local";
import Cookies from "js-cookie";
import { useTradeSkills } from "@/hooks";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900"
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const { loadSkillsFromCookies, tradeSkills, saveSkillsToCookies } = useTradeSkills();

    useEffect(() => {
        if (!Cookies.get("tradeSkills")) {
            saveSkillsToCookies(tradeSkills); // Initialize cookies if none exist
        } else {
            loadSkillsFromCookies(); // Load from cookies
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    }, []);

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
        </html>
    );
}
