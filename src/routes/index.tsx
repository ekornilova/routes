import React from 'react';
import { RoutePage } from '../Components/RoutePage/index';

export interface RouteI {
  name: string;
  path: string;
  Component: any;
  routes?: RouteI[];
  redirect?: string;
  exact?: boolean;
}

export interface CustomSettingsI {
  Header?: React.FC;
}

export const routes: RouteI[] = [
  {
    name: 'Routes',
    path: '/',
    Component: RoutePage,
    exact: true,
  },
];
