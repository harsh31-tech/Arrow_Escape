import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { canSlideOff } from '../../logic/canSlideOff';
import { LEVELS, getLevelSegments } from '../../logic/levels';
import { unlockLevel } from '../../logic/progress';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BOARD_PADDING = 24;
const BOARD_SIZE = SCREEN_WIDTH - BOARD_PADDING * 2;

export default function PlaygroundScreen() {
  const router = useRouter();
  const { levelId } = useLocalSearchParams();
  const level = LEVELS.find((l) => l.id === Number(levelId)) || LEVELS[0];
  const cellSize = BOARD_SIZE / level.size;

  const [segments, setSegments] = useState(() => getLevelSegments(level.id));
  const [hearts, setHearts] = useState(level.hearts);
  const [timeLeft, setTimeLeft] = useState(level.timeLimitSec);
  const [status, setStatus] = useState('playing'); // playing | won | lost

  // Timer
  useEffect(() => {
    if (status !== 'playing') return;
    if (timeLeft <= 0) {
      setStatus('lost');
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, status]);

  // Win check + unlock next level
  useEffect(() => {
    if (status === 'playing' && segments.length === 0) {
      setStatus('won');
      unlockLevel(level.id + 1);
    }
  }, [segments, status, level.id]);

  const handleTap = useCallback(
    (segment) => {
      if (status !== 'playing') return;

      if (!canSlideOff(segment, segments, level.size)) {
        setHearts((h) => {
          const next = h - 1;
          if (next <= 0) setStatus('lost');
          return Math.max(0, next);
        });
        return;
      }
      setSegments((prev) => prev.filter((s) => s.id !== segment.id));
    },
    [segments, level.size, status]
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.hearts}>{'❤️'.repeat(hearts)}</Text>
        <Text style={styles.timer}>{timeLeft}s</Text>
      </View>

      <Text style={styles.levelLabel}>Level {level.id}</Text>

      <View style={[styles.board, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
        {Array.from({ length: level.size + 1 }).map((_, i) => (
          <View
            key={`h${i}`}
            style={[styles.gridLineH, { top: i * cellSize, width: BOARD_SIZE }]}
          />
        ))}
        {Array.from({ length: level.size + 1 }).map((_, i) => (
          <View
            key={`v${i}`}
            style={[styles.gridLineV, { left: i * cellSize, height: BOARD_SIZE }]}
          />
        ))}

        {segments.map((seg) => {
          const isHorizontal = seg.direction === 'left' || seg.direction === 'right';
          const width = isHorizontal ? seg.length * cellSize : cellSize;
          const height = isHorizontal ? cellSize : seg.length * cellSize;
          return (
            <Pressable
              key={seg.id}
              onPress={() => handleTap(seg)}
              style={[
                styles.segment,
                {
                  left: seg.col * cellSize,
                  top: seg.row * cellSize,
                  width: width - 4,
                  height: height - 4,
                  backgroundColor: seg.color,
                },
              ]}
            >
              <Text style={styles.trainIcon}>🚂</Text>
            </Pressable>
          );
        })}
      </View>

      {status !== 'playing' && (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>
            {status === 'won' ? 'Level Complete!' : 'Out of Hearts / Time'}
          </Text>
          <Pressable
            style={styles.overlayBtn}
            onPress={() => router.replace('/tabs/levels')}
          >
            <Text style={styles.overlayBtnText}>Back to Levels</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6EC', paddingTop: 60, alignItems: 'center' },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backBtn: { padding: 8 },
  backText: { fontSize: 16, color: '#2D2A32', fontWeight: '600' },
  hearts: { fontSize: 20 },
  timer: { fontSize: 18, fontWeight: '700', color: '#FF7A59' },
  levelLabel: { fontSize: 22, fontWeight: '700', color: '#2D2A32', marginBottom: 16 },
  board: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#E8E0D4',
  },
  gridLineH: { position: 'absolute', height: 1, backgroundColor: '#F0EAE0' },
  gridLineV: { position: 'absolute', width: 1, backgroundColor: '#F0EAE0' },
  segment: {
    position: 'absolute',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  trainIcon: { fontSize: 20 },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(45,42,50,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTitle: { fontSize: 26, fontWeight: '800', color: '#FFF', marginBottom: 20 },
  overlayBtn: {
    backgroundColor: '#FF7A59',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  overlayBtnText: { fontSize: 18, fontWeight: '700', color: '#FFF' },
});