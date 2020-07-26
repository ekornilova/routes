import React, { FC } from 'react';
import Button from '@material-ui/core/Button';

const StButton: FC = ({ children, ...rest }) => {
  return (
    <Button variant="contained" color="primary" disableElevation {...rest}>
      {children}
    </Button>
  );
};
export default StButton;
