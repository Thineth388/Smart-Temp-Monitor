import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const REPORTS = [
  { id: '1', date: 'Oct 15 - Oct 21', type: 'Weekly Report', status: 'Generated' },
  { id: '2', date: 'Oct 08 - Oct 14', type: 'Weekly Report', status: 'Generated' },
  { id: '3', date: 'Sep 01 - Sep 30', type: 'Monthly Report', status: 'Generated' },
  { id: '4', date: 'Aug 01 - Aug 31', type: 'Monthly Report', status: 'Generated' },
];

export default function ReportsScreen() {
  const handleDownload = (item) => {
    Alert.alert("Download Complete", `The ${item.type} for ${item.date} has been downloaded securely.`);
  };

  const handleCustomReport = () => {
    Alert.alert("Custom Report", "Select the date range to generate a new report. (Coming soon)");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.reportCard} onPress={() => handleDownload(item)}>
      <LinearGradient colors={['#2D2D3F', '#242433']} style={styles.cardGradient}>
        <View style={styles.iconContainer}>
          <Ionicons name="document-text" size={24} color="#2196F3" />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportTitle}>{item.type}</Text>
          <Text style={styles.reportDate}>{item.date}</Text>
        </View>
        <Ionicons name="download-outline" size={24} color="#FF9800" />
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E1E2C', '#12121A']} style={styles.background} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History & Reports</Text>
        <TouchableOpacity style={styles.newReportBtn} onPress={handleCustomReport}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.newReportText}>Custom</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Total Alerts</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>-18.2°</Text>
          <Text style={styles.statLabel}>Avg Temp</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>99%</Text>
          <Text style={styles.statLabel}>Uptime</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent Reports</Text>

      <FlatList
        data={REPORTS}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  newReportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  newReportText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#A0A0B0',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  reportCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reportDate: {
    color: '#888',
    fontSize: 12,
  },
});
