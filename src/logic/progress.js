import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'trainmaze.progress';

export async function getUnlockedLevel() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) return JSON.parse(raw).unlocked ?? 1;
  } catch (e) {}
  return 1;
}

export async function unlockLevel(levelId) {
  try {
    const current = await getUnlockedLevel();
    if (levelId > current) {
      await AsyncStorage.setItem(KEY, JSON.stringify({ unlocked: levelId }));
    }
  } catch (e) {}
}