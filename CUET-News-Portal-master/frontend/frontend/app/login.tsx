import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    Alert.alert('Success', 'Logged in successfully!');
    router.push('/'); // navigate to welcome/home screen
  };

  return (
    <ScrollView style={styles.container}>
      <Header />

      {/* Form Card */}
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
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />

        <TouchableOpacity style={styles.loginButtonCard} onPress={handleLogin}>
          <Text style={styles.loginButtonCardText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don\t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  formCard: { backgroundColor: '#fff', margin: 20, padding: 20, borderRadius: 12, elevation: 3 },
  formTitle: { fontSize: 20, fontWeight: 'bold', color: '#001f3f', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', color: '#001f3f', marginBottom: 8 },
  input: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', fontSize: 16, marginBottom: 15 },
  loginButtonCard: { backgroundColor: '#001f3f', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  loginButtonCardText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  signUpContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signUpText: { fontSize: 14, color: '#666' },
  signUpLink: { fontSize: 14, color: '#001f3f', fontWeight: 'bold' }
});
