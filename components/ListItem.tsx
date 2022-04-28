import {
  StyleSheet,
  Pressable,
  View,
} from "react-native";

import { Text, useThemeColor } from "./Themed";
import { shadow } from "./Shadow";

interface ListItemProps {
  icon?: ((size: number, color: string) => React.ReactNode);
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
        ...(shadow(30))
      })}
    >
      <View style={[styles.iconContainer, {
        backgroundColor: iconBackgroundColor
      }]}>
        {icon ? (
          icon(18, iconColor)
        ) : null}
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
