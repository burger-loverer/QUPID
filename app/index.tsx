import { Redirect } from 'expo-router';
import * as SplashScreenLib from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';

// Keep the splash screen visible while we fetch resources
SplashScreenLib.preventAutoHideAsync();

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // You can add any initialization logic here
        
        // Simulate some loading time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
        // Hide the native splash screen
        await SplashScreenLib.hideAsync();
      }
    }

    prepare();
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (!isReady || showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return <Redirect href="/(tabs)/Login" />;
} 