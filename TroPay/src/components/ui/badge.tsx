import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'medium',
  style,
  textStyle,
}) => {
  const badgeStyles = [
    styles.badge,
    styles[variant],
    styles[`${size}Badge`],
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    styles[`${variant}Text`],
    textStyle,
  ];

  return (
    <View style={badgeStyles}>
      <Text style={textStyles}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  
  // Variants
  success: {
    backgroundColor: '#E8F5E8',
  },
  warning: {
    backgroundColor: '#FFF3E0',
  },
  error: {
    backgroundColor: '#FFEBEE',
  },
  info: {
    backgroundColor: '#E3F2FD',
  },
  neutral: {
    backgroundColor: '#F5F5F5',
  },

  // Sizes
  smallBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
  },
  mediumBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  largeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  // Text styles
  text: {
    fontWeight: '500',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },

  // Text colors
  successText: {
    color: '#2E7D32',
  },
  warningText: {
    color: '#F57C00',
  },
  errorText: {
    color: '#C62828',
  },
  infoText: {
    color: '#1976D2',
  },
  neutralText: {
    color: '#424242',
  },
});