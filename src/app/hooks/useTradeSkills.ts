import { useTradeSkillsStore } from "@/store";
import Cookies from "js-cookie";
import { db, ITradeSkills } from "@/lib";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";

export const useTradeSkills = () => {
    const { tradeSkills, setTradeSkills } = useTradeSkillsStore();

    const loadSkillsFromCookies = () => {
        const skills = Cookies.get("tradeSkills");
        if (skills) {
            setTradeSkills(JSON.parse(skills));
        }
    };

    const saveSkillsToCookies = (skills: ITradeSkills) => {
        Cookies.set("tradeSkills", JSON.stringify(skills), { expires: 365 });
    };

    const saveSkillsToFirebase = async () => {
        const { uuid, ...skills } = tradeSkills;

        if (uuid) {
            // Update existing document
            const docRef = doc(db, "tradeSkills", uuid);
            await setDoc(docRef, { ...skills });
        } else {
            // Create new document
            const collectionRef = collection(db, "tradeSkills"); // Get the collection
            const newDocRef = doc(collectionRef); // Generate a new document reference
            await setDoc(newDocRef, { ...skills });
            const newUuid = newDocRef.id; // Get the generated ID
            setTradeSkills({ ...tradeSkills, uuid: newUuid });
            saveSkillsToCookies({ ...tradeSkills, uuid: newUuid });
        }
    };

    const loadSkillsFromFirebase = async (uuid: string) => {
        const docRef = doc(db, "tradeSkills", uuid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setTradeSkills({ ...docSnap.data(), uuid } as ITradeSkills);
        }
    };

    return {
        tradeSkills,
        setTradeSkills,
        loadSkillsFromCookies,
        saveSkillsToCookies,
        saveSkillsToFirebase,
        loadSkillsFromFirebase
    };
};
