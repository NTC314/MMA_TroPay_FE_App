import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  backgroundColor = '#ffffff',
  padding = 16,
  borderRadius = 12,
  shadowColor = '#000000',
  shadowOffset = { width: 0, height: 2 },
  shadowOpacity = 0.1,
  shadowRadius = 8,
  elevation = 3,
}) => {
  const cardStyle: ViewStyle = {
    backgroundColor,
    padding,
    borderRadius,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    elevation,
    ...style,
  };

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  // Additional card styles can be added here if needed
});