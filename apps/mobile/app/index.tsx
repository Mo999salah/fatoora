import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Fatoora MVP</Text>
      <Text style={styles.title}>Fatoora</Text>
      <Text style={styles.subtitle}>
        Mobile-first invoicing for Arab freelancers.
      </Text>
      <Text style={styles.note}>
        Project foundation is ready. Auth, clients, invoices, and PDF generation
        will be added step by step.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  badge: {
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#E0F2FE',
    color: '#0369A1',
    fontSize: 14,
    fontWeight: '700',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#334155',
    textAlign: 'center',
    marginBottom: 16,
  },
  note: {
    maxWidth: 320,
    fontSize: 14,
    lineHeight: 22,
    color: '#64748B',
    textAlign: 'center',
  },
});
