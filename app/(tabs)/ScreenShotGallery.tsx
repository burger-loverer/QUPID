import Colors from '@/assets/colors/colors';
import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';

interface ScreenshotGalleryProps {
  screenshots: string[];
  onPress?: (index: number) => void;
}

const { width } = Dimensions.get('window');
const SCREENSHOT_WIDTH = width * 0.7;

export default function ScreenshotGallery({ screenshots, onPress }: ScreenshotGalleryProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      decelerationRate="fast"
      snapToInterval={SCREENSHOT_WIDTH + 12}
      snapToAlignment="center"
    >
      {screenshots.map((screenshot, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [
            styles.screenshotContainer,
            { opacity: pressed ? 0.9 : 1 }
          ]}
          onPress={() => onPress && onPress(index)}
        >
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: screenshot }}
              style={styles.screenshot}
              contentFit="cover"
              transition={300}
            />
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  screenshotContainer: {
    width: SCREENSHOT_WIDTH,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  screenshot: {
    width: SCREENSHOT_WIDTH,
    height: SCREENSHOT_WIDTH * 1.8,
    borderRadius: 12,
  },
});