import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { CircleCheck } from "lucide-react-native";
import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../StatusIcon";

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
      <StatusIcon status={status} />
      <Text style={styles.title}>
        {status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  );
}
