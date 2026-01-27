import { Image, Text, View, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITENS = Array.from({ length: 100 }).map((_, index) => String(index));
export function Home() {
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
            <Filter key={status} status={status} isActive />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ITENS}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Item
              data={{
                status: FilterStatus.PENDING,
                description: item,
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
