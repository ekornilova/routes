import React, { FC, useState, memo } from 'react';
import { getRoutesFromStr } from './helpers';
import { RouteI, TabPanelProps } from './interfaces';
import CheckUserRouteComponent from './CheckUserRouteComponent';
import FindRoutesComponent from './FindRoutesComponent';
import {
  WrapperInputStrRoutes,
  WrapperReadyStrRoutes,
  InputStrRoutes,
  ReadyStrRoutes,
  UpdateStrRoutes,
  StyledTabs,
  WrapperSettingPart,
} from './styles';

const tabSettings = [
  {
    label: 'CHECK YOUR ROUTE',
    component: memo(CheckUserRouteComponent),
  },
  {
    label: 'FIND ROUTE',
    component: memo(FindRoutesComponent),
  },
];
const getComponent = (props: TabPanelProps) => (Component: FC<TabPanelProps>) => {
  return <Component {...props} />;
};
const getTabItems = (props: TabPanelProps) => {
  return tabSettings.map(({ label, component }) => {
    return {
      label,
      content: getComponent(props)(component),
    };
  });
};
export const RoutePage: FC = () => {
  const [routesStr, setRoutesStr] = useState<string>('');
  const [indexTab, setIndexTab] = useState<number>(0);
  const [data, setData] = useState<{
    routes: RouteI[];
    letters: string[];
  }>({
    routes: [],
    letters: [],
  });
  const { routes, letters } = data;
  const onUpdateRoutes = () => {
    setData(getRoutesFromStr(routesStr));
  };
  const onChangeRoutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoutesStr(event.target.value || ('' as string));
  };
  const onChangeTab = (event: React.ChangeEvent, newIdx: number) => {
    setIndexTab(newIdx);
  };

  return (
    <>
      <WrapperSettingPart>
        <WrapperInputStrRoutes>
          <InputStrRoutes
            placeholder="Please, print route settings:"
            rows={4}
            value={routesStr}
            onChange={onChangeRoutes}
          />
          <UpdateStrRoutes onClick={onUpdateRoutes}>UPDATE ROUTES</UpdateStrRoutes>
        </WrapperInputStrRoutes>
        {!!routes.length && (
          <WrapperReadyStrRoutes>
            <ReadyStrRoutes>
              {`Your route settings: ${routes.map((route) => route.id).join(', ')}`}
            </ReadyStrRoutes>
          </WrapperReadyStrRoutes>
        )}
      </WrapperSettingPart>
      {!!letters.length && (
        <StyledTabs value={indexTab} onChange={onChangeTab} items={getTabItems(data)} />
      )}
    </>
  );
};
