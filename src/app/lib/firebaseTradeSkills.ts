import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { ITradeSkills } from "@/lib";

// Save trade skills and return the document UUID
export const saveTradeSkills = async (skills: ITradeSkills): Promise<string> => {
    const uuid = crypto.randomUUID();
    const docRef = doc(db, "tradeSkills", uuid);
    await setDoc(docRef, skills);
    return uuid;
};

// Load trade skills by UUID
export const loadTradeSkills = async (uuid: string): Promise<ITradeSkills | null> => {
    const docRef = doc(db, "tradeSkills", uuid);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? (snapshot.data() as ITradeSkills) : null;
};

// Update existing trade skills
export const updateTradeSkills = async (uuid: string, skills: ITradeSkills): Promise<void> => {
    const docRef = doc(db, "tradeSkills", uuid);
    await updateDoc(docRef, skills);
};
