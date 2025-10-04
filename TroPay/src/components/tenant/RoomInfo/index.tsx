import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RoomInfo as RoomInfoType } from '../../../types/tenant';
import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';
import { IconSymbol } from '../../ui/icon-symbol';

interface RoomInfoProps {
  roomInfo: RoomInfoType;
  onPress?: () => void;
}

export const RoomInfo: React.FC<RoomInfoProps> = ({ roomInfo, onPress }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Expired':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent style={styles.container} onPress={onPress}>
      <Card style={styles.cardInner}>
        <View style={styles.header}>
          <Text style={styles.title}>Room & Contract</Text>
          {onPress && (
            <IconSymbol name="chevron.right" size={20} color="#6B7280" />
          )}
        </View>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Room Type</Text>
            <Text style={styles.value}>{roomInfo.roomType}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.label}>Contract Status</Text>
            <Badge variant={getStatusColor(roomInfo.contractStatus) as any}>
              {roomInfo.contractStatus}
            </Badge>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.label}>Monthly Rent</Text>
            <Text style={styles.value}>${roomInfo.monthlyRent}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.dueDate}>{roomInfo.dueDate}</Text>
          </View>
        </View>
      </Card>
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  cardInner: {
    margin: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  dueDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
});