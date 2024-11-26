import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { db } from "@/lib/firebase"; // Assuming you've set up Firebase
import { doc, getDoc } from "firebase/firestore"; // Firestore imports

type Props = {
    params: Promise<{ uuid: string }>;
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const uuid = (await params).uuid;

    // fetch data
    const docRef = doc(db, "tradeSkills", uuid);
    const docSnap = await getDoc(docRef);

    const item = docSnap.data();

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    console.log("previousImages", previousImages);

    const groupedDescription = Object.entries(item || {}).reduce((acc, [key, value]) => {
        if (!acc[value]) {
            acc[value] = [];
        }
        acc[value].push(key);
        return acc;
    }, {} as { [key: string]: string[] });

    console.log("groupedDescription", groupedDescription);

    const description = Object.entries(groupedDescription)
        .sort(([keyA], [keyB]) => Number(keyB) - Number(keyA))
        .map(([value, keys]) => `${value}: ${keys.join(",")}`)
        .join("\n");

    const dynamicImageUrl = `/api/og/${uuid}`;

    return {
        title: `TITLE_GOES_HERE`,
        description,
        openGraph: {
            images: [dynamicImageUrl]
        }
    };
}

const getData = async (id: string) => {
    const docRef = doc(db, "tradeSkills", id);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
};

export default async function Page({ params }: { params: Promise<{ uuid: string }> }) {
    const uuid = (await params).uuid;
    const data = await getData(uuid);

    console.log("params", uuid);

    console.log("data", data);
    return (
        <div>
            <h1>Test</h1>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {/* {data.map((item) => (
                <div key={item.id}>{item.title}</div> // Adjust according to your data structure
            ))} */}
        </div>
    );
}
