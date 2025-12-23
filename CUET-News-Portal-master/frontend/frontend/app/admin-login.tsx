import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = () => {
    if (!formData.email || !formData.password) return;

    // Simple admin credentials check
    if (formData.email === 'admin@cuet.ac.bd' && formData.password === 'admin123') {
      router.push('/admin-dashboard'); // redirect immediately
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <Header />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}
      >
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Admin Login</Text>

          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="admin@cuet.ac.bd"
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
        </View>
      </KeyboardAvoidingView>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  scrollContent: { paddingBottom: 40 },
  innerContainer: { flex: 1, justifyContent: 'center' },
  formCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 80,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },
  formTitle: { fontSize: 20, fontWeight: 'bold', color: '#001f3f', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', color: '#001f3f', marginBottom: 8 },
  input: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', fontSize: 16, marginBottom: 15 },
  loginButtonCard: { backgroundColor: '#001f3f', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  loginButtonCardText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
