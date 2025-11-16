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

export default function SignUpScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    studentId: '',
    department: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const departments = [
    'Select your department',
    'Computer Science and Engineering (CSE)',
    'Electrical and Electronic Engineering (EEE)',
    'Civil Engineering (CE)',
    'Mechanical Engineering (ME)',
    'Architecture (ARCH)',
    'Urban and Regional Planning (URP)',
    'Water Resources Engineering (WRE)'
  ];

  const handleSignUp = () => {
    if (!formData.email || !formData.studentId || !formData.department || 
        !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }
    if (!formData.agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Terms and Conditions');
      return;
    }
    if (formData.department === 'Select your department') {
      Alert.alert('Error', 'Please select your department');
      return;
    }

    Alert.alert('Success', 'Account created successfully!');
    router.push('/login');
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
            source={require('../assets/images/cuet-logo.png')} // your logo path
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>CUET News Portal</Text>
        </View>

        <View style={styles.taskbar}>
          {/* Dropdown Menu */}
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

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Section */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Account Creation</Text>

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
          <Text style={styles.hintText}>Use your CUET email address</Text>
        </View>

        {/* Student ID */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Student ID *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 2104079"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={formData.studentId}
            onChangeText={(text) => setFormData({...formData, studentId: text})}
          />
        </View>

        {/* Department Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Department *</Text>
          <View style={styles.dropdown}>
            <Text style={[
              styles.dropdownText,
              formData.department === 'Select your department' && styles.placeholderText
            ]}>
              {formData.department || 'Select your department'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </View>
          <ScrollView style={styles.departmentList} horizontal showsHorizontalScrollIndicator={false}>
            {departments.slice(1).map((dept, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.departmentChip,
                  formData.department === dept && styles.selectedDepartmentChip
                ]}
                onPress={() => setFormData({...formData, department: dept})}
              >
                <Text style={[
                  styles.departmentChipText,
                  formData.department === dept && styles.selectedDepartmentChipText
                ]}>
                  {dept.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="Minimum 8 characters"
            placeholderTextColor="#999"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
          />
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password *</Text>
          <TextInput
            style={styles.input}
            placeholder="Re-enter your password"
            placeholderTextColor="#999"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          />
        </View>

        {/* Terms and Conditions */}
        <TouchableOpacity 
          style={styles.termsContainer}
          onPress={() => setFormData({...formData, agreeToTerms: !formData.agreeToTerms})}
        >
          <View style={[
            styles.checkbox,
            formData.agreeToTerms && styles.checkboxChecked
          ]}>
            {formData.agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.link}>Terms and Conditions</Text> and <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Create Account</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.signInLink}>Sign In</Text>
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
  loginButton: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5 },
  loginButtonText: { color: '#001f3f', fontWeight: 'bold' },
  formSection: { padding: 20 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#001f3f', marginBottom: 30, textAlign: 'center' },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#001f3f', marginBottom: 8 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', fontSize: 16, color: '#333' },
  hintText: { fontSize: 12, color: '#666', marginTop: 4, fontStyle: 'italic' },
  dropdown: { backgroundColor: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dropdownText: { fontSize: 16, color: '#333' },
  placeholderText: { color: '#999' },
  dropdownArrow: { color: '#666', fontSize: 12 },
  departmentList: { marginTop: 10, flexDirection: 'row' },
  departmentChip: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#001f3f', marginRight: 8 },
  selectedDepartmentChip: { backgroundColor: '#001f3f' },
  departmentChipText: { color: '#001f3f', fontSize: 12, fontWeight: '500' },
  selectedDepartmentChipText: { color: '#fff' },
  termsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 },
  checkbox: { width: 20, height: 20, borderWidth: 2, borderColor: '#001f3f', borderRadius: 4, marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#001f3f' },
  checkmark: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  termsText: { fontSize: 14, color: '#666', flex: 1, flexWrap: 'wrap' },
  link: { color: '#001f3f', fontWeight: '600' },
  signUpButton: { backgroundColor: '#001f3f', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  signUpButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signInContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  signInText: { fontSize: 14, color: '#666' },
  signInLink: { fontSize: 14, color: '#001f3f', fontWeight: 'bold' },
});


