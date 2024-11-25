"use client";

import { useTradeSkills } from "@/hooks";

export default function SkillsPage() {
    const { tradeSkills, saveSkillsToFirebase } = useTradeSkills();

    const handleSave = async () => {
        await saveSkillsToFirebase();
        alert("Skills saved!");
    };

    return (
        <div>
            <h1>Trade Skills</h1>
            <ul>
                {Object.entries(tradeSkills).map(([skill, level]) => (
                    <li key={skill}>
                        {skill}: {level}
                    </li>
                ))}
            </ul>
            <button onClick={handleSave}>Save to Firebase</button>
        </div>
    );
}
