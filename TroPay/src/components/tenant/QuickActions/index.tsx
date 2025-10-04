import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { QuickAction } from '../../../types/tenant';
import { Card } from '../../ui/card';
import { IconSymbol } from '../../ui/icon-symbol';

interface QuickActionsProps {
  actions: QuickAction[];
}

interface ActionItemProps {
  action: QuickAction;
}

const ActionItem: React.FC<ActionItemProps> = ({ action }) => {
  return (
    <TouchableOpacity style={styles.actionItem} onPress={action.action}>
      <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
        <IconSymbol name={action.icon as any} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.actionTitle}>{action.title}</Text>
    </TouchableOpacity>
  );
};

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <ActionItem key={action.id} action={action} />
        ))}
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
});