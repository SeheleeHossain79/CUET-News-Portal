import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import React from 'react';

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* FIXED HEADER */}
      <Header />

      {/* SCROLLING PAGES */}
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="admin-panel" />
          <Stack.Screen name="bookmarks" />
        </Stack>
      </View>

      {/* FIXED FOOTER */}
      <Footer />

      <StatusBar style="auto" />
    </View>
  );
}
