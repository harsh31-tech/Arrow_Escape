import { StyleSheet, Text, View } from 'react-native';

export default function LevelsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Levels</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6EC', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#2D2A32' },
});