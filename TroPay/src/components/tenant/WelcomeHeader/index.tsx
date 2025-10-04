import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { TenantProfile } from '../../../types/tenant';
import { IconSymbol } from '../../ui/icon-symbol';

interface WelcomeHeaderProps {
  profile: TenantProfile;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ profile }) => {
  const { width } = Dimensions.get('window');

  return (
    <LinearGradient
      colors={['#4F46E5', '#7C3AED']}
      style={[styles.container, { width }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Xin chào!</Text>
            <Text style={styles.userName}>{profile.name}</Text>
          </View>
          <View style={styles.notificationIcon}>
            <IconSymbol name="bell.fill" size={24} color="#FFFFFF" />
          </View>
        </View>
        
        <View style={styles.roomCard}>
          <View style={styles.roomHeader}>
            <Text style={styles.roomLabel}>Phòng số</Text>
          </View>
          <Text style={styles.roomNumber}>{profile.roomInfo.roomNumber}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  roomHeader: {
    marginBottom: 8,
  },
  roomLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  roomNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});