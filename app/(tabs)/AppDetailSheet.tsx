import Colors from '@/assets/colors/colors';
import { Image } from 'expo-image';
import { Download, Share2, Star, X } from 'lucide-react-native';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReviewCard from './ReviewCard';
import ScreenshotGallery from './ScreenShotGallery';
interface App {
    id: string;
    name: string;
    developer: string;
    description: string;
    rating: number;
    downloads: string;
    icon: string;
    screenshots: string[];
    category: string;
    size: string;
    tags: string[];
  }

interface AppDetailSheetProps {
  app: App | null;
  isVisible: boolean;
  onClose: () => void;
  onScreenshotPress: (url: string) => void;
}

const { height } = Dimensions.get('window');
const AnimatedView = Animated.createAnimatedComponent(View);

export default function AppDetailSheet({ 
  app, 
  isVisible, 
  onClose,
  onScreenshotPress
}: AppDetailSheetProps) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible && app) {
      opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
      translateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) });
    } else {
      opacity.value = withTiming(0, { duration: 200, easing: Easing.in(Easing.ease) });
      translateY.value = withTiming(height, { duration: 300, easing: Easing.in(Easing.ease) });
    }
  }, [isVisible, app, opacity, translateY]);

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const sheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleBackdropPress = () => {
    opacity.value = withTiming(0, { duration: 200, easing: Easing.in(Easing.ease) });
    translateY.value = withTiming(height, { duration: 300, easing: Easing.in(Easing.ease) }, () => {
      runOnJS(onClose)();
    });
  };

  if (!app) return null;

  // For web compatibility
  if (!isVisible && Platform.OS === 'web') {
    return null;
  }

  return (
    <View style={[styles.container, { display: isVisible ? 'flex' : 'none' }]}>
      <Animated.View 
        style={[styles.backdrop, backdropStyle]}
        // @ts-ignore - This is a valid prop for Animated.View
        onTouchEnd={handleBackdropPress}
      />
      
      <AnimatedView 
        style={[
          styles.sheet, 
          { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
          sheetStyle
        ]}
      >
        <View style={styles.handle} />
        
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Image
              source={{ uri: app.icon }}
              style={styles.icon}
              contentFit="cover"
              transition={300}
            />
            
            <View style={styles.headerInfo}>
              <Text style={styles.appName}>{app.name}</Text>
              <Text style={styles.developer}>{app.developer}</Text>
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Star size={16} color={Colors.light.secondaryText} />
                  <Text style={styles.statText}>{app.rating}</Text>
                </View>
                <View style={styles.statItem}>
                  <Download size={16} color={Colors.light.secondaryText} />
                  <Text style={styles.statText}>{app.downloads}</Text>
                </View>
                <Text style={styles.statText}>{app.size}</Text>
              </View>
            </View>
            
            <Pressable 
              style={styles.closeButton}
              onPress={onClose}
              hitSlop={8}
            >
              <X size={20} color={Colors.light.secondaryText} />
            </Pressable>
          </View>
          
          <View style={styles.actionButtons}>
            <Pressable style={styles.getButton}>
              <Text style={styles.getButtonText}>GET</Text>
            </Pressable>
            
            <Pressable style={styles.shareButton}>
              <Share2 size={20} color={Colors.light.primary} />
            </Pressable>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{app.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Screenshots</Text>
            <ScreenshotGallery 
              screenshots={app.screenshots} 
              onPress={(index) => onScreenshotPress(app.screenshots[index])}
            />
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <ReviewCard 
              author="Sarah J."
              rating={5}
              date="June 10, 2025"
              content="This app is amazing! It has completely transformed how I manage my tasks. The interface is intuitive and the features are exactly what I needed."
            />
            <ReviewCard 
              author="Michael T."
              rating={4}
              date="June 5, 2025"
              content="Great app with lots of useful features. Would give 5 stars if it had dark mode. Otherwise, it's perfect for my needs."
            />
            <ReviewCard 
              author="Emma L."
              rating={5}
              date="May 28, 2025"
              content="I've tried many similar apps but this one stands out. The developers clearly put a lot of thought into the user experience. Highly recommended!"
            />
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Developer</Text>
              <Text style={styles.infoValue}>{app.developer}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Category</Text>
              <Text style={styles.infoValue}>{app.category}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Size</Text>
              <Text style={styles.infoValue}>{app.size}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Compatibility</Text>
              <Text style={styles.infoValue}>iOS 15.0 or later</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Languages</Text>
              <Text style={styles.infoValue}>English, Spanish, French, German</Text>
            </View>
          </View>
        </ScrollView>
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.light.border,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  developer: {
    fontSize: 16,
    color: Colors.light.secondaryText,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  getButton: {
    flex: 1,
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  getButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: Colors.light.secondaryText,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  infoLabel: {
    fontSize: 15,
    color: Colors.light.text,
  },
  infoValue: {
    fontSize: 15,
    color: Colors.light.secondaryText,
  },
});