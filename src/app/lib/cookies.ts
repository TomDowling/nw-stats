import Cookies from "js-cookie";
import { ITradeSkills } from "@/lib";

const COOKIE_NAME = "tradeSkills";

// Default trade skills set to 0
export const defaultTradeSkills: ITradeSkills = {
    mining: 0,
    fishing: 0,
    logging: 0,
    harvesting: 0,
    trackingSkinning: 0,
    smelting: 0,
    stonecutting: 0,
    weaving: 0,
    tanning: 0,
    woodworking: 0,
    weaponsmithing: 0,
    armoring: 0,
    jewelcrafting: 0,
    engineering: 0,
    arcana: 0,
    cooking: 0,
    furnishing: 0
};

// Load trade skills from cookies or initialize to default
export const getTradeSkills = (): ITradeSkills => {
    const cookie = Cookies.get(COOKIE_NAME);
    if (cookie) {
        try {
            return JSON.parse(cookie) as ITradeSkills;
        } catch {
            // If parsing fails, reset to default
            setTradeSkills(defaultTradeSkills);
            return defaultTradeSkills;
        }
    } else {
        setTradeSkills(defaultTradeSkills);
        return defaultTradeSkills;
    }
};

// Save trade skills to cookies
export const setTradeSkills = (skills: ITradeSkills) => {
    Cookies.set(COOKIE_NAME, JSON.stringify(skills), { expires: 365 });
};
