"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; // For unwrapping promises in Next.js App Router
import { db } from "@/lib/firebase"; // Assuming you've set up Firebase
import { doc, getDoc } from "firebase/firestore"; // Firestore imports
import Head from "next/head";

interface IParams {
    uuid: string;
}

interface ITradeSkills {
    mining: number;
    woodworking: number;
    weaponsmithing: number;
    armoring: number;
    engineering: number;
    cooking: number;
    fishing: number;
    jewelcrafting: number;
    arcana: number;
    crafting: number;
    furnishing: number;
    cooking_specialties: string[]; // Make sure it's an array
}

const TradeSkillsPage = ({ params }: { params: Promise<IParams> }) => {
    const router = useRouter();
    const { uuid } = use(params); // Unwrap the params using `use()`
    const [skills, setSkills] = useState<ITradeSkills | null>(null);

    useEffect(() => {
        if (!uuid) {
            router.push("/skills"); // Redirect to the main skills page if no UUID is provided
        } else {
            const fetchSkills = async () => {
                try {
                    const docRef = doc(db, "tradeSkills", uuid); // Fetch document from Firestore
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const fetchedSkills = docSnap.data() as ITradeSkills;
                        // Ensure cooking_specialties is always an array
                        setSkills({
                            ...fetchedSkills,
                            cooking_specialties: Array.isArray(fetchedSkills.cooking_specialties) ? fetchedSkills.cooking_specialties : [] // Default to an empty array if not an array
                        });
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching document:", error);
                }
            };

            fetchSkills();
        }
    }, [uuid, router]);

    return (
        <>
            <Head>
                <title>{skills ? `Trade Skills: ${skills.mining}` : "Trade Skills"}</title>
                <meta name="description" content="Check out my trade skills in New World!" />
                <meta property="og:title" content={`New World Trade Skills`} />
                <meta property="og:description" content={`My current trade skill levels in New World.`} />
                <meta property="og:image" content="/default-thumbnail.jpg" /> {/* You can set a dynamic image here */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://your-site.com/skills/${uuid}`} />
                {/* Optional: Adding individual trade skill meta */}
                {skills && (
                    <>
                        <meta property="og:tradeSkills" content={`Mining: ${skills.mining}, Weaponsmithing: ${skills.weaponsmithing}`} />
                        <meta property="twitter:title" content={`New World Trade Skills`} />
                        <meta
                            property="twitter:description"
                            content={`My trade skills: Mining - ${skills.mining}, Weaponsmithing - ${skills.weaponsmithing}`}
                        />
                        <meta property="twitter:image" content="/default-thumbnail.jpg" /> {/* Same here */}
                    </>
                )}
            </Head>
            <h1>Trade Skills</h1>
            {skills ? (
                <div>
                    <h2>Skills for UUID: {uuid}</h2>
                    <ul>
                        <li>Mining: {skills.mining}</li>
                        <li>Woodworking: {skills.woodworking}</li>
                        <li>Weaponsmithing: {skills.weaponsmithing}</li>
                        <li>Armoring: {skills.armoring}</li>
                        <li>Engineering: {skills.engineering}</li>
                        <li>Cooking: {skills.cooking}</li>
                        <li>Fishing: {skills.fishing}</li>
                        <li>Jewelcrafting: {skills.jewelcrafting}</li>
                        <li>Arcana: {skills.arcana}</li>
                        <li>Crafting: {skills.crafting}</li>
                        <li>Furnishing: {skills.furnishing}</li>
                        <li>
                            Cooking Specialties: {skills.cooking_specialties.length > 0 ? skills.cooking_specialties.join(", ") : "None"}
                        </li>
                    </ul>
                </div>
            ) : (
                <p>Loading skills...</p>
            )}
        </>
    );
};

export default TradeSkillsPage;
