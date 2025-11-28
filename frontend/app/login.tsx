import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    if (formData.password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    Alert.alert('Success', 'Logged in successfully!');
    router.push('/'); // redirect to home page
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/cuet-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>CUET News Portal</Text>
        </View>

        <View style={styles.taskbar}>
          <View>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
              <Text style={styles.dropdownButtonText}>Menu ▼</Text>
            </TouchableOpacity>
            {dropdownVisible && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity onPress={() => router.push('/about')} style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/contact')} style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>Contact</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={styles.signUpButtonHeader}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.signUpButtonHeaderText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Login</Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="student@cuet.ac.bd"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => Alert.alert('Info', 'Reset password flow')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don&apos;t have an account? </Text>
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
  header: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50, 
    paddingBottom: 20, 
    paddingHorizontal: 20,
    backgroundColor: '#001f3f',
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 60, height: 60, marginRight: 10 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  taskbar: { flexDirection: 'row', alignItems: 'center' },
  dropdownButton: { marginRight: 15 },
  dropdownButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  dropdownMenu: { position: 'absolute', top: 30, right: 0, backgroundColor: '#fff', borderRadius: 5, elevation: 5, zIndex: 10 },
  dropdownItem: { padding: 10 },
  dropdownItemText: { color: '#001f3f', fontSize: 14 },
  signUpButtonHeader: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 },
  signUpButtonHeaderText: { color: '#001f3f', fontWeight: 'bold' },
  formSection: { padding: 20 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#001f3f', marginBottom: 30, textAlign: 'center' },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#001f3f', marginBottom: 8 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', fontSize: 16, color: '#333' },
  loginButton: { backgroundColor: '#001f3f', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  forgotPasswordButton: { alignSelf: 'center', marginBottom: 20 },
  forgotPasswordText: { color: '#001f3f', fontWeight: '500' },
  signUpContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signUpText: { fontSize: 14, color: '#666' },
  signUpLink: { fontSize: 14, color: '#001f3f', fontWeight: 'bold' },
});


