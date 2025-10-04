import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types
import { RoomContractData } from '../../types/roomContract';

// Services
import { roomContractApiService } from '../../services/api/roomContractService';

// Components
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { IconSymbol } from '../../components/ui/icon-symbol';

interface RoomContractScreenProps {
  tenantId?: string;
  onBack?: () => void;
}

export const RoomContractScreen: React.FC<RoomContractScreenProps> = ({
  tenantId = 'tenant_001',
  onBack
}) => {
  const [data, setData] = useState<RoomContractData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const contractData = await roomContractApiService.getRoomContractDetails(tenantId);
      setData(contractData);
    } catch (error) {
      console.error('Error fetching room contract data:', error);
      Alert.alert('Error', 'Failed to load room contract data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewContract = async () => {
    if (!data?.contract.contractId) return;

    try {
      const result = await roomContractApiService.downloadContract(data.contract.contractId);
      // TODO: Open PDF viewer or download
      Alert.alert('Contract PDF', `Download URL: ${result.downloadUrl}`);
      // Linking.openURL(result.downloadUrl);
    } catch (error) {
      Alert.alert('Error', 'Failed to download contract PDF.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Occupied':
      case 'Active':
        return 'success';
      case 'Available':
        return 'info';
      case 'Maintenance':
      case 'Expired':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return 'exclamationmark.triangle.fill';
      case 'info':
        return 'bell.fill';
      case 'success':
        return 'checkmark.circle.fill';
      default:
        return 'bell.fill';
    }
  };

  useEffect(() => {
    fetchData();
  }, [tenantId]);

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <IconSymbol name="arrow.left" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phòng & Hợp Đồng</Text>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Room Details Section */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="house.fill" size={20} color="#4F46E5" />
            <Text style={styles.sectionTitle}>Chi tiết phòng</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <IconSymbol name="house.fill" size={16} color="#6B7280" />
              <Text style={styles.infoLabel}>Số phòng</Text>
            </View>
            <Text style={styles.infoValue}>{data.room.roomNumber}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <IconSymbol name="house.fill" size={16} color="#6B7280" />
              <Text style={styles.infoLabel}>Loại phòng</Text>
            </View>
            <Text style={styles.infoValue}>{data.room.roomType}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.currencySymbol}>$</Text>
              <Text style={styles.infoLabel}>Tiền phòng</Text>
            </View>
            <Text style={styles.infoValue}>${data.room.monthlyRent}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <IconSymbol name="checkmark.circle.fill" size={16} color="#6B7280" />
              <Text style={styles.infoLabel}>Trạng thái</Text>
            </View>
            <Badge variant={getStatusColor(data.room.status) as any}>
              {data.room.status}
            </Badge>
          </View>
        </Card>

        {/* Contract Details Section */}
        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <IconSymbol name="doc.text.fill" size={20} color="#7C3AED" />
            <Text style={styles.sectionTitle}>Thông tin hợp đồng</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <IconSymbol name="clock.fill" size={16} color="#6B7280" />
              <Text style={styles.infoLabel}>Ngày ký</Text>
            </View>
            <Text style={styles.infoValue}>{data.contract.startDate}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <IconSymbol name="clock.fill" size={16} color="#6B7280" />
              <Text style={styles.infoLabel}>Ngày hết hạn</Text>
            </View>
            <Text style={styles.infoValue}>{data.contract.endDate}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.currencySymbol}>$</Text>
              <Text style={styles.infoLabel}>Tiền cọc</Text>
            </View>
            <Text style={styles.infoValue}>${data.contract.totalAmount}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <IconSymbol name="checkmark.circle.fill" size={16} color="#6B7280" />
              <Text style={styles.infoLabel}>Trạng thái</Text>
            </View>
            <Badge variant={getStatusColor(data.contract.status) as any}>
              {data.contract.status}
            </Badge>
          </View>
        </Card>

        {/* View Contract Button */}
        <View style={styles.buttonContainer}>
          <Button onPress={handleViewContract} fullWidth>
            <View style={styles.buttonContent}>
              <IconSymbol name="doc.text.fill" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>View Contract PDF</Text>
            </View>
          </Button>
        </View>

        {/* Important Notice */}
        {data.notice && (
          <View style={[styles.sectionCard, styles.noticeCard]}>
            <View style={styles.noticeHeader}>
              <IconSymbol 
                name={getNoticeIcon(data.notice.type) as any} 
                size={20} 
                color="#F59E0B" 
              />
              <Text style={styles.noticeTitle}>{data.notice.title}</Text>
            </View>
            <Text style={styles.noticeDescription}>
              {data.notice.description}
            </Text>
            {data.notice.daysRemaining && (
              <Text style={styles.daysRemaining}>
                {data.notice.daysRemaining} ngày
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  scrollContainer: {
    flex: 1,
    paddingTop: 20,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  noticeCard: {
    backgroundColor: '#FFF7ED',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginLeft: 8,
  },
  noticeDescription: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
    marginBottom: 8,
  },
  daysRemaining: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
  },
});