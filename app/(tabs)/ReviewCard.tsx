import Colors from '@/assets/colors/colors';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface ReviewCardProps {
  author: string;
  rating: number;
  date: string;
  content: string;
}

export default function ReviewCard({ author, rating, date, content }: ReviewCardProps) {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text 
          key={i} 
          style={[
            styles.star, 
            i <= rating ? styles.filledStar : styles.emptyStar
          ]}
        >
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.ratingContainer}>
        {renderStars()}
      </View>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
  },
  date: {
    fontSize: 13,
    color: Colors.light.secondaryText,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    fontSize: 16,
    marginRight: 2,
  },
  filledStar: {
    color: '#FFD700',
  },
  emptyStar: {
    color: Colors.light.border,
  },
  content: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
});