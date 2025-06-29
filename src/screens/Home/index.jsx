import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import styles from "./styles";
import CreateCategory from "../../components/CreateCategory";
import { FlatList } from "react-native";
import { supabase } from "../../config/supabaseConfig";
import Toast from "react-native-toast-message";

export default function Home({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const onClose = () => setVisible(false);

  const onCategoryCreated = () => {
    Toast.show({
      type: "success",
      text1: "Categoria criada com sucesso",
      text2: "Você pode criar outra categoria",
    });
    loadCategories();
  };

  async function loadCategories() {
    try {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session?.user) {
        Toast.show({
          type: "error",
          text1: "Erro de autenticação",
          text2: "Por favor, faça login novamente.",
        });
        return;
      }

      const user = sessionData.session.user;

      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Erro ao carregar categorias:", error);
        Toast.show({
          type: "error",
          text1: "Erro ao carregar categorias",
          text2: "Por favor, tente novamente mais tarde.",
        });
        return;
      }

      if (data && data.length > 0) {
        setCategorias(data);
      } else {
        setCategorias([]);
      }
    } catch (error) {
      console.error("Erro na função loadCategories:", error);
      Toast.show({
        type: "error",
        text1: "Erro ao carregar categorias",
        text2: "Por favor, tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const Categories = ({ data }) => {
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() =>
          navigation.navigate("RecipesScreen", { categoryId: data.id })
        }
        activeOpacity={0.9}
      >
        <View style={styles.categoryContent}>
          <View style={styles.categoryImageContainer}>
            <FontAwesome5 name="utensils" size={32} color="#ccc" />
          </View>
          <View style={styles.categoryDetailsContainer}>
            <Text style={styles.categoryTitle}>{data.name}</Text>
            <Text style={styles.categoryDescription} numberOfLines={2}>
              {data.description || "Sem descrição disponível"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <Categories data={item} />;

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhuma categoria encontrada</Text>
      <Text style={styles.emptySubText}>Adicione sua primeira categoria!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonAddCategory}
        onPress={() => setVisible(true)}
      >
        <FontAwesome5 name="plus" size={20} color="#fff" />
        <Text style={styles.buttonText}>Adicionar Categoria</Text>
      </TouchableOpacity>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categorias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listaContainer}
          ListEmptyComponent={renderEmptyComponent}
          refreshing={loading}
          onRefresh={loadCategories}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CreateCategory
              onClose={onClose}
              onCategoryCreated={onCategoryCreated}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
