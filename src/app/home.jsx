import { useRouter } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/1024.webp')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Train Maze</Text>
          <Text style={styles.titleAccent}>GO!</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.playButton,
            pressed && styles.playButtonPressed,
          ]}
          onPress={() => router.push('/tabs/levels')}
        >
          <Text style={styles.playText}>Play</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 120,
    backgroundColor: 'rgba(253, 246, 236, 0.15)',
  },
  titleWrap: { alignItems: 'center' },
  title: { fontSize: 44, fontWeight: '800', color: colors.text, letterSpacing: 1 },
  titleAccent: { fontSize: 44, fontWeight: '800', color: colors.accent, letterSpacing: 1 },
  playButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 64,
    paddingVertical: 18,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  playButtonPressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
  playText: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', letterSpacing: 1 },
});