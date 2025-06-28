import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  detail: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// For Material Icons, we'll use a simple Text component with a placeholder or replace with SVG/Vector Icons
// For actual Material Icons, you would typically use a library like 'react-native-vector-icons'
// For this example, I'll use a placeholder '✉️' for email and '💳' for wallet, and '➡️' for chevron_right.

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.loginSignupText}>Log in or sign up</Text>

              <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/logo/logo_black.png')} style={styles.logoImage}/>
              </View>

              <View style={styles.form}>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Image source={require('../../assets/images/index/email_icon.png')} style={styles.inputIcon} />
                  <TextInput
                    style={styles.emailInput}
                    placeholder="your@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
                {/* Social Login Buttons */}
                <TouchableOpacity style={styles.socialButton}>
                  <Image source={require('../../assets/images/index/google_icon.png')} style={styles.socialLogo} />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                  <Image source={require('../../assets/images/index/apple_icon.png')} style={styles.socialLogo} />
                  <Text style={styles.socialButtonText}>Apple</Text>
                </TouchableOpacity>

                {/* Continue with Wallet Button */}
                <TouchableOpacity 
                  style={styles.walletButton}
                  onPress={() => navigation.navigate('detail')}
                >
                  <View style={styles.walletButtonContent}>
                    <Image source={require('../../assets/images/index/more_icon.png')} style={styles.walletIcon} />
                    <Text style={styles.walletButtonText}>more options</Text>
                  </View>
                  <Image 
                    source={require('../../assets/images/index/chevron_right.png')} 
                    style={styles.chevronIcon} 
                  />
                </TouchableOpacity>
              </View>

              {/* Passkey Link */}
              <View style={styles.passkeyContainer}>
                <TouchableOpacity onPress={() => console.log('Passkey pressed')}>
                  <Text style={styles.passkeyLink}>I have a passkey</Text>
                </TouchableOpacity>
              </View>

              {/* Protected by Section */}
              <View style={styles.protectedByContainer}>
                {/* <Text style={styles.protectedByText}>Protected by</Text> */}
                {/* <Image source={require('../../assets/images/logo/logo_black.png')} style={styles.protectedByLogo}/> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    width: '100%',
    maxWidth: 448,
    alignItems: 'center',
    justifyContent: 'center',
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
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  logoImage: {
    width: 180,
    height: 50,
  },
  loginSignupText: {
    textAlign: 'center',
    color: '#4B5563',
    fontSize: 14,
    marginBottom: 32,
  },
  form: {
    width: '100%',
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  emailInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  submitButton: {
    paddingHorizontal: 16,
  },
  submitButtonText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
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
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
  },
  walletButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  walletButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  walletIcon: {
    width: 20,
    height: 20,
  },
  chevronIcon: {
    width: 20,
    height: 20,
  },
  passkeyContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  passkeyLink: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
  protectedByContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40, // mt-10
    fontSize: 12, // text-xs
    color: '#6B7280', // text-gray-500
    },
    protectedByLogo: {
    width :118.46,
    height: 10.28, // h-3
    marginLeft: 6, // ml-1.5 (6px) // Example width, adjust as needed
    paddingTop: 1,
    paddingBottom: 1,
    gap: 2,
    },
});

export default HomeScreen;