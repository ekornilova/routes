import { ComponentType, ChangeEvent } from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export interface SelectValue {
  label?: string | number;
  id: string | number;
}

export interface SelectFullProps {
  onChange?: (value: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
  value: string | number | null;
  values: SelectValue[];
  className?: string;
  Icon?: ComponentType<SvgIconProps>;
  labelText?: string;
  disabled?: boolean;
}

export interface SelectFormProps extends SelectFullProps {
  forForm?: boolean;
}
