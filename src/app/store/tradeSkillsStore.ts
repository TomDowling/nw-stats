import { create } from "zustand";
import { defaultTradeSkills, ITradeSkills } from "@/lib";

interface ITradeSkillsState {
    tradeSkills: ITradeSkills;
    setTradeSkills: (skills: ITradeSkills) => void;
}

export const useTradeSkillsStore = create<ITradeSkillsState>((set) => ({
    tradeSkills: defaultTradeSkills,
    setTradeSkills: (skills) => set({ tradeSkills: skills })
}));
