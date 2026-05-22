import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ onLogout }) {
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [offlineAlerts, setOfflineAlerts] = useState(true);

  const handlePress = (title, message) => {
    Alert.alert(title, message, [{ text: 'OK' }]);
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", onPress: onLogout, style: "destructive" }
    ]);
  };

  const SettingRow = ({ icon, title, subtitle, value, onValueChange }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={22} color="#fff" />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#FF9800' }}
        thumbColor={value ? '#fff' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1E1E2C', '#12121A']} style={styles.background} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Settings</Text>

        <Text style={styles.sectionHeader}>Alert Configurations</Text>
        <View style={styles.card}>
          <SettingRow 
            icon="logo-whatsapp" 
            title="WhatsApp Alerts" 
            subtitle="Get notified instantly on WhatsApp"
            value={whatsappAlerts} 
            onValueChange={setWhatsappAlerts} 
          />
          <View style={styles.divider} />
          <SettingRow 
            icon="chatbubble-outline" 
            title="SMS Alerts" 
            subtitle="Fallback SMS for critical alerts"
            value={smsAlerts} 
            onValueChange={setSmsAlerts} 
          />
          <View style={styles.divider} />
          <SettingRow 
            icon="wifi-outline" 
            title="Offline Alerts" 
            subtitle="When device loses connection"
            value={offlineAlerts} 
            onValueChange={setOfflineAlerts} 
          />
        </View>

        <Text style={styles.sectionHeader}>Thresholds</Text>
        <TouchableOpacity style={styles.card} onPress={() => handlePress('Temperature Limits', 'Opening threshold settings. You can set the minimum and maximum allowed temperatures here.')}>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.settingIcon, { backgroundColor: 'rgba(244, 67, 54, 0.2)' }]}>
              <Ionicons name="thermometer" size={22} color="#F44336" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Temperature Limits</Text>
              <Text style={styles.settingSubtitle}>Min: -25°C | Max: -15°C</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Account</Text>
        <TouchableOpacity style={styles.card} onPress={() => handlePress('Profile & Access', 'Managing user roles and device access permissions.')}>
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.settingIcon, { backgroundColor: 'rgba(156, 39, 176, 0.2)' }]}>
              <Ionicons name="person" size={22} color="#9C27B0" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Profile & Access</Text>
              <Text style={styles.settingSubtitle}>Manage your account details</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0A0B0',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginLeft: 66,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 20,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(244, 67, 54, 0.3)',
  },
  logoutText: {
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});
