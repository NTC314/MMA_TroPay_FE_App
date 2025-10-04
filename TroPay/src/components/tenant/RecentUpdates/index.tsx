import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RecentUpdate } from '../../../types/tenant';
import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';
import { IconSymbol } from '../../ui/icon-symbol';

interface RecentUpdatesProps {
  updates: RecentUpdate[];
}

interface UpdateItemProps {
  update: RecentUpdate;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ update }) => {
  const getUpdateIcon = () => {
    switch (update.type) {
      case 'payment':
        return 'exclamationmark.triangle.fill';
      case 'issue':
        return 'checkmark.circle.fill';
      case 'notification':
        return 'bell.fill';
      case 'maintenance':
        return 'gear';
      default:
        return 'bell.fill';
    }
  };

  const getIconColor = () => {
    switch (update.type) {
      case 'payment':
        return '#F59E0B';
      case 'issue':
        return '#10B981';
      case 'notification':
        return '#3B82F6';
      case 'maintenance':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getStatusVariant = (status?: string) => {
    switch (status) {
      case 'resolved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'in-progress':
        return 'info';
      default:
        return 'neutral';
    }
  };

  return (
    <View style={styles.updateItem}>
      <View style={[styles.updateIcon, { backgroundColor: getIconColor() + '20' }]}>
        <IconSymbol name={getUpdateIcon() as any} size={20} color={getIconColor()} />
      </View>
      
      <View style={styles.updateContent}>
        <View style={styles.updateHeader}>
          <Text style={styles.updateTitle}>{update.title}</Text>
          {update.status && (
            <Badge variant={getStatusVariant(update.status) as any} size="small">
              {update.status}
            </Badge>
          )}
        </View>
        <Text style={styles.updateDescription}>{update.description}</Text>
        <Text style={styles.updateTimestamp}>{update.timestamp}</Text>
      </View>
    </View>
  );
};

export const RecentUpdates: React.FC<RecentUpdatesProps> = ({ updates }) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Recent Updates</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {updates.map((update) => (
          <UpdateItem key={update.id} update={update} />
        ))}
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  updateItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  updateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  updateTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  updateDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 16,
  },
  updateTimestamp: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});