import { Image, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITENS = [
  { id: "1", status: FilterStatus.PENDING, description: "Leite" },
  { id: "2", status: FilterStatus.DONE, description: "Ovos" },
  { id: "3", status: FilterStatus.PENDING, description: "Café" },
  { id: "4", status: FilterStatus.DONE, description: "Pão" },
  { id: "5", status: FilterStatus.PENDING, description: "Frutas" },
];
export function Home() {
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar? " />
        <Button title="Entrar" />
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
          data={ITENS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={{
                status: item.status,
                description: item.description,
              }}
              onRemove={() => {
                console.log("remove");
              }}
              onStatus={() => {
                console.log("mudar o status");
              }}
            />
          )}
        />
      </View>
    </View>
  );
}
