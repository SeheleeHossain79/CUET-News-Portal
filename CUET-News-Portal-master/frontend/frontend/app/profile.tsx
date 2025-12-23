import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '../components/Footer'; // Shared footer
import Header from '../components/Header'; // Shared header

// Define the profile data type
interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  bio: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'Ahmed Hassan',
    email: 'ahmed.hassan@cuet.ac.bd',
    phone: '+880 1712-345678',
    department: 'Computer Science & Engineering',
    bio: 'Passionate about AI and Machine Learning. Active member of CUET Programming Club.'
  });

  const handleSaveProfile = (): void => {
    setIsEditing(false);
    // TODO: Save profile logic
  };

  const handleLogout = (): void => {
   router.push('/'); 
  };

  const handleBackToHome = (): void => {
    router.push('/'); // Redirect to homepage
  };

  return (
    <ScrollView style={styles.container}>
      {/* Shared Header */}
      <Header />

      {/* Profile Header Section - Below Main Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileTopBar}>
          <View style={styles.leftSection}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.profileTitle}>Profile</Text>
          </View>
        </View>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profileData.fullName.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.fullName}</Text>
            <Text style={styles.profileSubtitle}>Student ID: 2104079</Text>
          </View>
        </View>

        {/* Edit and Logout Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Information */}
        {isEditing ? (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={profileData.fullName}
                onChangeText={(text: string) => setProfileData({ ...profileData, fullName: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={profileData.email}
                onChangeText={(text: string) => setProfileData({ ...profileData, email: text })}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={profileData.phone}
                onChangeText={(text: string) => setProfileData({ ...profileData, phone: text })}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Department</Text>
              <TextInput
                style={styles.input}
                value={profileData.department}
                onChangeText={(text: string) => setProfileData({ ...profileData, department: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={profileData.bio}
                onChangeText={(text: string) => setProfileData({ ...profileData, bio: text })}
                multiline
                numberOfLines={3}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{profileData.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{profileData.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{profileData.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Department</Text>
              <Text style={styles.infoValue}>{profileData.department}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Bio</Text>
              <Text style={styles.infoValue}>{profileData.bio}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Shared Footer */}
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f6fa' 
  },

  // Profile Header Section - Below Main Header
  profileHeader: {
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2
  },
  profileTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#001f3f',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001f3f'
  },

  // Profile Card
  profileCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    marginTop: 0
  },
  profileTop: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#001f3f', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  avatarText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  profileInfo: { 
    flex: 1 
  },
  profileName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#001f3f', 
    marginBottom: 4 
  },
  profileSubtitle: { 
    fontSize: 14, 
    color: '#666' 
  },

  // Buttons - Now both Edit and Logout are together
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    gap: 10,
    marginBottom: 20 
  },
  editButton: { 
    backgroundColor: '#001f3f', 
    paddingHorizontal: 20,
    paddingVertical: 10, 
    borderRadius: 6 
  },
  editButtonText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 14
  },
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#dc3545',
    borderRadius: 6
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  },

  // Info Card
  infoCard: { 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10, 
    padding: 15 
  },
  infoRow: { 
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  infoLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#001f3f',
    marginBottom: 5
  },
  infoValue: { 
    fontSize: 16, 
    color: '#333', 
    lineHeight: 22 
  },

  // Form elements
  inputGroup: { 
    marginBottom: 15 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#001f3f', 
    marginBottom: 6 
  },
  input: { 
    backgroundColor: '#fff', 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    fontSize: 16 
  },
  textArea: { 
    height: 80, 
    textAlignVertical: 'top' 
  },

  saveButton: { 
    backgroundColor: '#001f3f', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  saveButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  }
});