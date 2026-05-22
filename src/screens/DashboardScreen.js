import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  const [currentTemp, setCurrentTemp] = useState(-18.5);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [chartData, setChartData] = useState([-19, -20, -18.5, -17.5, -18, -18.5]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live temperature changing slightly
      setCurrentTemp((prev) => {
        const change = (Math.random() * 0.4) - 0.2; // +/- 0.2
        return parseFloat((prev + change).toFixed(1));
      });

      // Occasional chart update to show live flow
      if (Math.random() > 0.7) {
        setChartData((prev) => {
          const newData = [...prev.slice(1), currentTemp];
          return newData;
        });
      }
    }, 2000); // update every 2 seconds

    return () => clearInterval(interval);
  }, [currentTemp]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E1E2C', '#12121A']} style={styles.background} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Device Overview</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>

        {/* Temperature Card */}
        <LinearGradient colors={['#2D2D3F', '#242433']} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Current Temperature</Text>
            <Ionicons name="thermometer" size={24} color="#FF9800" />
          </View>
          <View style={styles.tempContainer}>
            <Text style={styles.tempText}>{currentTemp}°C</Text>
            <Text style={styles.targetText}>Target: -20°C</Text>
          </View>
          <View style={styles.progressBarBg}>
            <LinearGradient colors={['#4CAF50', '#8BC34A']} style={[styles.progressBar, {width: '80%'}]} />
          </View>
        </LinearGradient>

        {/* Info Cards Row */}
        <View style={styles.row}>
          <LinearGradient colors={['#2D2D3F', '#242433']} style={[styles.smallCard, { marginRight: 10 }]}>
            <Ionicons name="location" size={24} color="#2196F3" />
            <Text style={styles.smallCardTitle}>Location</Text>
            <Text style={styles.smallCardValue}>6.927° N, 79.861° E</Text>
            <Text style={styles.smallCardSub}>Updated just now</Text>
          </LinearGradient>
          
          <LinearGradient colors={['#2D2D3F', '#242433']} style={[styles.smallCard, { marginLeft: 10 }]}>
            <Ionicons name="battery-charging" size={24} color="#4CAF50" />
            <Text style={styles.smallCardTitle}>Power (24V DC)</Text>
            <Text style={styles.smallCardValue}>{batteryLevel}%</Text>
            <Text style={styles.smallCardSub}>Charging</Text>
          </LinearGradient>
        </View>

        {/* Quick Chart */}
        <LinearGradient colors={['#2D2D3F', '#242433']} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Live Trend</Text>
            <Ionicons name="analytics" size={24} color="#9C27B0" />
          </View>
          <LineChart
            data={{
              labels: ["10m", "8m", "6m", "4m", "2m", "Now"],
              datasets: [
                {
                  data: chartData
                }
              ]
            }}
            width={width - 70} // from react-native
            height={180}
            yAxisSuffix="°C"
            chartConfig={{
              backgroundColor: '#2D2D3F',
              backgroundGradientFrom: '#2D2D3F',
              backgroundGradientTo: '#2D2D3F',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: "4", strokeWidth: "2", stroke: "#FF9800" }
            }}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
          />
        </LinearGradient>

      </ScrollView>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 12,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    color: '#A0A0B0',
    fontSize: 16,
    fontWeight: '600',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 15,
  },
  tempText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  targetText: {
    color: '#888',
    fontSize: 14,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  smallCard: {
    flex: 1,
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  smallCardTitle: {
    color: '#A0A0B0',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  smallCardValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  smallCardSub: {
    color: '#888',
    fontSize: 12,
  },
});
