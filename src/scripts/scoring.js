export const skillLabels = {
  understanding: "Anlama",
  inquiry: "Sorgulama",
  communication: "Iletisim",
  production: "Uretim",
  reflection: "Yansitma",
};

export function createInitialScores() {
  return Object.fromEntries(Object.keys(skillLabels).map((key) => [key, 0]));
}

export function applyMissionScore(state, mission, score) {
  const safeScore = Math.max(0, Math.min(score, mission.maxScore));
  state.score += safeScore;
  state.skills[mission.skill] = Math.min(120, state.skills[mission.skill] + safeScore);
  state.completedMissionIds = Array.from(new Set([...state.completedMissionIds, mission.id]));
  state.unlockedMissionIds = Array.from(new Set([...state.unlockedMissionIds, mission.unlocks].filter(Boolean)));
}

