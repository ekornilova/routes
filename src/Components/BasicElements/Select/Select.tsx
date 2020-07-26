import React, { FC, memo } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';
import { SelectFullProps } from './intefaces';

const StyledSelect = styled(Select)`
  .MuiPaper-root {
    margin-top: 6px;
    margin-left: -6px;
  }
  &.MuiMenu-paper {
    margin-top: 6px;
    margin-left: -6px;
  }
`;

// const StyledMenuItem = styled(MenuItem)<{ multiple?: boolean }>`
//   ${({ theme, multiple }) => css`
//     &.MuiListItem-root.Mui-selected {
//       background-color: ${multiple ? 'grey' : theme.select.menuItemSelectedBgColor};
//       &:hover {
//         background-color: ${multiple ? 'grey' : theme.select.menuItemHoverBgColor};
//       }
//     }
//     &.MuiListItem-button {
//       font-family: inherit;
//       font-size: ${theme.select.fontSize};
//       line-height: ${theme.select.lineHeight};
//       font-weight: ${theme.select.fontWeight};
//       &:hover {
//         background-color: ${theme.select.menuItemHoverBgColor};
//       }
//     }
//   `}
// `;

const SelectComponent: FC<SelectFullProps> = memo(
  ({
    // onChange,
    // value,
    values,
    className,
    Icon,
    ...rest
  }) => {
    return (
      <StyledSelect
        // value={value || ''}
        // onChange={onChange}
        className={className}
        IconComponent={Icon}
        {...rest}
      >
        {values &&
          values.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.label ? item.label : item.id}
              </MenuItem>
            );
          })}
      </StyledSelect>
    );
  },
);

export default SelectComponent;
