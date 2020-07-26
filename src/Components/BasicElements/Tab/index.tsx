import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
  index: any;
  value: any;
}

type TypeItems = {
  label: any;
  content: any;
  disabled?: boolean;
};

interface TabsWrapperProps {
  items: TypeItems[];
  onChange?: ((event: React.ChangeEvent, value: any) => void) | undefined;
  value: any;
  visibleIndicator?: boolean;
  orientation?: 'horizontal' | 'vertical';
  scrollButtons?: 'auto' | 'desktop' | 'on' | 'off';
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  textColor?: 'secondary' | 'primary' | 'inherit';
  positionAppBar?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
  backgroundColorTab?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const StyledAppBar = styled(AppBar)``;

const StyledTabs = styled(Tabs)``;

const TabWrapper: React.FC<TabsWrapperProps> = ({
  items,
  onChange,
  value,
  positionAppBar = 'static',
}) => {
  return (
    <div>
      <StyledAppBar position={positionAppBar}>
        <StyledTabs value={value} onChange={onChange} centered>
          {items.map((item, index) => (
            <Tab
              key={item.label}
              label={item.label}
              disabled={item.disabled}
              {...a11yProps(index)}
            />
          ))}
        </StyledTabs>
      </StyledAppBar>
      {items.map((item, index) => (
        <TabPanel key={item.label} value={value} index={index}>
          {item.content}
        </TabPanel>
      ))}
    </div>
  );
};

export default TabWrapper;
