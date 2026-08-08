export const getLevelData = (xp = 0) => {
  xp = Number(xp) || 0;

  const XP_PER_LEVEL = 200;

  const level = Math.floor(xp / XP_PER_LEVEL) + 1;

  const currentLevelXP = (level - 1) * XP_PER_LEVEL;

  const progress = ((xp - currentLevelXP) / XP_PER_LEVEL) * 100;

  const remaining = XP_PER_LEVEL - (xp - currentLevelXP);

  return {
    level,
    progress,
    remaining,
  };
};
