import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Gift, Home, User } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(81, 6, 6, 0.95)',
            backdropFilter: 'blur(10px)',
          },
          android: {
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            elevation: 8,
          },
          default: {},
        }),
      }}
    >
      {/* Login Screen */}
      <Tabs.Screen
        name="Login"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Home 
              size={focused ? 26 : 24} 
              // name="house.fill" 
              color={color} 
            />
          ),
        }}
      />
      
      {/* Main Home Screen */}
      <Tabs.Screen
        name="RealHome"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Home 
              size={focused ? 26 : 24} 
              // name="house.fill" 
              color={color} 
            />
          ),
        }}
      />
      
      {/* Apps/Capsules Screen */}
      {/* <Tabs.Screen
        name="Appcard"
        options={{
          title: 'Capsules',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 30 : 26} 
              name="square.grid.2x2.fill" 
              color={color} 
            />
          ),
        }}
      /> */}
      
      {/* My Page Screen */}
      <Tabs.Screen
        name="MyPage"
        options={{
          title: 'My Page',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <User 
              size={focused ? 26 : 24} 
              // name="person.circle.fill" 
              color={color} 
            />
          ),
        }}
      />
      
      {/* reward */}
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color }) => <Gift size={24} color={color} />,
          headerTitle: "Rewards & Referrals",
        }}
      />
      <Tabs.Screen
        name="inviteFriendsScreen"
        options={{
          title: 'Invite',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Gift 
              size={focused ? 26 : 24} 
              // name="person.2.badge.plus.fill" 
              color={color} 
            />
          ),
        }}
      />
      
      {/* Hidden/Modal screens - these won't show in tab bar */}
      <Tabs.Screen
        name="detail"
        options={{
          href: null,
          title: 'Detail',
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="AppDetailSheet"
        options={{
          href: null,
          title: 'App Detail',
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="ReviewCard"
        options={{
          href: null,
          title: 'Review',
          headerShown: false,
        }}
      />
      
      <Tabs.Screen
        name="ScreenShotGallery"
        options={{
          href: null,
          title: 'Gallery',
          headerShown: false,
        }}
      />

      {/* Apps/Capsules Screen */}
      <Tabs.Screen
        name="Appcard"
        options={{
          href: null,
          title: 'Detail',
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
