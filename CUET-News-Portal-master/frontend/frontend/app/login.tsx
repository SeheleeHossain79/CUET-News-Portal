import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // 🔗 Backend API (replace later when backend is ready)
      const response = await fetch('http://YOUR_BACKEND_URL/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Login Failed', data.detail || 'Invalid credentials');
        return;
      }

      Alert.alert('Success', 'Logged in successfully!');
      router.replace('/'); // go to home screen
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }} // space for fixed footer
    >
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Login</Text>

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="student@cuet.ac.bd"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) =>
            setFormData({ ...formData, email: text })
          }
        />

        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) =>
            setFormData({ ...formData, password: text })
          }
        />

        <TouchableOpacity
          style={styles.loginButtonCard}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonCardText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },

  formCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },

  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001f3f',
    marginBottom: 20,
    textAlign: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#001f3f',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    marginBottom: 15,
  },

  loginButtonCard: {
    backgroundColor: '#001f3f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },

  loginButtonCardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signUpText: {
    fontSize: 14,
    color: '#666',
  },

  signUpLink: {
    fontSize: 14,
    color: '#001f3f',
    fontWeight: 'bold',
  },
});
