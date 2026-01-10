import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HERO SECTION */}
      <LinearGradient
        colors={['#001f3f', '#0050a0']}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.heroSection}
      >
        <Text style={styles.heroTitle}>About CUET News Portal</Text>
        <Text style={styles.heroSubtitle}>
          Your trusted source for university news, events, and announcements.
        </Text>
      </LinearGradient>

      {/* CONTENT */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.paragraph}>
          The CUET News Portal is designed to provide students, faculty, and staff
          with an easy-to-access platform that centralizes all important academic
          updates, announcements, events, and achievements happening at
          Chittagong University of Engineering & Technology.
        </Text>

        <Text style={styles.paragraph}>
          Our mission is to ensure information reaches the CUET community
          quickly, accurately, and efficiently. Whether it&apos;s academic notices,
          research breakthroughs, administrative updates, or upcoming events —
          everything is available in one place.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        <View style={styles.featureBox}>
          <Text style={styles.featureItem}>• Centralized academic news</Text>
          <Text style={styles.featureItem}>• Research updates and publications</Text>
          <Text style={styles.featureItem}>• Upcoming events and campus activities</Text>
          <Text style={styles.featureItem}>• Student and faculty achievements</Text>
          <Text style={styles.featureItem}>• Real-time search and filtering</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.paragraph}>
          We aim to build a connected and informed campus community by providing
          a digital news ecosystem that enhances transparency, accessibility,
          and engagement.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa'
  },

  heroSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  heroTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  heroSubtitle: {
    color: '#e2e2e2',
    textAlign: 'center',
    fontSize: 14
  },

  section: {
    padding: 20
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001f3f',
    marginBottom: 10
  },

  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
    marginBottom: 12
  },

  featureBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 2
  },
  featureItem: {
    fontSize: 15,
    color: '#333',
    marginVertical: 4
  }
});
