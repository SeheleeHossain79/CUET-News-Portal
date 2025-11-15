// frontend/screens/HomeScreen.js
import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { FAB, ActivityIndicator, Appbar } from "react-native-paper";
import api from "../api/api";
import NewsCard from "../components/NewsCard";
import { AuthContext } from "../navigation/AppNavigator";

export default function HomeScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userRole, userToken } = useContext(AuthContext);

  // Fetch all news
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await api.get("/news/");
      setNews(res.data);
    } catch (err) {
      console.log(err);
      alert("Could not fetch news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNews(); }, []);

  const handleNewsPress = (newsId) => {
    // Anyone can view news details
    navigation.navigate("NewsDetails", { newsId });
  };

  const handleAddNews = () => {
    if (!userToken) {
      alert("You must log in as admin to add news");
      navigation.navigate("Login");
      return;
    }
    if (userRole !== "admin") {
      alert("Only admin can add news");
      return;
    }
    navigation.navigate("AddNews");
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="CUET News" />
        <Appbar.Action icon="refresh" onPress={fetchNews} />
      </Appbar.Header>

      {loading ? (
        <ActivityIndicator animating style={{ marginTop: 24 }} />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NewsCard
              news={item}
              onPress={() => handleNewsPress(item.id)}
            />
          )}
        />
      )}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={handleAddNews}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: { position: "absolute", right: 16, bottom: 16 }
});
