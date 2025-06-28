import Colors from '@/assets/colors/colors';
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRight, Gift, Share2, Trophy, Users } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Clipboard,
  Easing,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data
const historyData = [
  {
    id: "1",
    name: "임수정",
    date: "Oct 15, 2024",
    amount: "500 QPID",
    status: "completed",
  },
  {
    id: "2",
    name: "권기백",
    date: "Sep 28, 2024",
    amount: "500 QPID",
    status: "completed",
  },
  {
    id: "3",
    name: "도경서",
    date: "Sep 10, 2024",
    amount: "500 QPID",
    status: "pending",
  },
  {
    id: "4",
    name: "김영",
    date: "Aug 22, 2024",
    amount: "500 QPID",
    status: "completed",
  },
  {
    id: "5",
    name: "유여름",
    date: "Jun 22, 2024",
    amount: "500 QPID",
    status: "pending",
  },
  {
    id: "6",
    name: "이혜경",
    date: "Jun 19, 2024",
    amount: "200 QPID",
    status: "completed",
  },
  {
    id: "7",
    name: "강주은",
    date: "Jan 22, 2024",
    amount: "300 QPID",
    status: "completed",
  },
];

// Header Component
function InviteHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.greeting}>Invite & Earn</Text>
        <Text style={styles.username}>Invite Friends</Text>
      </View>
    </View>
  );
}

// Animated Number Component for Slot Machine Effect
function AnimatedNumber({ value, style }: { value: number; style?: any }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (value === displayValue) return;
    
    setIsAnimating(true);
    
    // Start scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1800,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
    ]).start();
    
    // Slot machine counting effect with realistic speed variation
    const duration = 2000;
    const steps = 80;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const startValue = displayValue;
    const difference = value - startValue;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      // More realistic easing - fast start, slow end
      const easedProgress = progress < 0.7 
        ? Math.pow(progress / 0.7, 0.3) * 0.85
        : 0.85 + (1 - Math.pow((1 - progress) / 0.3, 2)) * 0.15;
      
      let newValue = Math.floor(startValue + (difference * easedProgress));
      
      // Add some randomness for slot machine effect
      if (progress < 0.8 && Math.random() < 0.1) {
        newValue += Math.floor(Math.random() * 3) - 1;
      }
      
      setDisplayValue(Math.max(startValue, Math.min(value, newValue)));
      
      if (currentStep >= steps) {
        setDisplayValue(value);
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, stepDuration);

    return () => {
      clearInterval(interval);
      setIsAnimating(false);
    };
  }, [displayValue, scaleAnim, value]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <View style={[styles.animatedNumberContainer, style]}>
      <Animated.Text 
        style={[
          styles.rewardAmount,
          isAnimating && styles.animatingText,
          {
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {formatNumber(displayValue)} QPID
      </Animated.Text>
    </View>
  );
}

// Individual Digit Component for enhanced slot machine effect
function AnimatedDigit({ digit, delay = 0 }: { digit: number; delay?: number }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Reset animation
    translateY.setValue(-30);
    opacity.setValue(0);

    // Animate in with delay
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [digit, delay]);

  return (
    <Animated.Text
      style={[
        styles.digitText,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      {digit}
    </Animated.Text>
  );
}

// RewardSummary Component
function RewardSummary() {
  const totalEarned = 2000;
  const totalInvites = 7;
  const pendingRewards = 500;

  return (
    <View style={styles.rewardSummaryContainer}>
      <LinearGradient
        colors={[Colors.light.primary, '#7C3AED']}
        style={styles.rewardCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.rewardHeader}>
          <Text style={styles.rewardTitle}>Total Rewards Earned</Text>
          <Trophy size={24} color="white" />
        </View>
        <AnimatedNumber value={totalEarned} />
        <Text style={styles.rewardSubtitle}>더 많은 친구를 초대하세요~~</Text>
      </LinearGradient>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Users size={20} color={Colors.light.primary} />
          </View>
          <Text style={styles.statValue}>{totalInvites}</Text>
          <Text style={styles.statLabel}>Total Invites</Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Gift size={20} color={Colors.light.warning} />
          </View>
          <Text style={styles.statValue}>{pendingRewards}</Text>
          <Text style={styles.statLabel}>Pending Rewards</Text>
        </View>
      </View>
    </View>
  );
}

// ReferralInvitation Component
function ReferralInvitation() {
  const inviteLink = 'https://qupid.app/invite?ref=USER123ABC';
  
  const handleCopyLink = async () => {
    try {
      await Clipboard.setString(inviteLink);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy link');
    }
  };

  const handleShare = async () => {
    try {
      // In a real app, you would use React Native's Share API
      Alert.alert('공유하기', '링크가 복사되었어요~ 공유');
    } catch (error) {
      Alert.alert('에러..', 'Failed to share');
    }
  };

  return (
    <View style={styles.inviteContainer}>
      <Text style={styles.inviteTitle}>초대 코드 & 리워드 받기</Text>
      <Text style={styles.inviteDescription}>
        친구 초대 후 리워드 받자~ 
        최대 500 QPID 받을 수 있어요!
      </Text>

      {/* <View style={styles.linkContainer}>
        <Text style={styles.linkText} numberOfLines={1}>
          {inviteLink}
        </Text>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
          <Copy size={18} color="white" />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Share2 size={20} color="white" />
        <Text style={styles.shareButtonText}>링크 공유하기</Text>
      </TouchableOpacity>

      <View style={styles.rewardInfo}>
        <Text style={styles.rewardInfoText}>
          💰 친구 가입 완료 시 500 QPID 받을 수 있어요!
        </Text>
        <Text style={styles.rewardInfoText}>
          🎁 친구도 보너스 리워드 받을 수 있다~
        </Text>
      </View>
    </View>
  );
}

// ReferralHistory Component
function ReferralHistory() {
  const [showAll, setShowAll] = useState(false);
  const displayData = showAll ? historyData : historyData.slice(0, 3);

  const renderHistoryItem = ({ item, index }: { item: typeof historyData[0]; index: number }) => {
    const isLast = index === displayData.length - 1;
    
    return (
      <View style={[styles.historyItem, isLast && styles.historyItemLast]}>
        <View style={styles.historyItemLeft}>
          <Text style={styles.historyName}>{item.name}</Text>
          <Text style={styles.historyDate}>{item.date}</Text>
        </View>
        <View style={styles.historyItemRight}>
          <Text style={styles.historyAmount}>+{item.amount}</Text>
          <View style={[
            styles.statusBadge,
            item.status === "completed" ? styles.statusCompleted : styles.statusPending
          ]}>
            <Text style={[
              styles.statusText,
              item.status === "completed" ? styles.statusCompletedText : styles.statusPendingText
            ]}>
              {item.status === "completed" ? "Completed" : "Pending"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.historySection}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>리워드 이력 보기</Text>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => setShowAll(!showAll)}
        >
          <Text style={styles.viewAllText}>
            {showAll ? '닫기' : '전체보기'}
          </Text>
          <ChevronRight 
            size={16} 
            color={Colors.light.primary}
            style={[
              styles.chevron,
              showAll && styles.chevronRotated
            ]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.historyContainer}>
        {displayData.length > 0 ? (
          <FlatList
            data={displayData}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Users size={48} color={Colors.light.secondaryText} />
            <Text style={styles.emptyStateTitle}>No referrals yet</Text>
            <Text style={styles.emptyStateDescription}>
              Start inviting friends to see your referral history here
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

// Main Component
const InviteFriendsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <InviteHeader />
        <RewardSummary />
        <ReferralInvitation />
        <ReferralHistory />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },

  // RewardSummary Styles
  rewardSummaryContainer: {
    padding: 20,
  },
  rewardCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    opacity: 0.9,
  },
  rewardAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  rewardSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.secondaryText,
    textAlign: 'center',
  },

  // ReferralInvitation Styles
  inviteContainer: {
    marginHorizontal: 20,
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  inviteTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  inviteDescription: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  linkContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  linkText: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.text,
    marginRight: 12,
  },
  copyButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  rewardInfo: {
    backgroundColor: `${Colors.light.primary}10`,
    borderRadius: 12,
    padding: 16,
  },
  rewardInfoText: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 4,
    lineHeight: 20,
  },

  // ReferralHistory Styles
  historySection: {
    marginHorizontal: 20,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.light.primary,
    marginRight: 4,
    fontWeight: '500',
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '90deg' }],
  },
  historyContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
    overflow: 'hidden',
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  historyItemLast: {
    borderBottomWidth: 0,
  },
  historyItemLeft: {
    flex: 1,
  },
  historyItemRight: {
    alignItems: "flex-end",
  },
  historyName: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 13,
    color: Colors.light.secondaryText,
  },
  historyAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.light.primary,
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: `${Colors.light.success}20`,
  },
  statusPending: {
    backgroundColor: `${Colors.light.warning}20`,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  statusCompletedText: {
    color: Colors.light.success,
  },
  statusPendingText: {
    color: Colors.light.warning,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 12,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    textAlign: 'center',
    lineHeight: 20,
  },
  animatedNumberContainer: {
    marginBottom: 8,
  },
  animatingText: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  digitText: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
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
});

export default InviteFriendsScreen;
