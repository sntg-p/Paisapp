import { Animated } from 'react-native';

import Colors from '../constants/Colors';

const SHADOW_COLOR = Colors.shadow;
const SHADOW_OPACITY = 0.06;

export function animatedShadow(elevation: number | Animated.Value = 0) {
  if (elevation instanceof Animated.Value) {
    const inputRange = [0, 1, 2, 3, 8, 24];

    return {
      shadowColor: SHADOW_COLOR,
      shadowOffset: {
        width: new Animated.Value(0),
        height: elevation.interpolate({
          inputRange,
          outputRange: [0, 0.5, 0.75, 2, 7, 23],
        }),
      },
      shadowOpacity: elevation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, SHADOW_OPACITY],
        extrapolate: 'clamp',
      }),
      shadowRadius: elevation.interpolate({
        inputRange,
        outputRange: [0, 0.75, 1.5, 3, 8, 24],
      }),
    };
  } else {
    return shadow(elevation);
  }
}

export function shadow(elevation: number, shadow?: {
  color?: string;
  opacity?: number;
}) {
  if (elevation === 0) {
    return {};
  }

  let height, radius;
  switch (elevation) {
    case 1:
      height = 0.5;
      radius = 0.75;
      break;
    case 2:
      height = 0.75;
      radius = 1.5;
      break;
    default:
      height = elevation / 3.75 - 1;
      radius = elevation;
  }

  return {
    shadowColor: shadow?.color ?? SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height,
    },
    shadowOpacity: shadow?.opacity ?? SHADOW_OPACITY,
    shadowRadius: radius,
  };
}
