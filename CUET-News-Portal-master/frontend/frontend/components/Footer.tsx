import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Footer() {
  const router = useRouter();

  const openLink = (url: string) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) Linking.openURL(url);
      })
      .catch((err) => console.error('Error opening URL', err));
  };

  return (
    <View style={styles.footer}>
      {/* Upper Section: Contact & About */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => router.push('/contact')}>
          <Text style={styles.topLink}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/about')}>
          <Text style={styles.topLink}>About Us</Text>
        </TouchableOpacity>
      </View>

      {/* Middle Section: Quick Links */}
      <View style={styles.quickLinks}>
        <TouchableOpacity onPress={() => openLink('https://www.cuet.ac.bd')}>
          <Text style={styles.quickLink}>Official Website</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.cuet.ac.bd/privacy-policy')}>
          <Text style={styles.quickLink}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.cuet.ac.bd/terms-of-service')}>
          <Text style={styles.quickLink}>Terms of Service</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Section: Copyright */}
      <Text style={styles.copyright}>
        © 2025 CUET News Portal. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#001f3f',
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  topLink: {
    color: '#ffffff',
    fontSize: 14,
    marginHorizontal: 15,
    textDecorationLine: 'underline',
  },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  quickLink: {
    color: '#4da6ff',
    fontSize: 13,
    marginHorizontal: 10,
    marginVertical: 3,
    textDecorationLine: 'underline',
  },
  copyright: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
});
