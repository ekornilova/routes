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

const SelectComponent: FC<SelectFullProps> = memo(({ values, className, Icon, ...rest }) => {
  return (
    <StyledSelect className={className} IconComponent={Icon} {...rest}>
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
});

export default SelectComponent;
