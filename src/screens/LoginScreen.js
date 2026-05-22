import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }
    
    // Accept admin/admin12345 or any other combination as requested
    if (username === 'admin' && password === 'admin12345') {
      Alert.alert('Success', 'Welcome Admin!');
    } else {
      Alert.alert('Success', `Welcome ${username}!`);
    }
    
    onLogin();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E1E2C', '#12121A']}
        style={styles.background}
      />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="thermometer-outline" size={80} color="#FF9800" />
        </View>
        <Text style={styles.title}>Smart Temp</Text>
        <Text style={styles.subtitle}>Critical Environment Monitoring</Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Email or Username (e.g. admin)" 
            placeholderTextColor="#888" 
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput 
            style={styles.input} 
            placeholder="Password (e.g. admin12345)" 
            placeholderTextColor="#888" 
            secureTextEntry 
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <LinearGradient
            colors={['#FF9800', '#F57C00']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    padding: 30,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 10,
    padding: 20,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    width: width - 60,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    width: width - 60,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
