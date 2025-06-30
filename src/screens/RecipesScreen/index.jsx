import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  SafeAreaView 
} from "react-native";
import styles from "./styles";
import CreateRecipe from "../../components/CreateRecipe";
import { supabase } from "../../config/supabaseConfig";
import Toast from "react-native-toast-message";

export default function RecipesScreen({ navigation, route }) {
  const [visible, setVisible] = useState(false);
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState(null);
  
  const { categoryId } = route.params;

  const onClose = () => setVisible(false);

  const onRecipeCreated = () => {
    Toast.show({
      type: "success",
      text1: "Receita criada com sucesso",
      text2: "Você pode criar outra receita",
    });
    loadRecipes();
  };

  async function loadCategory() {
    try {
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .eq("id", categoryId)
        .single();

      if (error) {
        console.error("Erro ao carregar categoria:", error);
        return;
      }

      if (data) {
        setCategoria(data);
      }
    } catch (error) {
      console.error("Erro na função loadCategory:", error);
    }
  }

  async function loadRecipes() {
    try {
      setLoading(true);
      console.log("🔍 Carregando receitas para categoria:", categoryId);

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
        .from("receitas")
        .select("*")
        .eq("categoria_id", categoryId)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      console.log("📊 Receitas encontradas:", data);

      if (error) {
        console.error("Erro ao carregar receitas:", error);
        Toast.show({
          type: "error",
          text1: "Erro ao carregar receitas",
          text2: error.message || "Tente novamente mais tarde.",
        });
        return;
      }

      if (data) {
        setReceitas(data);
      } else {
        setReceitas([]);
      }
    } catch (error) {
      console.error("Erro na função loadRecipes:", error);
      Toast.show({
        type: "error",
        text1: "Erro inesperado",
        text2: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategory();
    loadRecipes();
  }, [categoryId]);

  const RecipeItem = ({ data }) => {
    return (
      <TouchableOpacity
        style={styles.recipeItem}
        onPress={() =>
          navigation.navigate("RecipeDetail", { recipeId: data.id })
        }
        activeOpacity={0.9}
      >
        <View style={styles.recipeContent}>
          <View style={styles.recipeImageContainer}>
            <FontAwesome5 name="utensils" size={28} color="#ccc" />
          </View>
          <View style={styles.recipeDetailsContainer}>
            <Text style={styles.recipeTitle}>{data.nome}</Text>
            <Text style={styles.recipeDescription} numberOfLines={2}>
              {data.descricao || "Sem descrição disponível"}
            </Text>
            <View style={styles.recipeMetadata}>
              <View style={styles.recipeTime}>
                <FontAwesome5 name="clock" size={12} color="#666" />
                <Text style={styles.timeText}>
                  {data.tempo_preparo || "N/A"} min
                </Text>
              </View>
              <View style={styles.recipeDifficulty}>
                <FontAwesome5 name="star" size={12} color="#ffd700" />
                <Text style={styles.difficultyText}>
                  {data.dificuldade || "Fácil"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => <RecipeItem data={item} />;

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome5 name="utensils" size={64} color="#ccc" style={{ marginBottom: 16 }} />
      <Text style={styles.emptyText}>Nenhuma receita encontrada</Text>
      <Text style={styles.emptySubText}>
        Adicione sua primeira receita nesta categoria!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {categoria?.nome || "Receitas"}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <TouchableOpacity
        style={styles.buttonAddRecipe}
        onPress={() => setVisible(true)}
      >
        <FontAwesome5 name="plus" size={20} color="#fff" />
        <Text style={styles.buttonText}>Adicionar Receita</Text>
      </TouchableOpacity>

      <View style={styles.recipesContainer}>
        <FlatList
          data={receitas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listaContainer}
          ListEmptyComponent={renderEmptyComponent}
          refreshing={loading}
          onRefresh={loadRecipes}
          showsVerticalScrollIndicator={false}
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
            <CreateRecipe
              categoryId={categoryId}
              onClose={onClose}
              onRecipeCreated={onRecipeCreated}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}