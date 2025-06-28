import Colors from '@/assets/colors/colors';
import { capsules } from '@/assets/mocks/capsules';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Plus, X } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// const { width } = Dimensions.get('window');

interface UserProfile {
  id: string;
  username: string;
  email: string;
  capsuleCount: number;
  rewardPoints: number;
  profileImage?: string;
  followers: number;
}

interface StatItem {
  value: string;
  label: string;
}

interface Capsule {
  id: string;
  title: string;
  description: string;
  heart: number;
  refferer: number;
  thumbnail: string;
  category: string;
  tags: string[];
}

interface NewCapsule {
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  tags: string[];
}

// Mock user data
const mockUser: UserProfile = {
  id: '1',
  username: 'user123',
  email: 'user@example.com',
  capsuleCount: 24,
  rewardPoints: 1250,
  followers: 12,
};

// Header Component
function MyPageHeader({ username }: { username: string }) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.greeting}>My Page</Text>
        <Text style={styles.username}>@{username}</Text>
      </View>
      <View style={styles.headerActions}>
        <Pressable style={styles.iconButton}>
          <Image source={require('../../assets/images/authHome/setting_icon.png')} style={styles.settingsIcon} />
        </Pressable>
      </View>
    </View>
  );
}

// Profile Section Component
function ProfileSection({ user }: { user: UserProfile }) {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access camera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Select Image',
      'Choose how you want to select an image',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const stats: StatItem[] = [
    { value: user.capsuleCount.toString(), label: 'Capsules' },
    { value: user.rewardPoints.toString(), label: 'Rewards' },
    { value: user.followers.toString(), label: 'Followers' },
  ];

  return (
    <View style={styles.profileContainer}>
      {/* Profile Image */}
      <Pressable style={styles.avatarContainer} onPress={showImagePicker}>
        <View style={styles.avatarBorder}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Camera size={32} color={Colors.light.secondaryText} />
              <Text style={styles.avatarText}>Add Photo</Text>
            </View>
          )}
        </View>
        <View style={styles.cameraIcon}>
          <Camera size={16} color="white" />
        </View>
      </Pressable>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* best3 capsule */}
      <View style={styles.bestCapsuleContainer}>
        <Text style={styles.bestCapsuleTitle}>Best 3 Capsules</Text>
        <View style={styles.bestCapsuleList}>
          {capsules
            .sort((a, b) => b.refferer - a.refferer)
            .slice(0, 3)
            .map((capsule, index) => (
              <View key={capsule.id} style={styles.bestCapsuleItem}>
                <Image
                  source={{ uri: capsule.thumbnail }}
                  style={styles.bestCapsuleImage}
                  contentFit="cover"
                />
                <Text style={styles.bestCapsuleItemTitle} numberOfLines={1}>
                  {capsule.title}
                </Text>
                <Text style={styles.bestCapsuleRefferer}>
                  🔗 {capsule.refferer}
                </Text>
              </View>
            ))}
        </View>
      </View>
      {/* capsule list */}
    </View>
  );
}

// Add Capsule Modal Component
function AddCapsuleModal({ 
  visible, 
  onClose, 
  categories,
  onAddCapsule 
}: { 
  visible: boolean;
  onClose: () => void;
  categories: string[];
  onAddCapsule: (capsule: NewCapsule) => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');
  const [tags, setTags] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedCategory('');
    setThumbnailUri('');
    setTags('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const pickThumbnail = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setThumbnailUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !selectedCategory) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const newCapsule: NewCapsule = {
      title: title.trim(),
      description: description.trim(),
      category: selectedCategory,
      thumbnail: thumbnailUri || 'https://placehold.co/500x300/E0E0E0/FFFFFF?text=No+Image',
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    };

    onAddCapsule(newCapsule);
    handleClose();
    Alert.alert('Success', 'Capsule added successfully!');
  };

  const availableCategories = categories.filter(cat => cat !== 'all');

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add New Capsule</Text>
          <Pressable onPress={handleClose} style={styles.closeButton}>
            <X size={24} color={Colors.light.text} />
          </Pressable>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          {/* Title Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Title *</Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter capsule title"
              placeholderTextColor={Colors.light.secondaryText}
            />
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter capsule description"
              placeholderTextColor={Colors.light.secondaryText}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Category Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Category *</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categorySelector}>
              {availableCategories.map((category) => (
                <Pressable
                  key={category}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && styles.selectedCategoryChip,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      selectedCategory === category && styles.selectedCategoryChipText,
                    ]}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Thumbnail */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Thumbnail</Text>
            <Pressable style={styles.thumbnailPicker} onPress={pickThumbnail}>
              {thumbnailUri ? (
                <Image source={{ uri: thumbnailUri }} style={styles.thumbnailPreview} contentFit="cover" />
              ) : (
                <View style={styles.thumbnailPlaceholder}>
                  <Plus size={32} color={Colors.light.secondaryText} />
                  <Text style={styles.thumbnailPlaceholderText}>Add Thumbnail</Text>
                </View>
              )}
            </Pressable>
          </View>

          {/* Tags Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tags</Text>
            <TextInput
              style={styles.textInput}
              value={tags}
              onChangeText={setTags}
              placeholder="Enter tags separated by commas"
              placeholderTextColor={Colors.light.secondaryText}
            />
            <Text style={styles.inputHint}>Separate tags with commas (e.g. music, relaxing, morning)</Text>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <Pressable style={styles.cancelButton} onPress={handleClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Add Capsule</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

// Category Selector Component
function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCapsule,
}: {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddCapsule: () => void;
}) {
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
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </Pressable>
        ))}
        
        {/* Add Capsule Button */}
        <Pressable style={styles.addButton} onPress={onAddCapsule}>
          <Plus size={20} color="white" />
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

// Capsule Thumbnail Component
function CapsuleThumbnail({ capsule }: { capsule: Capsule }) {
  return (
    <Pressable style={styles.thumbnailContainer}>
      <Image
        source={{ uri: capsule.thumbnail }}
        style={styles.thumbnailImage}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.thumbnailOverlay}>
        <Text style={styles.thumbnailTitle} numberOfLines={1}>
          {capsule.title}
        </Text>
        <View style={styles.thumbnailStats}>
          <Text style={styles.thumbnailHeart}>❤️ {capsule.heart}</Text>
          <Text style={styles.thumbnailRef}>🔗 {capsule.refferer}</Text>
        </View>
      </View>
    </Pressable>
  );
}

// Main MyPage Component
export default function MyPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [userCapsules, setUserCapsules] = useState<Capsule[]>([]);

  // Extract unique categories from capsules
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(capsules.map(capsule => capsule.category)));
    return ['all', ...uniqueCategories];
  }, []);

  // Combine original capsules with user-added capsules
  const allCapsules = useMemo(() => {
    return [...capsules, ...userCapsules];
  }, [userCapsules]);

  // Filter capsules based on selected category
  const filteredCapsules = useMemo(() => {
    if (selectedCategory === 'all') {
      return allCapsules;
    }
    return allCapsules.filter(capsule => capsule.category === selectedCategory);
  }, [selectedCategory, allCapsules]);

  const handleAddCapsule = (newCapsule: NewCapsule) => {
    const capsuleWithId: Capsule = {
      ...newCapsule,
      id: Date.now().toString(),
      heart: 0,
      refferer: 0,
    };
    setUserCapsules(prev => [...prev, capsuleWithId]);
  };

  const renderCapsule = ({ item, index }: { item: Capsule; index: number }) => (
    <View style={[styles.gridItem, index % 2 === 1 && styles.gridItemRight]}>
      <CapsuleThumbnail capsule={item} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <MyPageHeader username={mockUser.username} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ProfileSection user={mockUser} />
        
        <View style={styles.sectionDivider} />
        
        <CategorySelector
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddCapsule={() => setShowAddModal(true)}
        />
        
        <View style={styles.capsulesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'all' 
                ? 'All Capsules' 
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Capsules`
              }
            </Text>
            <Text style={styles.capsuleCount}>
              {filteredCapsules.length} capsules
            </Text>
          </View>
          
          {filteredCapsules.length > 0 ? (
            <FlatList
              data={filteredCapsules}
              renderItem={renderCapsule}
              keyExtractor={(item) => item.id}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.gridContainer}
              columnWrapperStyle={styles.gridRow}
            />
            // 여기에 + 버튼 추가,캡슐 추가하기 (카테고리 등 지정할 수 있게 모달창 띄우기)
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No capsules in this category</Text>
            </View>
            // 여기에 + 버튼 추가
          )}
        </View>
      </ScrollView>

      <AddCapsuleModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        categories={categories}
        onAddCapsule={handleAddCapsule}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  settingsIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Scroll Container
  scrollContainer: {
    flex: 1,
  },

  // Profile Section Styles
  profileContainer: {
    padding: 20,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarBorder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.light.primary,
    padding: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 47,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 47,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    color: Colors.light.secondaryText,
    marginTop: 4,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.light.card,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginTop: 2,
  },
  displayName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  userNumber: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginBottom: 8,
  },
  userDescription: {
    fontSize: 14,
    color: Colors.light.text,
    textAlign: 'center',
    lineHeight: 20,
  },
  bestCapsuleContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.card,
    alignItems: 'center',
    overflow: 'visible',
  },
  bestCapsuleTitle: { 
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 20,
  },
  bestCapsuleList: {  
    flexDirection: 'row',
    justifyContent: 'center',
    width: '96%',
    gap: 15,
  },
  bestCapsuleItem: {
    width: '35%',
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  bestCapsuleImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  bestCapsuleItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
    lineHeight: 18,
  },
  bestCapsuleRefferer: {
    fontSize: 12,
    color: Colors.light.secondaryText,
    textAlign: 'center',
  },

  // Section Divider
  sectionDivider: {
    height: 8,
    backgroundColor: Colors.light.background,
  },

  // Category Selector Styles
  categoryContainer: {
    backgroundColor: Colors.light.background,
    paddingVertical: 16,
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
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.secondaryText,
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: '600',
  },

  // Add Button Styles
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.light.primary,
    marginLeft: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginLeft: 4,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginVertical: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: Colors.light.card,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categorySelector: {
    marginTop: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.light.background,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  selectedCategoryChip: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  categoryChipText: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },
  selectedCategoryChipText: {
    color: 'white',
    fontWeight: '600',
  },
  thumbnailPicker: {
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
  },
  thumbnailPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  thumbnailPlaceholder: {
    alignItems: 'center',
  },
  thumbnailPlaceholderText: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginTop: 8,
  },
  inputHint: {
    fontSize: 12,
    color: Colors.light.secondaryText,
    marginTop: 4,
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.secondaryText,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },

  // Capsules Section Styles
  capsulesSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
  },
  capsuleCount: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },
  gridContainer: {
    flexGrow: 1,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  gridItemRight: {
    marginLeft: '4%',
  },

  // Thumbnail Styles
  thumbnailContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.light.card,
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  thumbnailImage: {
    width: '100%',
    height: 120,
  },
  thumbnailOverlay: {
    padding: 12,
  },
  thumbnailTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
    lineHeight: 18,
  },
  thumbnailStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thumbnailHeart: {
    fontSize: 12,
    color: Colors.light.secondaryText,
  },
  thumbnailRef: {
    fontSize: 12,
    color: Colors.light.secondaryText,
  },

  // Empty State
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
});