import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { CircleCheck } from "lucide-react-native";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";

type Props = TouchableOpacityProps & {
  isActive: boolean;
  status: FilterStatus;
};

export function Filter({ status, isActive, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, { opacity: isActive ? 1 : 0.5 }]}
      {...rest}
      activeOpacity={0.8}
    >
      <CircleCheck size={18} color="#000" />
      <Text style={styles.title}>
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
}
