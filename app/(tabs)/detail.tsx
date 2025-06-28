import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../../assets/images/index/chevron_left.png')} 
              style={styles.backIcon} 
            />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/logo/logo_black.png')} 
              style={styles.logoImage}
            />
          </View>

          <View style={styles.form}>
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/images/index/metamask_icon.png')} 
                style={styles.socialLogo} 
              />
              <Text style={styles.socialButtonText}>MetaMask</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/images/index/phantom_icon.png')} 
                style={styles.socialLogo} 
              />
              <Text style={styles.socialButtonText}>Phantom</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.protectedByContainer}>
            <Image 
              source={require('../../assets/images/index/privy_small_logo.png')} 
              style={styles.protectedByLogo}
            />
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 448,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    width: '100%',
    padding: 32,
  },
  backButton: {
    position: 'absolute',
    top: 32,
    left: 32,
    zIndex: 1,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoImage: {
    width: 180,
    height: 50,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
  },
  socialLogo: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  socialButtonText: {
    color: '#374151',
    fontWeight: '500',
    fontSize: 14,
  },
  protectedByContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  protectedByLogo: {
    width: 118.46,
    height: 10.28,
    marginLeft: 6,
    paddingTop: 1,
    paddingBottom: 1,
    gap: 2,
  },
});

export default DetailScreen; 