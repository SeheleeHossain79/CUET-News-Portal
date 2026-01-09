import { Stack, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />

      <View style={styles.container}>
        <Header />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
        >
          <Slot />   {/* ALL pages render here */}
          <Footer />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});
