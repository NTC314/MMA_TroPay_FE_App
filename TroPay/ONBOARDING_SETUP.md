# Hướng dẫn Setup Onboarding Auto-Show

## Cách hoạt động

Màn onboarding sẽ **tự động hiển thị** cho người dùng lần đầu tiên vào app thông qua logic sau:

### 1. Kiểm tra trạng thái Onboarding
- App sử dụng `AsyncStorage` để lưu trạng thái đã xem onboarding
- Key: `@onboarding_completed`
- Value: `'true'` khi đã hoàn thành

### 2. Flow tự động
```
App Start → OnboardingCheck → Check AsyncStorage
                              ↓
                    [First time] → Show Onboarding
                              ↓
                    [Completed] → Show Main App
```

### 3. Cấu trúc code

#### `app/_layout.tsx`
```tsx
<OnboardingCheck>
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="onboarding" options={{ headerShown: false }} />
  </Stack>
</OnboardingCheck>
```

#### `OnboardingCheck` Component
- Kiểm tra `useOnboarding()` hook
- Nếu chưa hoàn thành → Redirect đến `/onboarding`
- Nếu đã hoàn thành → Show children (main app)

## Testing

### Trong Development
1. **Reset Onboarding**: Sử dụng button "Reset Onboarding" trên màn hình chính
2. **Check Status**: Sử dụng button "Check Status" để xem trạng thái hiện tại

### Manual Reset
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reset để xem lại onboarding
await AsyncStorage.removeItem('@onboarding_completed');
```

## Customization

### Thay đổi Storage Key
Trong `src/hooks/useOnboarding.ts`:
```typescript
const ONBOARDING_KEY = '@your_custom_key';
```

### Thêm điều kiện khác
```typescript
// Ví dụ: Chỉ show onboarding cho version mới
const shouldShowOnboarding = !isOnboardingCompleted && !isOldUser;
```

## Production Notes

1. **Test Button**: Chỉ hiển thị trong development (`__DEV__`)
2. **Performance**: AsyncStorage check chỉ chạy 1 lần khi app start
3. **Error Handling**: Có fallback nếu AsyncStorage fail

## Troubleshooting

### Onboarding không hiển thị
1. Check AsyncStorage value: `@onboarding_completed`
2. Verify import paths của `OnboardingCheck`
3. Check console logs cho errors

### Loop vô tận
1. Đảm bảo `completeOnboarding()` được gọi trong onboarding
2. Check navigation paths không conflict

### Performance Issues
1. Sử dụng `React.memo` cho heavy components
2. Optimize AsyncStorage calls với cache