import Colors from '@/assets/colors/colors';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Coins, RefreshCcw, Smartphone, Store } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');
// Mock data for installed apps
const installedApps = [
  {
    id: '1',
    name: 'Instagram',
    icon: 'https://logos-world.net/wp-content/uploads/2020/04/Instagram-Logo.png',
    category: 'Social'
  },
  {
    id: '2',
    name: 'Spotify',
    icon: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
    category: 'Music'
  },
  {
    id: '3',
    name: 'Netflix',
    icon: 'https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png',
    category: 'Entertainment'
  },
  {
    id: '4',
    name: 'YouTube',
    icon: 'https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg',
    category: 'Video'
  },
  {
    id: '5',
    name: 'WhatsApp',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
    category: 'Communication'
  },
  {
    id: '6',
    name: 'TikTok',
    icon: 'https://sf16-website-login.neutral.ttwstatic.com/obj/tiktok_web_login_static/tiktok/webapp/main/webapp-desktop/8152caf0c8e8bc67ae0d.png',
    category: 'Social'
  },
];

// Header Component
function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.username}>@user123</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.iconButton}>
          <RefreshCcw size={20} color={Colors.light.text} />
        </TouchableOpacity>
        <Pressable style={styles.iconButton}>
          <Image source={require('../../assets/images/authHome/setting_icon.png')} style={styles.settingsIcon} />
          {/* <Settings size={24} color={Colors.light.text} /> */}
        </Pressable>
        {/* <TouchableOpacity style={styles.iconButton}>
          <Settings size={20} color={Colors.light.text} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

// Worldcoin Card Component
function WorldcoinCard() {
  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={[Colors.light.secondary, Colors.light.primary, Colors.light.tertiary,Colors.light.quaternary]}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.logoContainer}>
            <View style={styles.qpidLogo}>
              <Image source={require('../../assets/images/logo/logo_white_q.png')} style={styles.qpidLogoImage} />
              {/* <Globe size={24} color="white" /> */}
            </View>
          </View>
          <Text style={styles.cardTitle}>QPID</Text>
        </View>
        
        <View style={styles.balanceContainer}>
          <Image source={require('../../assets/images/logo/logo_white_q.png')} style={styles.qpidLogoImage} />
          {/* <Text style={styles.balanceIcon}>Ⓦ</Text> */}
          <Text style={styles.balance}>  42.006024</Text>
        </View>
        
        <View style={styles.verifySection}>
          <Text style={styles.verifyNow}>거래 확인하기</Text>
          <Text style={styles.verifyMessage}>Verify your QPID coin</Text>
          
          <TouchableOpacity style={styles.verifyButton}>
            <Text style={styles.verifyButtonText}>GO</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

// Pagination Dots Component
// function PaginationDots({ total, current }: { total: number; current: number }) {
//   return (
//     <View style={styles.paginationContainer}>
//       {Array.from({ length: total }).map((_, index) => (
//         <View 
//           key={index} 
//           style={[
//             styles.dot, 
//             index === current ? styles.activeDot : styles.inactiveDot
//           ]} 
//         />
//       ))}
//     </View>
//   );
// }

// Quick Actions Component
function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      id: 'appstore',
      name: 'App Store',
      icon: <Store size={24} color={Colors.light.qupid_black} />,
      onPress: () => router.push('/(tabs)/Appcard')
    },
    {
      id: 'worldcoin',
      name: 'Worldcoin',
      icon: <Coins size={24} color="#FF6B35" />,
      onPress: () => console.log('Worldcoin pressed')
    },
    {
      id: 'myapps',
      name: 'My Apps',
      icon: <Smartphone size={24} color={Colors.light.secondary} />,
      onPress: () => console.log('My Apps pressed')
    },
  ];

  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Menu</Text>
      <View style={styles.actionsRow}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionItem}
            onPress={action.onPress}
          >
            <View style={styles.actionIconContainer}>
              {action.icon}
            </View>
            <Text style={styles.actionLabel}>{action.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// My Installed Apps Component
function MyInstalledApps() {
  const [showAll, setShowAll] = useState(false);
  const displayApps = showAll ? installedApps : installedApps.slice(0, 6);

  const renderApp = ({ item }: { item: typeof installedApps[0] }) => (
    <TouchableOpacity style={styles.appItem}>
      <View style={styles.appIconContainer}>
        <Image source={{ uri: item.icon }} style={styles.appIcon} />
      </View>
      <Text style={styles.appLabel} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.appCategory}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.installedAppsContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Installed Apps</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.viewAllText}>
            {showAll ? 'Show Less' : 'View All'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={displayApps}
        renderItem={renderApp}
        keyExtractor={(item) => item.id}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={styles.appsGrid}
        columnWrapperStyle={styles.appsRow}
      />
    </View>
  );
}

// Main RealHome Component
export default function RealHome() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const totalCards = 3; // Worldcoin, Bitcoin, Ethereum cards

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Header />
        
        {/* Worldcoin Card with Pagination */}
        <View style={styles.cardsSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setCurrentCardIndex(newIndex);
            }}
          >
            <View style={[styles.cardPage, { width: screenWidth }]}>
              <WorldcoinCard />
            </View>
            {/* Add more cards here if needed */}
          </ScrollView>
          
          {/* <PaginationDots total={totalCards} current={currentCardIndex} /> */}
        </View>

        <QuickActions />
        
        <MyInstalledApps />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },

  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginBottom: 2,
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  // Cards Section
  cardsSection: {
    marginBottom: 24,
  },
  cardPage: {
    paddingHorizontal: 20,
  },

  // Worldcoin Card Styles
  cardContainer: {
    paddingHorizontal: 0,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    marginVertical: 8,
    minHeight: 200,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    marginRight: 12,
  },
  qpidLogo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qpidLogoImage: {
    width: 30,
    height: 30,
  },
  cardTitle: {
    color: Colors.light.cardText,
    fontSize: 18,
    fontWeight: '600',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  balanceIcon: {
    color: Colors.light.cardText,
    fontSize: 28,
    marginRight: 8,
    opacity: 0.8,
  },
  balance: {
    color: Colors.light.cardText,
    fontSize: 32,
    fontWeight: '600',
  },
  verifySection: {
    alignItems: 'flex-start',
  },
  verifyNow: {
    color: Colors.light.cardText,
    opacity: 0.7,
    fontSize: 14,
    marginBottom: 6,
  },
  verifyMessage: {
    color: Colors.light.cardText,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
    lineHeight: 22,
  },
  verifyButton: {
    backgroundColor: Colors.light.buttonBackground,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-end',
  },
  verifyButtonText: {
    color: Colors.light.cardText,
    fontSize: 16,
    fontWeight: '600',
  },

  // Pagination Styles
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.light.text,
  },
  inactiveDot: {
    backgroundColor: Colors.light.border,
  },

  // Quick Actions Styles
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    textAlign: 'center',
  },

  // Installed Apps Styles
  installedAppsContainer: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  appsGrid: {
    paddingBottom: 16,
  },
  appsRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  appItem: {
    alignItems: 'center',
    width: '30%',
  },
  appIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  appIcon: {
    width: '100%',
    height: '100%',
  },
  appLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  appCategory: {
    fontSize: 10,
    color: Colors.light.secondaryText,
    textAlign: 'center',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});