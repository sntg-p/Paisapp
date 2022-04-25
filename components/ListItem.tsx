import {
  StyleSheet,
  Pressable,
  useColorScheme,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { useThemeColor } from "./Themed";
import { Text } from "./Themed";
import Shadow from "./Shadow";

interface ListItemProps {
  icon: string | ((size: number, color: string) => React.ReactNode);
  title: string;
  description?: string;
  right?: string;
  hue: number;
}

export default function ListItem(props: ListItemProps) {
  const { icon, title, description, right, hue } = props;

  const iconColor = useThemeColor({
    light: `hsla(${hue}, 64%, 64%, 1)`,
    dark: `hsla(${hue}, 36%, 48%, 1)`,
  });

  const iconBackgroundColor = useThemeColor({
    light: `hsla(${hue}, 100%, 95%, 1)`,
    dark: `hsla(${hue}, 24%, 12%, 1)`,
  });

  const textColor = useThemeColor({ name: "secondaryText" });
  const subColor = useThemeColor({ name: "baseText" });
  const cardColor = useThemeColor({ name: "foreground" });

  return (
    <Shadow>
      <Pressable
        style={({ pressed }) => ({
          flexDirection: "row",
          backgroundColor: cardColor,
          alignItems: "center",
          width: "100%",
          paddingVertical: 24,
          paddingHorizontal: 16,
          borderRadius: 16,
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <View style={[styles.iconContainer, {
          backgroundColor: iconBackgroundColor
        }]}>
          {typeof icon === "string" ? (
            <FontAwesome5
              name={icon}
              size={18}
              style={{ color: iconColor }}
            />
          ) : (
            icon(18, iconColor)
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.title, {
            color: textColor,
          }]}>
            {title}
          </Text>

          {description ? (
            <Text style={[styles.subtitle, {
              color: subColor,
            }]}>
              {description}
            </Text>
          ) : null}
        </View>

        {right ? (
          <Text style={[styles.right, {
            color: iconColor,
          }]}>
            {right}
          </Text>
        ) : null}
      </Pressable>
    </Shadow>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginRight: 16,
    height: 44,
    width: 44,
  },
  textContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
  },
  right: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 18,
  },
});
