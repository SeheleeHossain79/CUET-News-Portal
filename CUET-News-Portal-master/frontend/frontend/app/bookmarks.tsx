import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Bookmark {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

export default function BookmarksScreen() {
  const router = useRouter();
  const [bookmarkedNews, setBookmarkedNews] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 TEMP data loader (replace later with backend)
  const loadBookmarks = async () => {
    try {
      // This simulates backend data
      const data: Bookmark[] = [];

      setBookmarkedNews(data);
    } catch (error) {
      console.log('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookmarks();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>🔖 Bookmarked News</Text>

        {loading ? (
          <Text style={styles.subtitle}>Loading...</Text>
        ) : (
          <Text style={styles.subtitle}>
            You have {bookmarkedNews.length} saved articles
          </Text>
        )}

        {/* Empty State */}
        {!loading && bookmarkedNews.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No bookmarked news yet</Text>

            <TouchableOpacity
              onPress={() => router.push('/')}
              style={styles.browseButton}
            >
              <Text style={styles.browseButtonText}>Browse News</Text>
            </TouchableOpacity>
          </View>
        ) : (
          bookmarkedNews.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: '/newsdetailsscreen'',
                  params: { id: item.id }
                })
              }
              style={styles.newsCard}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.newsImage} />
              ) : null}

              <View style={styles.newsContent}>
                <View style={styles.newsHeader}>
                  <Text style={styles.newsCategory}>{item.category}</Text>
                  <Text style={styles.newsDate}>{item.date}</Text>
                </View>

                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsExcerpt}>{item.excerpt}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  content: { padding: 20 },

  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#001f3f',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25
  },

  emptyState: {
    alignItems: 'center',
    marginTop: 60
  },
  emptyIcon: { fontSize: 80, marginBottom: 20 },
  emptyText: { fontSize: 18, color: '#777', marginBottom: 20 },

  browseButton: {
    backgroundColor: '#001f3f',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3
  },
  newsImage: {
    width: '100%',
    height: 160
  },
  newsContent: {
    padding: 15
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  newsCategory: {
    color: '#001f3f',
    fontWeight: 'bold',
    fontSize: 12
  },
  newsDate: {
    color: '#666',
    fontSize: 12
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  newsExcerpt: {
    fontSize: 14,
    color: '#666'
  }
});

