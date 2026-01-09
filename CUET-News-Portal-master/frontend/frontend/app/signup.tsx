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

export default function SignUpScreen() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    studentId: '',
    department: 'Select your department',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);

  const departments = [
    'Computer Science and Engineering (CSE)',
    'Electrical and Electronic Engineering (EEE)',
    'Civil Engineering (CE)',
    'Mechanical Engineering (ME)',
    'Architecture (ARCH)',
    'Urban and Regional Planning (URP)',
    'Water Resources Engineering (WRE)',
  ];

  const handleSignUp = async () => {
    if (
      !formData.email ||
      !formData.studentId ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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

    setLoading(true);

    try {
      // 🔗 Backend API (backend dev will give real URL later)
      const response = await fetch('http://YOUR_BACKEND_URL/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          student_id: formData.studentId,
          department: formData.department,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Signup Failed', data.detail || 'Something went wrong');
        return;
      }

      Alert.alert('Success', 'Account created successfully!');
      router.replace('/login');
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
        <Text style={styles.formTitle}>Account Creation</Text>

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

        <Text style={styles.label}>Student ID *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 2104079"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={formData.studentId}
          onChangeText={(text) =>
            setFormData({ ...formData, studentId: text })
          }
        />

        <Text style={styles.label}>Department *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.departmentList}>
          {departments.map((dept, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.departmentChip,
                formData.department === dept && styles.selectedDepartmentChip,
              ]}
              onPress={() =>
                setFormData({ ...formData, department: dept })
              }
            >
              <Text
                style={[
                  styles.departmentChipText,
                  formData.department === dept &&
                    styles.selectedDepartmentChipText,
                ]}
              >
                {dept.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Minimum 8 characters"
          placeholderTextColor="#999"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) =>
            setFormData({ ...formData, password: text })
          }
        />

        <Text style={styles.label}>Confirm Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          placeholderTextColor="#999"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(text) =>
            setFormData({ ...formData, confirmPassword: text })
          }
        />

        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() =>
            setFormData({
              ...formData,
              agreeToTerms: !formData.agreeToTerms,
            })
          }
        >
          <View
            style={[
              styles.checkbox,
              formData.agreeToTerms && styles.checkboxChecked,
            ]}
          >
            {formData.agreeToTerms && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.link}>Terms and Conditions</Text>{' '}
            and <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.signUpButtonText}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

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

  departmentList: { flexDirection: 'row', marginBottom: 15 },

  departmentChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#001f3f',
    marginRight: 8,
    backgroundColor: '#fff',
  },

  selectedDepartmentChip: { backgroundColor: '#001f3f' },

  departmentChipText: {
    color: '#001f3f',
    fontWeight: '500',
    fontSize: 12,
  },

  selectedDepartmentChipText: { color: '#fff' },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#001f3f',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: { backgroundColor: '#001f3f' },

  checkmark: { color: '#fff', fontWeight: 'bold', fontSize: 12 },

  termsText: { fontSize: 14, color: '#666', flex: 1, flexWrap: 'wrap' },

  link: { color: '#001f3f', fontWeight: '600' },

  signUpButton: {
    backgroundColor: '#001f3f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },

  signUpButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  signInText: { fontSize: 14, color: '#666' },

  signInLink: { fontSize: 14, color: '#001f3f', fontWeight: 'bold' },
});
