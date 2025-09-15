# TroPay App - Cấu trúc thư mục mới

## 📁 Cấu trúc thư mục

```
TroPay/
├── app/                    # Expo Router (giữ nguyên)
│   ├── _layout.tsx
│   ├── modal.tsx
│   └── (tabs)/
├── assets/                 # Static assets (giữ nguyên)
├── components/             # Components cũ (backup)
├── constants/              # Constants cũ (backup)
├── hooks/                  # Hooks cũ (backup)
└── src/                    # ✨ CẤU TRÚC MỚI
    ├── components/         # Reusable components
    │   ├── common/         # Common components
    │   ├── ui/             # Basic UI components
    │   ├── forms/          # Form components
    │   └── index.ts        # Export file
    ├── screens/            # Screen components
    │   ├── Home/
    │   ├── Explore/
    │   └── index.ts
    ├── navigation/         # Navigation configuration
    ├── services/           # API & external services
    │   ├── api/            # API calls
    │   ├── storage/        # Storage management
    │   └── index.ts
    ├── utils/              # Utility functions
    │   ├── validators.ts   # Form validation
    │   ├── formatters.ts   # Data formatting
    │   ├── constants.ts    # App constants
    │   └── index.ts
    ├── hooks/              # Custom hooks
    ├── store/              # State management
    ├── types/              # TypeScript definitions
    ├── styles/             # Global styles & themes
    └── index.ts            # Main export file
```

## 🚀 Cách sử dụng

### Import từ cấu trúc mới:

```typescript
// Components
import { ThemedText, ThemedView, HelloWave } from '@/src/components';

// Screens
import { HomeScreen, ExploreScreen } from '@/src/screens';

// Services
import { authService, storageService } from '@/src/services';

// Utils
import { validateEmail, formatCurrency } from '@/src/utils';

// Types
import { User, Transaction } from '@/src/types';

// Hooks
import { useColorScheme } from '@/src/hooks';

// Styles
import { Fonts } from '@/src/styles';
```

### Hoặc import trực tiếp:

```typescript
import { ThemedText } from '@/src/components/common/themed-text';
import { authService } from '@/src/services/api/auth';
import { validateEmail } from '@/src/utils/validators';
```

## 📝 Migration Guide

### Thay đổi import paths:

**Cũ:**
```typescript
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Fonts } from '@/constants/theme';
```

**Mới:**
```typescript
import { ThemedText } from '@/src/components/common/themed-text';
import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { Fonts } from '@/src/styles/theme';
```

## 🎯 Lợi ích

1. **Tổ chức rõ ràng**: Mỗi thư mục có mục đích cụ thể
2. **Dễ mở rộng**: Thêm features mới một cách có hệ thống
3. **Team collaboration**: Nhiều dev có thể làm việc song song
4. **Type safety**: TypeScript definitions tập trung
5. **Reusability**: Components và utils dễ tái sử dụng

## 📋 Todo

- [ ] Cập nhật tất cả import paths trong app/
- [ ] Thêm store management (Redux/Zustand)
- [ ] Tạo navigation configuration
- [ ] Thêm authentication screens
- [ ] Setup testing structure
- [ ] Cài đặt dependencies cho storage services

## 🔧 Dependencies cần thêm

```bash
npm install @react-native-async-storage/async-storage
npm install expo-secure-store
```

## 📖 Tài liệu

- Các file cũ vẫn được giữ nguyên làm backup
- Cấu trúc mới nằm trong thư mục `src/`
- Tất cả exports đều có trong `src/index.ts`