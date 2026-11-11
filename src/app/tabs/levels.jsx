import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { LEVELS } from '../../logic/levels';
import { getUnlockedLevel } from '../../logic/progress';

export default function LevelsScreen() {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(1);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getUnlockedLevel().then((value) => {
        if (active) {
          setUnlocked(value);
          setLoading(false);
        }
      });
      return () => {
        active = false;
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Level</Text>

      <FlatList
        data={LEVELS}
        keyExtractor={(item) => String(item.id)}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const locked = item.id > unlocked;
          return (
            <Pressable
              onPress={() =>
                !locked &&
                router.push({
                  pathname: '/tabs/playground',
                  params: { levelId: item.id },
                })
              }
              style={({ pressed }) => [
                styles.tile,
                locked && styles.tileLocked,
                pressed && !locked && styles.tilePressed,
              ]}
            >
              <Text style={locked ? styles.lockIcon : styles.levelNumber}>
                {locked ? '🔒' : item.id}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6EC', paddingTop: 60 },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D2A32',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: { alignItems: 'center', paddingHorizontal: 16, paddingBottom: 40 },
  tile: {
    width: 88,
    height: 88,
    borderRadius: 20,
    backgroundColor: '#FF7A59',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  tileLocked: { backgroundColor: '#D9D2C7', shadowOpacity: 0, elevation: 0 },
  tilePressed: { transform: [{ scale: 0.95 }], opacity: 0.9 },
  levelNumber: { fontSize: 30, fontWeight: '800', color: '#FFFFFF' },
  lockIcon: { fontSize: 28 },
});