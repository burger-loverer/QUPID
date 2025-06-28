import Colors from '@/assets/colors/colors';
import { apps } from '@/assets/mocks/app';
import { Image } from 'expo-image';
import { Href, Link, useRouter } from 'expo-router';
import { Search, X } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

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

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

// Category Selector Component
function CategorySelector({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: CategorySelectorProps) {
  return (
    <View style={styles.categoryContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            style={({ pressed }) => [
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
              pressed && styles.pressedCategory,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

// Header Component
function AppStoreHeader() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/(tabs)/RealHome');
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>App Store</Text>
        <Text style={styles.headerSubtitle}>Discover amazing apps</Text>
      </View>
      <View style={styles.headerActions}>
        <Pressable style={styles.iconButton}>
          <Search size={20} color={Colors.light.text} />
        </Pressable>
        <Pressable style={styles.iconButton} onPress={handleClose}>
          <X size={20} color={Colors.light.text} />
        </Pressable>
      </View>
    </View>
  );
}

// Featured App Card Component
function FeaturedAppCard({ app }: { app: App }) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/appdetailsheet/${app.id}` as Href);
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.featuredContainer,
        { opacity: pressed ? 0.9 : 1 },
        { transform: [{ scale: pressed ? 0.98 : 1 }] }
      ]}
      onPress={handlePress}
    >
      <View style={styles.featuredCard}>
        <View style={styles.featuredHeader}>
          <Image
            source={{ uri: app.icon }}
            style={styles.featuredIcon}
            contentFit="cover"
            transition={300}
          />
          <View style={styles.featuredHeaderContent}>
            <Text style={styles.featuredName} numberOfLines={1}>{app.name}</Text>
            <Text style={styles.featuredCategory}>{app.category}</Text>
            <View style={styles.featuredMeta}>
              <Text style={styles.featuredRating}>★ {app.rating}</Text>
              <Text style={styles.featuredDownloads}>{app.downloads}</Text>
            </View>
          </View>
          <View style={styles.getButton}>
            <Text style={styles.getButtonText}>GET</Text>
          </View>
        </View>
        
        {app.screenshots && app.screenshots.length > 0 && (
          <Image
            source={{ uri: app.screenshots[0] }}
            style={styles.featuredScreenshot}
            contentFit="cover"
            transition={300}
          />
        )}
        
        <Text style={styles.featuredDescription} numberOfLines={2}>
          {app.description}
        </Text>
      </View>
    </Pressable>
  );
}

// Compact App Card Component
function CompactAppCard({ app }: { app: App }) {
  const href = `/appdetailsheet/${app.id}` as Href;
  
  return (
    <Link href={href} asChild>
      <Pressable style={styles.compactContainer}>
        <View style={styles.compactCard}>
          <Image
            source={{ uri: app.icon }}
            style={styles.compactIcon}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.compactContent}>
            <Text style={styles.compactName} numberOfLines={1}>{app.name}</Text>
            <Text style={styles.compactDeveloper} numberOfLines={1}>{app.developer}</Text>
            <View style={styles.compactMetaContainer}>
              <Text style={styles.compactRating}>★ {app.rating}</Text>
              <Text style={styles.compactDownloads}>{app.downloads}</Text>
            </View>
          </View>
          <View style={styles.getButton}>
            <Text style={styles.getButtonText}>GET</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

// Main Screen Component
export default function AppCardScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from apps
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(apps.map(app => app.category)));
    return ['All', ...uniqueCategories];
  }, []);

  // Filter apps based on selected category
  const filteredApps = useMemo(() => {
    if (selectedCategory === 'All') {
      return apps;
    }
    return apps.filter(app => app.category === selectedCategory);
  }, [selectedCategory]);

  const renderFeaturedApp = ({ item }: { item: App }) => (
    <FeaturedAppCard app={item} />
  );

  const renderCompactApp = ({ item }: { item: App }) => (
    <CompactAppCard app={item} />
  );

  const featuredApp = filteredApps[0];
  const remainingApps = filteredApps.slice(1);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <AppStoreHeader />
      
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <FlatList
        data={featuredApp ? [featuredApp] : []}
        renderItem={renderFeaturedApp}
        keyExtractor={(item) => `featured-${item.id}`}
        ListHeaderComponent={() => 
          featuredApp ? <Text style={styles.sectionTitle}>Featured</Text> : null
        }
        ListFooterComponent={() => (
          remainingApps.length > 0 ? (
            <View>
              <Text style={styles.sectionTitle}>
                {selectedCategory === 'All' ? 'Top Apps' : `${selectedCategory} Apps`}
              </Text>
              <FlatList
                data={remainingApps}
                renderItem={renderCompactApp}
                keyExtractor={(item) => `compact-${item.id}`}
                scrollEnabled={false}
              />
            </View>
          ) : selectedCategory !== 'All' && filteredApps.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No apps found in {selectedCategory}</Text>
            </View>
          ) : null
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.light.secondaryText,
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

  // Category Selector Styles
  categoryContainer: {
    backgroundColor: Colors.light.background,
    paddingVertical: 12,
  },
  categoryScrollContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    marginRight: 12,
  },
  selectedCategory: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  pressedCategory: {
    opacity: 0.8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.secondaryText,
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
    marginTop: 8,
  },
  listContainer: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.secondaryText,
    textAlign: 'center',
  },
  
  // Featured Card Styles
  featuredContainer: {
    marginBottom: 24,
    width: width - 32,
    alignSelf: 'center',
  },
  featuredCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featuredIcon: {
    width: 64,
    height: 64,
    borderRadius: 14,
  },
  featuredHeaderContent: {
    flex: 1,
    marginLeft: 12,
  },
  featuredName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 2,
  },
  featuredCategory: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginBottom: 4,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredRating: {
    fontSize: 13,
    color: Colors.light.secondaryText,
    marginRight: 12,
  },
  featuredDownloads: {
    fontSize: 13,
    color: Colors.light.secondaryText,
  },
  featuredScreenshot: {
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  featuredDescription: {
    fontSize: 15,
    color: Colors.light.secondaryText,
    lineHeight: 22,
  },
  
  // Compact Card Styles
  compactContainer: {
    marginBottom: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  compactIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  compactContent: {
    flex: 1,
    justifyContent: 'center',
  },
  compactName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 2,
  },
  compactDeveloper: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginBottom: 4,
  },
  compactMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactRating: {
    fontSize: 13,
    color: Colors.light.secondaryText,
    marginRight: 8,
  },
  compactDownloads: {
    fontSize: 13,
    color: Colors.light.secondaryText,
  },
  
  // Common Styles
  getButton: {
    backgroundColor: Colors.light.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  getButtonText: {
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: 14,
  },
});