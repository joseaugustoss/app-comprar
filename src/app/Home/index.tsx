import { Image, Text, View } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";

export function Home() {
  return (
    <>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("@/assets/logo.png")} />
        <View style={styles.form}>
          <Input placeholder="O que você precisa comprar? " />
          <Button title="Entrar" />
        </View>
        <View style={styles.content}>
          <Filter isActive status={FilterStatus.PENDING} />
          <Filter isActive={false} status={FilterStatus.DONE} />
        </View>
      </View>
    </>
  );
}
