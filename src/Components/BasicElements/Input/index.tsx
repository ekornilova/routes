import React, { FC, memo } from 'react';
import { InputProps } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import { StyledFormElWraper } from './styles';

export interface InputInterface {
  noMargin?: boolean;
  isInput?: boolean;
  labelText?: string;
  className?: string;
  forForm?: boolean;
  value: string;
  onChange?: (newVal: string) => void;
  [key: string]: any;
}

const InputComponent: FC<InputInterface & InputProps> = memo(
  ({ className, labelText, value, onChange, ...otherProps }) => {
    const inputComp = (
      <Input className={className} value={value} onChange={onChange} {...otherProps} />
    );

    return (
      <StyledFormElWraper
        disabled={(otherProps || {}).disabled}
        className={className}
        labelText={labelText}
      >
        {inputComp}
      </StyledFormElWraper>
    );
  },
);

export default InputComponent;
