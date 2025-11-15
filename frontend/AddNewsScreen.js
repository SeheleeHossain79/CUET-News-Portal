// frontend/screens/AddNewsScreen.js
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import api from "../api/api";
import * as ImagePicker from "expo-image-picker";

export default function AddNewsScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!res.cancelled) setImage(res.uri);
  };

  const uploadImage = async (uri) => {
    const form = new FormData();
    const filename = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image";
    form.append("file", { uri, name: filename, type });
    const res = await api.post("/upload", form, { headers: { "Content-Type": "multipart/form-data" } });
    return res.data.url;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let image_url = null;
      if (image) image_url = await uploadImage(image);
      await api.post("/news", { title, content, image_url });
      alert("News posted");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      alert("Could not post news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 12 }}>
      <TextInput label="Title" value={title} onChangeText={setTitle} />
      <TextInput label="Content" value={content} onChangeText={setContent} multiline numberOfLines={6} style={{ marginTop: 12 }} />
      <Button onPress={pickImage} style={{ marginTop: 12 }}>Pick Image (optional)</Button>
      <Button mode="contained" onPress={handleSubmit} loading={loading} style={{ marginTop: 12 }}>Post News</Button>
    </ScrollView>
  );
}
