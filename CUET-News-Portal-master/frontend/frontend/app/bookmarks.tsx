import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function BookmarksScreen() {
  const router = useRouter();

  const [bookmarkedNews] = useState([
    {
      id: 1,
      title: 'Mid-Term Examination Schedule Announced',
      category: 'Academic',
      date: '2025-11-12',
      excerpt: 'The mid-term examination schedule has been published.',
      image: 'https://via.placeholder.com/400x200/001f3f/ffffff?text=Exam'
    },
    {
      id: 3,
      title: 'Research Paper Published in IEEE',
      category: 'Research',
      date: '2025-11-08',
      excerpt: 'Dr. Rahman publishes research on Machine Learning.',
      image: 'https://via.placeholder.com/400x200/ff6b6b/ffffff?text=Research'
    }
  ]);

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.pageTitle}>🔖 Bookmarked News</Text>
        <Text style={styles.subtitle}>
          You have {bookmarkedNews.length} saved articles
        </Text>

        {/* Empty State */}
        {bookmarkedNews.length === 0 ? (
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
                  pathname: '/news-detail',
                  params: {
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    date: item.date
                  }
                })
              }
              style={styles.newsCard}
            >
              <Image source={{ uri: item.image }} style={styles.newsImage} />

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

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa'
  },

  content: {
    padding: 20
  },

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

  // Empty State
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
    borderRadius: 25,
    elevation: 3
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  // News Card (matched with index styling)
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
    color: '#666',
    lineHeight: 20
  }
});
