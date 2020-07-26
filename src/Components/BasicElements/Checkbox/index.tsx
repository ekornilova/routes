import React, { FC, ReactElement, memo } from 'react';
import styled, { css } from 'styled-components';
import { Checkbox, FormControl, FormControlLabel, Tooltip } from '@material-ui/core';

const StyledForm = styled(memo(FormControl))<{ component?: string; block?: boolean }>`
  ${({ block }) => css`
    width: ${block ? '100%' : 'initial'};
    align-items: center;
    flex-direction: row;
  `}
`;

const StFormControlLabel = styled(memo(FormControlLabel))<{ block?: boolean }>`
  ${({ block }) => css`
    display: flex;
    justify-content: ${block ? 'space-between' : 'flex-start'};
    &.MuiFormControlLabel-labelPlacementStart {
      margin-left: 0px !important;
    }
    && .MuiFormControlLabel-label {
      font-style: normal;
      font-weight: 300;
    }
  `}
`;

interface CheckboxElProps {
  checked: boolean;
  label?: string | ReactElement;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  block?: boolean;
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top';
  tooltipLabel?: string;
}

const StyledCheckbox = styled(memo(Checkbox))`
  &.MuiCheckbox-root {
    background-color: white;
  }
`;

const MemoTooltip = memo(Tooltip);

const CheckboxEl: FC<CheckboxElProps> = memo(
  ({ checked, label, disabled, tooltipLabel = '', onChange, labelPlacement, block }) => {
    const checkBoxComp = (
      <StyledCheckbox checked={checked} onChange={onChange} color="default" disabled={disabled} />
    );

    const isLabel = tooltipLabel || label;

    return (
      <StyledForm component="fieldset" block={block}>
        {isLabel ? (
          <MemoTooltip title={tooltipLabel}>
            <StFormControlLabel
              control={checkBoxComp}
              label={label}
              labelPlacement={labelPlacement}
              block={block}
            />
          </MemoTooltip>
        ) : (
          checkBoxComp
        )}
      </StyledForm>
    );
  },
);

export default CheckboxEl;
