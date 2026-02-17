import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [item, setItem] = useState<ItemStorage[]>([]);

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição do item.");
    }
    const newItem = {
      id: new Date().getTime().toString(),
      description: description,
      status: FilterStatus.PENDING,
    };
    await itemsStorage.add(newItem);
    await itemsByStatus();

    Alert.alert("Adicionado", `Adicionado ${description} à lista.`);
    setFilter(FilterStatus.PENDING);
    setDescription("");
  }
  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItem(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível filtrar os itens.");
    }
  }
  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover", "Não foi possível remover o item.");
    }
  }
  useEffect(() => {
    itemsByStatus();
  }, [filter]);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input
          placeholder="O que você precisa comprar? "
          onChangeText={setDescription}
          value={description}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={item}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={{
                status: item.status,
                description: item.description,
              }}
              onRemove={() => {
                handleRemove(item.id);
              }}
              onStatus={() => {
                console.log("mudar o status");
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />
      </View>
    </View>
  );
}
