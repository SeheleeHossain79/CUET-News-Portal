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

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async () => {
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // 🔗 Backend endpoint (change later if needed)
      const response = await fetch('http://YOUR_IP_ADDRESS:8000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      Alert.alert('Success', 'Your message has been sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      Alert.alert(
        'Backend not connected',
        'Message saved locally or backend is not running yet.'
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HERO */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Contact Us</Text>
        <Text style={styles.heroSubtitle}>
          We would love to hear from you! Fill out the form below.
        </Text>
      </View>

      {/* FORM */}
      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={formData.name}
            onChangeText={(text) =>
              setFormData({ ...formData, name: text })
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) =>
              setFormData({ ...formData, email: text })
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject *</Text>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={formData.subject}
            onChangeText={(text) =>
              setFormData({ ...formData, subject: text })
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Message *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your message..."
            multiline
            value={formData.message}
            onChangeText={(text) =>
              setFormData({ ...formData, message: text })
            }
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },

  heroSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#001f3f',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#ddd',
    fontSize: 14,
    textAlign: 'center',
  },

  formSection: {
    padding: 20,
  },

  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#001f3f',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#d0d6e0',
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },

  submitButton: {
    backgroundColor: '#001f3f',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
