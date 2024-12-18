import { Devvit, IconName } from '@devvit/public-api';

export default function ActionButton({
  onPressMethod,
  label,
  size,
  iconName,
  mode,
  disabled,
}: {
  onPressMethod: () => void;
  label: string;
  size: 'small' | 'medium' | 'large';
  iconName?: IconName;
  textColor?: string;
  mode?: 'secondary' | 'primary' | 'plain' | 'bordered' | 'media' | 'destructive' | 'caution' | 'success';
  disabled?: boolean;
}): JSX.Element {
  return (
    <button
      disabled={disabled ?? false}
      icon={iconName ?? undefined}
      size={size}
      onPress={onPressMethod}
      appearance={mode ?? 'secondary'}
    >
      {size === 'small' ? label.toLowerCase() : size === 'medium' ? label : label.toUpperCase()}
    </button>
  );
}
