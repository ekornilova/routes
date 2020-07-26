import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { InputLabel } from '@material-ui/core';

const StyledInputLabel = styled(InputLabel)`
  color: black;
`;

const Label: FC<{
  text?: string;
  className?: string;
}> = memo(({ text = '', className }) => {
  return <StyledInputLabel className={className}>{text}</StyledInputLabel>;
});
export default Label;
