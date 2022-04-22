import { Shadow as DefaultShadow } from 'react-native-shadow-2';

export default function Shadow({ children }: any) {
  return (
    <DefaultShadow
      viewStyle={{
        alignSelf: 'stretch',
      }}
      radius={16}
      startColor="hsla(0, 0%, 0%, 0.06)"
      offset={[0, 8]}
      distance={24}
    >
      {children}
    </DefaultShadow>
  );
}
