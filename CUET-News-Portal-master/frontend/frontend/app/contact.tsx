import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = () => {
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Here you can integrate an API or email service
    console.log('Contact form submitted:', formData);

    Alert.alert('Success', 'Your message has been sent!');

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Contact Us</Text>
        <Text style={styles.heroSubtitle}>
          We would love to hear from you! Fill out the form below.
        </Text>
      </View>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#777"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            placeholder="Your email"
            placeholderTextColor="#777"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject *</Text>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            placeholderTextColor="#777"
            value={formData.subject}
            onChangeText={(text) => setFormData({ ...formData, subject: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Message *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Your message..."
            placeholderTextColor="#777"
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            multiline
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },

  heroSection: {
    padding: 20,
    backgroundColor: '#001f3f',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  heroSubtitle: { color: '#ccc', fontSize: 14, textAlign: 'center' },

  formSection: { padding: 20 },

  inputGroup: { marginBottom: 18 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#001f3f', marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#d0d6e0',
  },
  textArea: { minHeight: 120, textAlignVertical: 'top' },

  submitButton: {
    backgroundColor: '#001f3f',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
