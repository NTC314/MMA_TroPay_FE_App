import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Types
import { TenantDashboardData } from '../../types/tenant';

// Services
import { tenantApiService } from '../../services/api/tenantService';

// Components
import { InvoiceCard } from '../../components/tenant/InvoiceCard';
import { QuickActions } from '../../components/tenant/QuickActions';
import { RecentUpdates } from '../../components/tenant/RecentUpdates';
import { RoomInfo } from '../../components/tenant/RoomInfo';
import { ServiceUsage } from '../../components/tenant/ServiceUsage';
import { WelcomeHeader } from '../../components/tenant/WelcomeHeader';

interface TenantDashboardProps {
  tenantId?: string; // Will be passed from navigation or context
}

export const TenantDashboard: React.FC<TenantDashboardProps> = ({ 
  tenantId = 'tenant_001' // Default for demo
}) => {
  const [dashboardData, setDashboardData] = useState<TenantDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const data = await tenantApiService.getDashboardData(tenantId);
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      Alert.alert('Error', 'Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const handlePayPress = async () => {
    if (!dashboardData?.currentInvoice) return;

    try {
      const paymentResult = await tenantApiService.processPayment(
        tenantId,
        dashboardData.currentInvoice.id,
        dashboardData.currentInvoice.totalAmount
      );
      
      // TODO: Navigate to VNPay webview or handle payment URL
      console.log('Payment URL:', paymentResult.paymentUrl);
      Alert.alert('Payment', 'Redirecting to VNPay for payment...');
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert('Error', 'Failed to process payment. Please try again.');
    }
  };

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case '1': // Report Issue
        Alert.alert('Report Issue', 'Feature coming soon!');
        break;
      case '2': // View Invoices
        Alert.alert('View Invoices', 'Feature coming soon!');
        break;
      case '3': // Feedback
        Alert.alert('Feedback', 'Feature coming soon!');
        break;
      case '4': // Contact Landlord
        Alert.alert('Contact Landlord', 'Feature coming soon!');
        break;
      default:
        break;
    }
  };

  const handleRoomInfoPress = () => {
    // For now, just show alert - will implement proper navigation later
    Alert.alert('Room & Contract', 'Navigation to Room Contract details screen');
  };

  useEffect(() => {
    fetchDashboardData();
  }, [tenantId]);

  // Update quick actions with handlers
  useEffect(() => {
    if (dashboardData) {
      const updatedActions = dashboardData.quickActions.map(action => ({
        ...action,
        action: () => handleQuickAction(action.id),
      }));
      
      setDashboardData(prev => prev ? {
        ...prev,
        quickActions: updatedActions
      } : null);
    }
  }, [dashboardData?.quickActions?.length]); // Only update when actions change

  if (loading || !dashboardData) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.loadingContainer}>
          {/* TODO: Add loading spinner */}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4F46E5"
            colors={['#4F46E5']}
          />
        }
      >
        <WelcomeHeader profile={dashboardData.profile} />
        
        <View style={styles.content}>
          <RoomInfo 
            roomInfo={dashboardData.profile.roomInfo} 
            onPress={handleRoomInfoPress}
          />
          
          <InvoiceCard 
            invoice={dashboardData.currentInvoice}
            onPayPress={handlePayPress}
          />
          
          <ServiceUsage serviceUsage={dashboardData.serviceUsage} />
          
          <QuickActions actions={dashboardData.quickActions} />
          
          <RecentUpdates updates={dashboardData.recentUpdates} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});