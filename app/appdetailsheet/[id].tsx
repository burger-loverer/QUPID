import { apps } from '@/assets/mocks/app';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppDetailSheet from '../(tabs)/AppDetailSheet';

export default function AppDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  // Find the app by ID
  const app = apps.find(app => app.id === id) || null;

  const handleClose = () => {
    router.back();
  };

  const handleScreenshotPress = (url: string) => {
    setSelectedScreenshot(url);
  };

  const handleCloseScreenshot = () => {
    setSelectedScreenshot(null);
  };

  if (!app) {
    Alert.alert('Error', 'App not found');
    router.back();
    return null;
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <AppDetailSheet
        app={app}
        isVisible={true}
        onClose={handleClose}
        onScreenshotPress={handleScreenshotPress}
      />
      
      {/* Screenshot Modal */}
      <Modal
        visible={!!selectedScreenshot}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseScreenshot}
      >
        {/* Add screenshot viewer here if needed */}
      </Modal>
    </View>
  );
} 