import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Invoice } from '../../../types/tenant';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { IconSymbol } from '../../ui/icon-symbol';

interface InvoiceCardProps {
  invoice: Invoice;
  onPayPress: () => void;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice, onPayPress }) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Due Soon':
        return 'warning';
      case 'Overdue':
        return 'error';
      case 'Paid':
        return 'success';
      default:
        return 'neutral';
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <Card style={styles.container} backgroundColor="#FFF7ED">
      <View style={styles.header}>
        <Text style={styles.title}>Current Invoice</Text>
        <Badge variant={getStatusVariant(invoice.status) as any}>
          {invoice.status}
        </Badge>
      </View>

      <View style={styles.amountSection}>
        <Text style={styles.amountLabel}>Total Amount Due</Text>
        <Text style={styles.amount}>{formatCurrency(invoice.totalAmount)}</Text>
        <Text style={styles.dueDate}>Due: {invoice.dueDate}</Text>
      </View>

      <Button
        onPress={onPayPress}
        style={styles.payButton}
        fullWidth
      >
        <View style={styles.buttonContent}>
          <IconSymbol name="creditcard.fill" size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Pay Now with VNPay</Text>
        </View>
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
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
  amountSection: {
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  payButton: {
    backgroundColor: '#4F46E5',
    height: 52,
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
});