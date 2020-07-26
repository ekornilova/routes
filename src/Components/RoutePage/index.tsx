import React, { FC, useState } from 'react';
// import { ExitToAppTwoTone } from '@material-ui/icons';
// import styled from 'styled-components';
import { getRoutesFromStr } from './helpers';
import { RouteI } from './interfaces';
import {
  WrapperInputStrRoutes,
  WrapperReadyStrRoutes,
  InputStrRoutes,
  ReadyStrRoutes,
  UpdateStrRoutes,
} from './styles';

export const RoutePage: FC = () => {
  const [routesStr, setRoutesStr] = useState<string>('');
  const [routes, setRoutes] = useState<RouteI[]>([]);
  const onUpdateRoutes = () => {
    setRoutes(getRoutesFromStr(routesStr));
  };
  const onChangeRoutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoutesStr(event.target.value || ('' as string));
  };
  console.log('routes', routes);
  return (
    <WrapperInputStrRoutes>
      <InputStrRoutes value={routesStr} onChange={onChangeRoutes} />
      <UpdateStrRoutes onClick={onUpdateRoutes}>UPDATE ROUTES</UpdateStrRoutes>
      <WrapperReadyStrRoutes>
        <ReadyStrRoutes>{routes.map((route) => route.id).join(', ')}</ReadyStrRoutes>
      </WrapperReadyStrRoutes>
    </WrapperInputStrRoutes>
  );
};
