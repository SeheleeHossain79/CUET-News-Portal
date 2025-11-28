import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const handleDropdownNavigation = (page: string) => {
    setDropdownVisible(false);
    if (page === 'About Us') router.push('/about');
    if (page === 'Contact') router.push('/contact');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Centered Logo and Title */}
        <View style={styles.centerLogoContainer}>
          <Image
            source={require('../assets/images/cuet-logo.png')}
            style={styles.centerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>CUET News Portal</Text>
        </View>

        {/* Right Side Buttons */}
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.dropdownButton} 
            onPress={toggleDropdown}
          >
            <Text style={styles.loginHeaderText}>Menu ▼</Text>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity 
                style={styles.dropdownItem} 
                onPress={() => handleDropdownNavigation('About Us')}
              >
                <Text>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.dropdownItem} 
                onPress={() => handleDropdownNavigation('Contact')}
              >
                <Text>Contact</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity 
            style={styles.loginHeaderButton} 
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginHeaderText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.title}>CUET News Portal</Text>
        <Text style={styles.subtitle}>
          Your centralized hub for all university news, events, and announcements.
        </Text>
        <View style={styles.searchContainer}>
          <Text style={styles.searchPlaceholder}>Search news, events, announcements...</Text>
        </View>
      </View>

      {/* Navigation Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>All News</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Academic</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Events</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Research</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Achievements</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab}><Text style={styles.tabText}>Administrative</Text></TouchableOpacity>
      </ScrollView>

      {/* Featured News Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured News</Text>
        <View style={styles.featuredCard}>
          <Text style={styles.featuredCategory}>Academic</Text>
          <Text style={styles.featuredTitle}>
            Mid-Term Examination Schedule Announced for Fall 2025
          </Text>
          <Text style={styles.featuredDate}>2025-11-12</Text>
          <Text style={styles.featuredAuthor}>Academic Section</Text>
        </View>
      </View>

      {/* Latest News Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Latest News</Text>

        <View style={styles.newsItem}>
          <View style={styles.newsHeader}>
            <Text style={styles.newsCategory}>Academic</Text>
            <Text style={styles.newsDate}>2025-11-12</Text>
          </View>
          <Text style={styles.newsTitle}>Mid-Term Examination Schedule Announced for Fall 2025</Text>
          <Text style={styles.newsDescription}>
            The mid-term examination schedule for all departments has been published. Students are requested to check their respective departmental notice boards.
          </Text>
          <Text style={styles.newsAuthor}>By Academic Section</Text>
          <TouchableOpacity><Text style={styles.readMore}>Read More</Text></TouchableOpacity>
        </View>

        <View style={styles.newsItem}>
          <View style={styles.newsHeader}>
            <Text style={styles.newsCategory}>Events</Text>
            <Text style={styles.newsDate}>2025-11-10</Text>
          </View>
          <Text style={styles.newsTitle}>CUET Annual Tech Fest 2025 - Registration Open</Text>
          <Text style={styles.newsDescription}>
            The Department of CSE invites all students to participate in the annual tech fest featuring hackathons, workshops, and tech talks.
          </Text>
          <Text style={styles.newsAuthor}>By CSE Department</Text>
          <TouchableOpacity><Text style={styles.readMore}>Read More</Text></TouchableOpacity>
        </View>

        <View style={styles.newsItem}>
          <View style={styles.newsHeader}>
            <Text style={styles.newsCategory}>Research</Text>
            <Text style={styles.newsDate}>2025-11-08</Text>
          </View>
          <Text style={styles.newsTitle}>Research Paper Published in IEEE Conference</Text>
          <Text style={styles.newsDescription}>
            Dr. Rahman and team have published their research on Machine Learning applications in healthcare at the IEEE International Conference.
          </Text>
          <Text style={styles.newsAuthor}>By Research Office</Text>
          <TouchableOpacity><Text style={styles.readMore}>Read More</Text></TouchableOpacity>
        </View>
      </View>

      {/* Upcoming Events Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <View style={styles.eventItem}>
          <Text style={styles.eventTitle}>Tech Fest 2025</Text>
          <Text style={styles.eventDate}>2025-11-25</Text>
          <Text style={styles.eventLocation}>Main Auditorium</Text>
        </View>
        <View style={styles.eventItem}>
          <Text style={styles.eventTitle}>Career Fair</Text>
          <Text style={styles.eventDate}>2025-12-05</Text>
          <Text style={styles.eventLocation}>Sports Complex</Text>
        </View>
        <View style={styles.eventItem}>
          <Text style={styles.eventTitle}>Research Symposium</Text>
          <Text style={styles.eventDate}>2025-12-15</Text>
          <Text style={styles.eventLocation}>Conference Hall</Text>
        </View>
        <TouchableOpacity style={styles.viewAllButton}><Text style={styles.viewAllText}>View All Events</Text></TouchableOpacity>
      </View>

      {/* Quick Links Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.linksContainer}>
          <Text style={styles.link}>Academic Calendar</Text>
          <Text style={styles.link}>Exam Schedule</Text>
          <Text style={styles.link}>Faculty Directory</Text>
          <Text style={styles.link}>Campus Map</Text>
          <Text style={styles.link}>Student Portal</Text>
        </View>
      </View>

      {/* Important Notice */}
      <View style={styles.noticeSection}>
        <Text style={styles.noticeTitle}>Important Notice</Text>
        <Text style={styles.noticeText}>
          All students are required to update their contact information in the student portal before November 20, 2025.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Contact</Text>
        <Text style={styles.footerText}>
          Chittagong University of Engineering & Technology{'\n'}
          Chattogram-4349, Bangladesh{'\n'}
          Email: info@cuet.ac.bd
        </Text>
        <Text style={styles.footerTitle}>Quick Links</Text>
        <Text style={styles.footerLink}>Official Website</Text>
        <Text style={styles.footerLink}>Privacy Policy</Text>
        <Text style={styles.footerLink}>Terms of Service</Text>
        <Text style={styles.copyright}>© 2025 CUET News Portal. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, backgroundColor: '#001f3f' },
  centerLogoContainer: { alignItems: 'center' },
  centerLogo: { width: 80, height: 80, marginBottom: 5 }, // bigger logo
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerButtons: { flexDirection: 'row', alignItems: 'center' },
  loginHeaderButton: { paddingHorizontal: 15, paddingVertical: 8, backgroundColor: '#fff', borderRadius: 5, marginLeft: 10 },
  loginHeaderText: { color: '#001f3f', fontWeight: 'bold', fontSize: 14 },
  dropdownButton: { paddingHorizontal: 15, paddingVertical: 8, backgroundColor: '#fff', borderRadius: 5 },
  dropdownMenu: { position: 'absolute', top: 40, right: 80, backgroundColor: '#fff', borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  dropdownItem: { paddingHorizontal: 15, paddingVertical: 10 },
  heroSection: { backgroundColor: '#001f3f', padding: 20, paddingBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#e0e0e0', textAlign: 'center', marginBottom: 20, lineHeight: 22 },
  searchContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginTop: 10 },
  searchPlaceholder: { color: '#888', fontSize: 14 },
  tabContainer: { backgroundColor: '#001f3f', paddingHorizontal: 15, paddingVertical: 10 },
  tab: { paddingHorizontal: 20, paddingVertical: 10, marginRight: 10, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)' },
  activeTab: { backgroundColor: '#fff' },
  tabText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  activeTabText: { color: '#001f3f' },
  section: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#001f3f', marginBottom: 15 },
  featuredCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#001f3f', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  featuredCategory: { color: '#001f3f', fontWeight: 'bold', fontSize: 12, marginBottom: 5 },
  featuredTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  featuredDate: { color: '#666', fontSize: 12, marginBottom: 3 },
  featuredAuthor: { color: '#666', fontSize: 12 },
  newsItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  newsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  newsCategory: { color: '#001f3f', fontWeight: 'bold', fontSize: 12 },
  newsDate: { color: '#666', fontSize: 12 },
  newsTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  newsDescription: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 8 },
  newsAuthor: { fontSize: 12, color: '#888', marginBottom: 8 },
  readMore: { color: '#001f3f', fontWeight: 'bold', fontSize: 14 },
  eventItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: '#001f3f' },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  eventDate: { color: '#001f3f', fontSize: 14, marginBottom: 3 },
  eventLocation: { color: '#666', fontSize: 14 },
  viewAllButton: { backgroundColor: '#001f3f', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  viewAllText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  linksContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 8 },
  link: { fontSize: 14, color: '#001f3f', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  noticeSection: { backgroundColor: '#fff8e1', padding: 20, margin: 20, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#ffc107' },
  noticeTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  noticeText: { fontSize: 14, color: '#666', lineHeight: 20 },
  footer: { backgroundColor: '#001f3f', padding: 20 },
  footerTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 15, marginBottom: 8 },
  footerText: { fontSize: 14, color: '#e0e0e0', lineHeight: 20 },
  footerLink: { fontSize: 14, color: '#e0e0e0', marginBottom: 5 },
  copyright: { fontSize: 12, color: '#aaa', textAlign: 'center', marginTop: 20 },
});
