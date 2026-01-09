import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

/* ======================
   BACKEND CONFIG
====================== */
const API_BASE_URL = 'http://YOUR_BACKEND_IP:8000'; // Update this when backend IP is ready

/* ======================
   TYPES
====================== */
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

  /* 🔁 BACKEND DATA STATES */
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [eventsData, setEventsData] = useState<EventItem[]>([]);

  const tabs: string[] = ['All News', 'Academic', 'Events', 'Research', 'Achievements', 'Administrative'];

  /* ======================
     FETCH FROM BACKEND
  ======================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsRes = await fetch(`${API_BASE_URL}/news`);
        const eventsRes = await fetch(`${API_BASE_URL}/events`);

        const newsJson = await newsRes.json();
        const eventsJson = await eventsRes.json();

        /* snake_case → camelCase */
        const formattedNews: NewsItem[] = newsJson.map((item: any) => ({
          id: String(item.id),
          category: item.category,
          title: item.title,
          date: item.date,
          author: item.author,
          description: item.description,
          isFeatured: item.is_featured,
        }));

        setNewsData(formattedNews);
        setEventsData(eventsJson);
      } catch (error) {
        console.error('Backend connection error:', error);
      }
    };

    fetchData();
  }, []);

  /* ======================
     FILTER LOGIC
  ======================= */
  const filteredNews = useMemo(() => {
    return newsData.filter(item => {
      const matchesCategory = activeTab === 'All News' || item.category === activeTab;
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery, newsData]);

  const filteredEvents = useMemo(() => {
    if (activeTab === 'All News' || activeTab === 'Events') {
      return eventsData;
    }
    return [];
  }, [activeTab, eventsData]);

  const featuredNews = useMemo(() => {
    return filteredNews.find(item => item.isFeatured) || filteredNews[0];
  }, [filteredNews]);

  /* ======================
     RENDER FUNCTIONS
  ======================= */
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

  /* ======================
     UI
  ======================= */
  return (
    <ScrollView style={styles.container}>
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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

      {filteredNews.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'All News' ? 'Latest News' : `${activeTab} News`}
          </Text>
          {filteredNews.filter(item => !item.isFeatured).map(renderNewsItem)}
        </View>
      )}

      {filteredEvents.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {filteredEvents.map(renderEventItem)}
        </View>
      )}

      {filteredNews.length === 0 && (
        <View style={styles.section}>
          <Text style={styles.noResultsText}>
            No news found {searchQuery ? `for "${searchQuery}"` : ''} in {activeTab.toLowerCase()}.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

/* ======================
   STYLES (UNCHANGED)
====================== */
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
  featuredCategory: { color: '#001f3f', fontWeight: 'bold', fontSize: 12 },
  featuredTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  featuredDate: { fontSize: 12, color: '#666' },
  featuredAuthor: { fontSize: 12, color: '#666' },

  newsItem: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 2 },
  newsHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  newsCategory: { color: '#001f3f', fontWeight: 'bold', fontSize: 12 },
  newsDate: { color: '#666', fontSize: 12 },
  newsTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  newsDescription: { fontSize: 14, color: '#666' },
  newsAuthor: { fontSize: 12, color: '#888' },

  readMoreButton: { backgroundColor: '#001f3f', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 },
  readMore: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  eventItem: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#001f3f', elevation: 2 },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  eventDate: { fontSize: 14, color: '#001f3f' },
  eventLocation: { fontSize: 14, color: '#666' },

  noResultsText: { textAlign: 'center', fontSize: 16, color: '#666', fontStyle: 'italic' },
});
