import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';

// Define types for News and Events
type NewsItem = {
  id: string;
  category: string;
  title: string;
  date: string;
  author: string;
  description: string;
  isFeatured: boolean;
};

type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
};

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<string>('All News');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tabs: string[] = ['All News', 'Academic', 'Events', 'Research', 'Achievements', 'Administrative'];

  const newsData: NewsItem[] = [
    {
      id: '1',
      category: 'Academic',
      title: 'Mid-Term Examination Schedule Announced for Fall 2025',
      date: '2025-11-12',
      author: 'Academic Section',
      description: 'The mid-term examination schedule for all departments has been published. Students are requested to check their respective departmental notice boards.',
      isFeatured: true
    },
    {
      id: '2',
      category: 'Events',
      title: 'CUET Annual Tech Fest 2025 - Registration Open',
      date: '2025-11-10',
      author: 'CSE Department',
      description: 'The Department of CSE invites all students to participate in the annual tech fest featuring hackathons, workshops, and tech talks.',
      isFeatured: false
    },
    {
      id: '3',
      category: 'Research',
      title: 'Research Paper Published in IEEE Conference',
      date: '2025-11-08',
      author: 'Research Office',
      description: 'Dr. Rahman and team have published their research on Machine Learning applications in healthcare at the IEEE International Conference.',
      isFeatured: false
    },
    {
      id: '4',
      category: 'Academic',
      title: 'New Course on Artificial Intelligence Added to Curriculum',
      date: '2025-11-05',
      author: 'Academic Council',
      description: 'Starting next semester, a new course on Artificial Intelligence and Machine Learning will be available for final year students.',
      isFeatured: false
    },
    {
      id: '5',
      category: 'Achievements',
      title: 'CUET Robotics Team Wins National Competition',
      date: '2025-11-03',
      author: 'Student Affairs',
      description: 'Our university robotics team secured first place in the National Robotics Championship held in Dhaka.',
      isFeatured: false
    },
    {
      id: '6',
      category: 'Administrative',
      title: 'Campus Wi-Fi Upgrade Completed',
      date: '2025-11-01',
      author: 'IT Department',
      description: 'The campus-wide Wi-Fi upgrade has been completed, providing faster and more reliable internet access.',
      isFeatured: false
    },
    {
      id: '7',
      category: 'Events',
      title: 'Career Fair 2025: Over 50 Companies to Participate',
      date: '2025-10-28',
      author: 'Career Development Center',
      description: 'More than 50 leading companies will participate in the annual career fair next month.',
      isFeatured: false
    }
  ];

  const eventsData: EventItem[] = [
    { id: 'e1', title: 'Tech Fest 2025', date: '2025-11-25', location: 'Main Auditorium' },
    { id: 'e2', title: 'Career Fair', date: '2025-12-05', location: 'Sports Complex' },
    { id: 'e3', title: 'Research Symposium', date: '2025-12-15', location: 'Conference Hall' }
  ];

  // Filter news based on active tab and search query
  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesCategory = activeTab === 'All News' || item.category === activeTab;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // Filter events based on active tab
  const filteredEvents = useMemo(() => {
    if (activeTab === 'All News' || activeTab === 'Events') {
      return eventsData;
    }
    return [];
  }, [activeTab]);

  const featuredNews = useMemo(() => {
    return filteredNews.find(item => item.isFeatured) || filteredNews[0];
  }, [filteredNews]);

  const handleTabPress = (tab: string) => setActiveTab(tab);

  const renderNewsItem = (item: NewsItem) => (
    <View key={item.id} style={styles.newsItem}>
      <View style={styles.newsHeader}>
        <Text style={styles.newsCategory}>{item.category}</Text>
        <Text style={styles.newsDate}>{item.date}</Text>
      </View>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
      <Text style={styles.newsAuthor}>By {item.author}</Text>
      <TouchableOpacity
        style={styles.readMoreButton}
        onPress={() => navigation.navigate('NewsDetails', { newsItem: item })}
      >
        <Text style={styles.readMore}>Read More</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEventItem = (item: EventItem) => (
    <View key={item.id} style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
      <Text style={styles.eventLocation}>{item.location}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Header />

      {/* Hero Section */}
      <LinearGradient colors={['#001f3f', '#0050a0']} start={[0, 0]} end={[1, 0]} style={styles.heroSection}>
        <Text style={styles.heroTagline}>
          Your centralized hub for all university news, events, and announcements.
        </Text>
        <TextInput
          placeholder="Search news, events, announcements..."
          placeholderTextColor="#ccc"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </LinearGradient>

      {/* Navigation Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabPress(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured News */}
      {featuredNews && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured News</Text>
          <View style={styles.featuredCard}>
            <Text style={styles.featuredCategory}>{featuredNews.category}</Text>
            <Text style={styles.featuredTitle}>{featuredNews.title}</Text>
            <Text style={styles.featuredDate}>{featuredNews.date}</Text>
            <Text style={styles.featuredAuthor}>By {featuredNews.author}</Text>
          </View>
        </View>
      )}

      {/* Latest News */}
      {filteredNews.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{activeTab === 'All News' ? 'Latest News' : `${activeTab} News`}</Text>
          {filteredNews.filter(item => !item.isFeatured).map(renderNewsItem)}
        </View>
      )}

      {/* Upcoming Events */}
      {filteredEvents.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {filteredEvents.map(renderEventItem)}
        </View>
      )}

      {/* No Results */}
      {filteredNews.length === 0 && (
        <View style={styles.section}>
          <Text style={styles.noResultsText}>
            No news found {searchQuery ? `for "${searchQuery}"` : ''} in {activeTab.toLowerCase()}.
          </Text>
        </View>
      )}

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },

  heroSection: { padding: 20, width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  heroTagline: { color: '#fff', fontSize: 16, marginBottom: 12, textAlign: 'center' },
  searchInput: { backgroundColor: '#fff', borderRadius: 25, padding: 12, fontSize: 14, elevation: 3 },

  tabContainer: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 15, backgroundColor: 'rgba(236, 239, 241, 1)' },
  tab: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 10 },
  activeTab: { backgroundColor: '#fff', elevation: 2 },
  tabText: { color: '#384e76ff', fontWeight: '500' },
  activeTabText: { color: '#001f3f', fontWeight: 'bold' },

  section: { padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#001f3f', marginBottom: 15 },

  featuredCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#001f3f', elevation: 3 },
  featuredCategory: { color: '#001f3f', fontWeight: 'bold', fontSize: 12, marginBottom: 5 },
  featuredTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  featuredDate: { fontSize: 12, color: '#666', marginBottom: 3 },
  featuredAuthor: { fontSize: 12, color: '#666' },

  newsItem: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 2 },
  newsHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  newsCategory: { color: '#001f3f', fontWeight: 'bold', fontSize: 12 },
  newsDate: { color: '#666', fontSize: 12 },
  newsTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  newsDescription: { fontSize: 14, color: '#666', marginBottom: 5 },
  newsAuthor: { fontSize: 12, color: '#888', marginBottom: 5 },
  readMoreButton: { alignSelf: 'flex-start', backgroundColor: '#001f3f', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 },
  readMore: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  eventItem: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#001f3f', elevation: 2 },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 3 },
  eventDate: { fontSize: 14, color: '#001f3f', marginBottom: 3 },
  eventLocation: { fontSize: 14, color: '#666' },

  noResultsText: { textAlign: 'center', fontSize: 16, color: '#666', fontStyle: 'italic', marginVertical: 20 }
});