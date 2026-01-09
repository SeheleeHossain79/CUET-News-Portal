import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  bio: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // Empty state – backend will fill this later
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    bio: '',
  });

  const handleSaveProfile = async () => {
    try {
      // 🔌 Backend save will go here later
      setIsEditing(false);
      Alert.alert('Success', 'Profile saved');
    } catch {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const handleLogout = () => {
    // 🔌 Backend logout later
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.profileHeader}>
        <View style={styles.leftSection}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.profileTitle}>Profile</Text>
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profileData.fullName
                ? profileData.fullName
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                : 'U'}
            </Text>
          </View>

          <View>
            <Text style={styles.profileName}>
              {profileData.fullName || 'Your Name'}
            </Text>
            <Text style={styles.profileSubtitle}>Student</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {isEditing ? (
          <>
            {(['fullName', 'email', 'phone', 'department'] as const).map(
              field => (
                <View key={field} style={styles.inputGroup}>
                  <Text style={styles.label}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={profileData[field]}
                    onChangeText={text =>
                      setProfileData({ ...profileData, [field]: text })
                    }
                  />
                </View>
              )
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={profileData.bio}
                multiline
                onChangeText={text =>
                  setProfileData({ ...profileData, bio: text })
                }
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveProfile}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.infoCard}>
            {Object.entries(profileData).map(([key, value]) => (
              <View key={key} style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <Text style={styles.infoValue}>{value || '—'}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  profileHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#001f3f',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001f3f',
  },

  profileCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  },

  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#001f3f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001f3f',
  },

  profileSubtitle: {
    fontSize: 14,
    color: '#666',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginBottom: 20,
  },

  editButton: {
    backgroundColor: '#001f3f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },

  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
  },

  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
  },

  infoRow: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#001f3f',
  },

  infoValue: {
    fontSize: 16,
    color: '#333',
  },

  inputGroup: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#001f3f',
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  saveButton: {
    backgroundColor: '#001f3f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
