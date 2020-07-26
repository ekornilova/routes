import React from 'react';
import styled, { css } from 'styled-components';
import Select from './Select';
import { SelectFormProps } from './intefaces';
import FormElWrapper from '../FormElWraper';

// const StyledFormElWrapper = styled(FormElWrapper)`
//   ${({ theme }) => css`
//     .MuiFormLabel-root {
//       font-weight: ${theme.select.fontWeight};
//       color: ${theme.formSelect.labelMiddle};
//       &.MuiInputLabel-shrink {
//         color: ${theme.formSelect.labelTopColor};
//       }
//       &.Mui-focused {
//         color: ${theme.formSelect.labelTopFocusedColor};
//       }
//       &.Mui-disabled {
//         color: ${theme.input.primary.colorDisabled};
//       }
//     }
//   `}
// `;
const StyledSelect = styled(Select)`
  ${() => css`
    min-width: 160px;
  `}
`;

const SelectFullComponent: React.FC<SelectFormProps> = ({
  forForm,
  labelText,
  className,
  disabled,
  ...rest
}) => {
  const selectComponent = (
    <StyledSelect className={className} labelText={labelText} disabled={disabled} {...rest} />
  );
  return forForm ? (
    <FormElWrapper className={className} labelText={labelText} disabled={disabled}>
      {selectComponent}
    </FormElWrapper>
  ) : (
    selectComponent
  );
};

export default SelectFullComponent;
