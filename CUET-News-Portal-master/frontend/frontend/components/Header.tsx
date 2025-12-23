import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Header({ isAdminLoggedIn = false }) {
  const router = useRouter();
  const [notifVisible, setNotifVisible] = useState(false);

  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'New research paper published', read: false },
    { id: 'n2', title: 'Tech Fest registration open', read: false },
    { id: 'n3', title: 'Campus Wi-Fi upgraded', read: true },
  ]);

  const notifAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(notifAnim, {
      toValue: notifVisible ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [notifVisible]);

  const notifDropdownHeight = notifAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setNotifVisible(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <LinearGradient
      colors={['#001f3f', '#0050a0']}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.header}
    >
      {/* LEFT SECTION */}
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Image
            source={require('../assets/images/cuet-logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.portalTitle}>CUET News Portal</Text>
          <Text style={styles.uniTitle}>
            Chittagong University of Engineering & Technology
          </Text>
        </View>
      </View>

      {/* RIGHT SECTION */}
      <View style={styles.rightSection}>
        {/* Author Panel */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/admin-panel')}
        >
          <Text style={styles.iconText}>📝</Text>
        </TouchableOpacity>

        {/* Bookmarks */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/bookmarks')}
        >
          <Text style={styles.iconText}>🔖</Text>
        </TouchableOpacity>

        {/* Notification Bell */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setNotifVisible(!notifVisible)}
        >
          <Text style={styles.iconText}>🔔</Text>
          {unreadCount > 0 && (
            <View style={styles.notifBubble}>
              <Text style={styles.notifCount}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Profile */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.iconText}>👤</Text>
        </TouchableOpacity>

        {/* Login */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* NOTIFICATIONS DROPDOWN */}
      <Animated.View style={[styles.notifDropdown, { height: notifDropdownHeight, overflow: 'hidden' }]}>
        <ScrollView contentContainerStyle={{ paddingTop: 5 }}>
          {notifications.map((n, index) => (
            <View
              key={n.id}
              style={[
                styles.notifItem,
                n.read ? styles.notifRead : styles.notifUnread,
                index === 0 ? { borderTopWidth: 0 } : null
              ]}
            >
              <Text>{n.title}</Text>
            </View>
          ))}
          {notifications.length > 0 && (
            <TouchableOpacity
              style={styles.markAllButton}
              onPress={markAllRead}
            >
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          )}
          {notifications.length === 0 && (
            <Text style={styles.noNotifText}>No notifications</Text>
          )}
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 10,
  },
  leftSection: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 65, height: 65, marginRight: 10 },
  portalTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  uniTitle: { color: '#ddd', fontSize: 11, marginTop: 2 },
  rightSection: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginHorizontal: 8 },
  iconText: { fontSize: 22, color: 'white' },
  loginButton: { marginLeft: 10, backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5 },
  loginText: { color: '#001f3f', fontWeight: 'bold' },

  notifDropdown: {
    position: 'absolute',
    top: 70,
    right: 100,
    backgroundColor: '#fff',
    borderRadius: 7,
    width: 220,
    elevation: 6,
    zIndex: 20,
  },
  notifItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    borderTopWidth: 0,
  },
  notifUnread: { backgroundColor: '#eef5ff' },
  notifRead: { backgroundColor: '#fff' },

  markAllButton: {
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
  },
  markAllText: { fontWeight: 'bold', color: '#001f3f' },

  noNotifText: { textAlign: 'center', padding: 10, color: '#666' },

  notifBubble: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifCount: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

