import Colors from '@/assets/colors/colors';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    // Logo fade in and scale animation
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.back(1.1)),
        useNativeDriver: true,
      }),
    ]).start();

    // Auto finish after 3 seconds
    setTimeout(() => {
      onFinish();
    }, 3000);
  };

  // Calculate logo size (40% of screen width)
  const logoSize = width * 0.8;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.light.secondary, Colors.light.primary, Colors.light.tertiary, Colors.light.quaternary]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.3, 0.7, 1]}
      >
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            }
          ]}
        >
          <Image
            source={require('@/assets/images/logo/logo_white.png')}
            style={[
              styles.logoImage,
              {
                width: logoSize,
                height: logoSize,
              }
            ]}
            resizeMode="contain"
          />
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 15,
  },
}); 