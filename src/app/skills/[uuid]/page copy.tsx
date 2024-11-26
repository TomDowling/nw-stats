import { GetServerSideProps } from "next";
import React from "react";
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

interface TradeSkillsPageProps {
    uuid: string;
    skills: ITradeSkills | null;
}

const TradeSkillsPage: React.FC<TradeSkillsPageProps> = ({ uuid, skills }) => {
    return (
        <div>
            <Head>
                <title>Trade Skills for {uuid}</title>
                <meta name="description" content={`Trade skills for UUID: ${uuid}`} />
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
                <p>No skills found for UUID: {uuid}</p>
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { uuid } = context.params as IParams;

    if (!uuid) {
        return {
            redirect: {
                destination: "/skills",
                permanent: false
            }
        };
    }

    try {
        const docRef = doc(db, "tradeSkills", uuid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const fetchedSkills = docSnap.data() as ITradeSkills;
            // Ensure cooking_specialties is always an array
            const skills: ITradeSkills = {
                ...fetchedSkills,
                cooking_specialties: Array.isArray(fetchedSkills.cooking_specialties) ? fetchedSkills.cooking_specialties : []
            };
            return {
                props: {
                    uuid,
                    skills
                }
            };
        } else {
            console.log("No such document!");
            return {
                props: {
                    uuid,
                    skills: null
                }
            };
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        return {
            props: {
                uuid,
                skills: null
            }
        };
    }
};

export default TradeSkillsPage;
