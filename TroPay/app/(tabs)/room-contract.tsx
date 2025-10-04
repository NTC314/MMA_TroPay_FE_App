import { RoomContractScreen } from '@/src/screens/RoomContract';
import React from 'react';

export default function RoomContractRoute() {
  return <RoomContractScreen onBack={() => {
    // Navigation back logic
    require('expo-router').router.back();
  }} />;
}