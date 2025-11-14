// frontend/screens/NewsDetailsScreen.js
import React, { useEffect, useState, useContext } from "react";
import { ScrollView, View } from "react-native";
import { Text, Switch, ActivityIndicator, Title, Paragraph } from "react-native-paper";
import api from "../api/api";
import { AuthContext } from "../navigation/AppNavigator";

export default function NewsDetailsScreen({ route, navigation }) {
  const { newsId } = route.params;
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState(null);
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await api.get(`/news/${newsId}`);
        setNews(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [newsId]);

  const fetchSummary = async () => {
    if (!news || summary) return;
    try {
      const res = await api.get(`/summarize/${newsId}`);
      setSummary(res.data.summary || "No summary available");
    } catch (err) {
      console.log(err);
      setSummary("Summary unavailable");
    }
  };

  const onToggle = (val) => {
    if (!userToken) {
      alert("Login to see summaries");
      return;
    }
    setShowSummary(val);
    if (val) fetchSummary();
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 24 }} />;
  if (!news) return <Paragraph style={{ padding: 16 }}>News not found</Paragraph>;

  return (
    <ScrollView style={{ padding: 12 }}>
      <Title>{news.title}</Title>
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
        <Text>Show Summary</Text>
        <Switch value={showSummary} onValueChange={onToggle} style={{ marginLeft: 8 }} />
      </View>
      <Paragraph>{showSummary ? (summary || "Loading...") : news.content}</Paragraph>
    </ScrollView>
  );
}
