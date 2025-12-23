import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function AdminPanelScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: 'academic',
    content: '',
    author: '',
    image: ''
  });

  const categories = [
    { id: 'academic', name: 'Academic', icon: '📚' },
    { id: 'events', name: 'Events', icon: '📅' },
    { id: 'research', name: 'Research', icon: '🔬' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' },
    { id: 'administrative', name: 'Administrative', icon: '📋' }
  ];

  const publishNews = () => {
    if (!formData.title || !formData.content) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    console.log('Publishing:', formData);

    Alert.alert(
      'Success',
      'News published successfully!',
      [
        {
          text: 'Post Another',
          onPress: () => setFormData({
            title: '',
            category: 'academic',
            content: '',
            author: '',
            image: ''
          })
        },
        { text: 'View News', onPress: () => router.push('/') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Text style={styles.pageTitle}>📰 Publish News</Text>

        {/* News Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>News Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter news title"
            placeholderTextColor="#777"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
        </View>

        {/* Category */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setFormData({ ...formData, category: cat.id })}
                style={[
                  styles.categoryChip,
                  formData.category === cat.id && styles.categoryChipActive
                ]}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.categoryText,
                    formData.category === cat.id && styles.categoryTextActive
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Content */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>News Content *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write the full news content..."
            placeholderTextColor="#777"
            value={formData.content}
            onChangeText={(text) => setFormData({ ...formData, content: text })}
            multiline
          />
        </View>

        {/* Author */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Author</Text>
          <TextInput
            style={styles.input}
            placeholder="Author name"
            placeholderTextColor="#777"
            value={formData.author}
            onChangeText={(text) => setFormData({ ...formData, author: text })}
          />
        </View>

        {/* Image */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Image URL (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="https://example.com/image.jpg"
            placeholderTextColor="#777"
            value={formData.image}
            onChangeText={(text) => setFormData({ ...formData, image: text })}
          />
          <Text style={styles.helpText}>
            💡 Tip: Upload to an image host and paste the link.
          </Text>
        </View>

        {/* Preview */}
        {formData.title !== '' && (
          <View style={styles.preview}>
            <Text style={styles.previewTitle}>Preview</Text>
            <View style={styles.previewCard}>
              {formData.image ? (
                <Image
                  source={{ uri: formData.image }}
                  style={styles.previewImage}
                />
              ) : null}
              <Text style={styles.previewCategory}>
                {formData.category.toUpperCase()}
              </Text>
              <Text style={styles.previewNewsTitle}>{formData.title}</Text>
              <Text style={styles.previewContent} numberOfLines={3}>
                {formData.content}
              </Text>
            </View>
          </View>
        )}

        {/* Publish Button */}
        <TouchableOpacity style={styles.publishButton} onPress={publishNews}>
          <Text style={styles.publishButtonText}>🚀 Publish News</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  content: { padding: 20 },
  pageTitle: { fontSize: 26, fontWeight: 'bold', color: '#001f3f', textAlign: 'center', marginBottom: 25 },
  inputGroup: { marginBottom: 22 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#001f3f', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 15, fontSize: 16, color: '#333', borderWidth: 1, borderColor: '#d0d6e0' },
  textArea: { minHeight: 150, textAlignVertical: 'top' },
  helpText: { fontSize: 12, color: '#555', marginTop: 5, fontStyle: 'italic' },
  categoryChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 30, backgroundColor: '#fff', marginRight: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: '#d0d6e0' },
  categoryChipActive: { backgroundColor: '#001f3f', borderColor: '#001f3f' },
  categoryIcon: { marginRight: 6, fontSize: 16 },
  categoryText: { fontSize: 14, color: '#001f3f', fontWeight: '600' },
  categoryTextActive: { color: '#fff' },
  preview: { marginBottom: 30 },
  previewTitle: { fontSize: 18, fontWeight: 'bold', color: '#001f3f', marginBottom: 10 },
  previewCard: { backgroundColor: '#fff', borderRadius: 12, padding: 15, borderWidth: 1, borderColor: '#d0d6e0' },
  previewImage: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10 },
  previewCategory: { fontSize: 12, fontWeight: 'bold', color: '#0050a0', marginBottom: 4 },
  previewNewsTitle: { fontSize: 17, fontWeight: 'bold', color: '#001f3f', marginBottom: 6 },
  previewContent: { fontSize: 14, color: '#555' },
  publishButton: { backgroundColor: '#001f3f', padding: 18, borderRadius: 10, alignItems: 'center' },
  publishButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
