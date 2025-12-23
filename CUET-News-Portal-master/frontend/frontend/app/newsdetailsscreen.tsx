import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function NewsDetailsScreen() {
  const router = useRouter();
  const params = useSearchParams();

  const {
    title,
    category,
    date,
    author,
    description,
    image
  } = params as {
    title: string;
    category: string;
    date: string;
    author: string;
    description: string;
    image?: string;
  };

  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => setBookmarked(!bookmarked);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${description}\n\nRead more at CUET News App`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header />

      <LinearGradient colors={['#001f3f', '#0050a0']} start={[0, 0]} end={[1, 0]} style={styles.heroSection}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.heroTitle}>{title}</Text>
        <View style={styles.newsMeta}>
          <Text style={styles.newsCategory}>{category}</Text>
          <Text style={styles.newsDate}>{date}</Text>
          <Text style={styles.newsAuthor}>By {author}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={toggleBookmark} style={[styles.actionButton, bookmarked && styles.bookmarked]}>
            <Text style={styles.actionText}>{bookmarked ? '★ Bookmarked' : '☆ Bookmark'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Text style={styles.actionText}>🔗 Share</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {image ? <Image source={{ uri: image }} style={styles.newsImage} /> : null}
        <Text style={styles.newsDescription}>{description}</Text>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  heroSection: { padding: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  backButton: { marginBottom: 15 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  heroTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  newsMeta: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  newsCategory: { color: '#fff', fontWeight: 'bold', fontSize: 12, marginBottom: 5 },
  newsDate: { color: '#ddd', fontSize: 12, marginBottom: 5 },
  newsAuthor: { color: '#ddd', fontSize: 12, marginBottom: 5 },

  actions: { flexDirection: 'row', marginTop: 10 },
  actionButton: { marginRight: 15, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  bookmarked: { backgroundColor: '#ffd700' },
  actionText: { color: '#fff', fontWeight: 'bold' },

  content: { padding: 20 },
  newsImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 15 },
  newsDescription: { fontSize: 16, color: '#333', lineHeight: 24 }
});
