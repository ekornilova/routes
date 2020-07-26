import React, { FC, memo } from 'react';
import { FormControl } from '@material-ui/core';
import styled from 'styled-components';
import Label from '../Label';

const STForm = styled(({ noMargin, ...props }) => {
  return <FormControl {...props} />;
})``;

const FormElWrapper: FC<{
  labelText?: string;
  className?: string;
  disabled?: boolean;
}> = memo(({ className, labelText, children, disabled }) => {
  let labelName = null;
  switch (labelText) {
    case 'text':
      labelName = 'Текст';
      break;
    case 'href':
      labelName = 'Ссылка';
      break;
    default:
      labelName = labelText;
  }
  return (
    <STForm className={className} disabled={disabled}>
      {labelName && <Label text={labelName} />}
      {children}
    </STForm>
  );
});
export default FormElWrapper;
