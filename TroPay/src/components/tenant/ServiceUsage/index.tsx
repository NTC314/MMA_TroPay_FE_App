import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ServiceUsage as ServiceUsageType } from '../../../types/tenant';
import { Card } from '../../ui/card';
import { IconSymbol } from '../../ui/icon-symbol';

interface ServiceUsageProps {
  serviceUsage: ServiceUsageType;
}

interface ServiceItemProps {
  icon: any;
  iconColor: string;
  label: string;
  amount: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  icon,
  iconColor,
  label,
  amount,
  unit,
  change,
  changeType,
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return '#DC2626';
      case 'decrease':
        return '#16A34A';
      default:
        return '#6B7280';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return 'arrow.up';
      case 'decrease':
        return 'arrow.down';
      default:
        return null;
    }
  };

  return (
    <View style={styles.serviceItem}>
      <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
        <IconSymbol name={icon} size={24} color={iconColor} />
      </View>
      <Text style={styles.serviceLabel}>{label}</Text>
      <Text style={styles.serviceAmount}>
        {amount} {unit}
      </Text>
      {changeType !== 'neutral' && (
        <View style={styles.changeContainer}>
          {getChangeIcon() && (
            <IconSymbol 
              name={getChangeIcon() as any} 
              size={12} 
              color={getChangeColor()} 
            />
          )}
          <Text style={[styles.changeText, { color: getChangeColor() }]}>
            {change}%
          </Text>
        </View>
      )}
      {changeType === 'neutral' && (
        <Text style={styles.neutralChange}>— 0%</Text>
      )}
    </View>
  );
};

export const ServiceUsage: React.FC<ServiceUsageProps> = ({ serviceUsage }) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Service Usage</Text>
      
      <View style={styles.servicesGrid}>
        <ServiceItem
          icon="bolt.fill"
          iconColor="#F59E0B"
          label="Electricity"
          amount={serviceUsage.electricity.amount}
          unit={serviceUsage.electricity.unit}
          change={serviceUsage.electricity.change}
          changeType={serviceUsage.electricity.changeType}
        />
        
        <ServiceItem
          icon="drop.fill"
          iconColor="#3B82F6"
          label="Water"
          amount={serviceUsage.water.amount}
          unit={serviceUsage.water.unit}
          change={serviceUsage.water.change}
          changeType={serviceUsage.water.changeType}
        />
        
        <ServiceItem
          icon="wifi"
          iconColor="#8B5CF6"
          label="Internet"
          amount={serviceUsage.internet.amount}
          unit={serviceUsage.internet.unit}
          change={serviceUsage.internet.change}
          changeType={serviceUsage.internet.changeType}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  serviceAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  neutralChange: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});