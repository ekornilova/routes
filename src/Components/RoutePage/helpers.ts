//  const routes = `AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1`
import { RouteI, RouteTree, RouteResult, RouteTable } from './interfaces';

export const getRoutesFromStr = (
  routesStr: string,
): {
  routes: RouteI[];
  table: RouteTable;
  letters: string[];
} => {
  const routes = routesStr.replace(/[\s]/g, '');
  const letters = new Set();
  const table = {};
  const routesResult = routes.split(',').reduce((result: RouteI[], route: string) => {
    if (route.match(/^[a-z]{2}[0-9]+$/i)) {
      const [begin, end] = route.slice(0, 2).split('');
      const cost = Number(route.slice(2));
      if (cost && begin !== end) {
        const routeObj: RouteI = {
          begin,
          end,
          cost,
          id: route,
        };
        result.push(routeObj);
        letters.add(begin);
        letters.add(end);
        if (!table[begin as keyof typeof table]) {
          table[begin] = {};
        }
        table[begin][end] = cost;
      }
    }
    return result;
  }, []);

  return {
    routes: routesResult,
    letters: Array.from(letters) as string[],
    table,
  };
};

export const getNextRoute = (
  result: RouteTree,
  route: RouteI,
  maxCost?: number,
  maxStop?: number,
): RouteTree | null => {
  const { cost, ids: oldIds } = result;
  const newCost = cost + route.cost;
  if ((maxCost && newCost > maxCost) || (maxStop && result.route.length + 1 > maxStop)) {
    return null;
  }
  const newRoute = result.route.concat([route.end]);
  const ids = {
    ...oldIds,
  };
  if (ids[route.id]) {
    ids[route.id] += 1;
  } else {
    ids[route.id] = 1;
  }
  const newRouteForArr = {
    routes: [],
    route: newRoute,
    cost: newCost,
    ids,
  };
  return newRouteForArr;
};
export const getDeliveryRoute = (
  routesArr: RouteI[],
  beginL: string,
  endL: string,
  result: RouteTree,
  canTwice?: boolean,
  maxCost?: number,
  maxStop?: number,
): RouteTree => {
  const findRoute = routesArr.find((route) => route.begin === beginL && route.end === endL);
  if (!findRoute) {
    const possibleRoutes = routesArr.filter((route) => {
      const extraCondition = canTwice
        ? !result.ids[route.id] || result.ids[route.id] < 2
        : !result.ids[route.id];
      return route.begin === beginL && extraCondition;
    });
    if (possibleRoutes.length) {
      possibleRoutes.forEach((route) => {
        const newRouteForArr = getNextRoute(result, route, maxCost, maxStop);
        if (!newRouteForArr) {
          return;
        }
        const continueRoute = getDeliveryRoute(
          routesArr,
          route.end,
          endL,
          newRouteForArr,
          canTwice,
          maxCost,
          maxStop,
        );
        if (
          !continueRoute.routes.length &&
          continueRoute.route[continueRoute.route.length - 1] !== endL
        ) {
          return;
        }
        result.routes.push(continueRoute);
      });
    }
    return result;
  }
  const findNextRoute = getNextRoute(result, findRoute, maxCost, maxStop);
  if (findNextRoute) {
    result.routes.push(findNextRoute);
  }
  return result;
};
export const goTreeResult = (tree: RouteTree, routes: RouteResult[]) => {
  if (!tree.routes.length) {
    routes.push({
      route: tree.route,
      cost: tree.cost,
    });
  } else {
    tree.routes.forEach((treeRoute) => {
      goTreeResult(treeRoute, routes);
    });
  }
};
export const getRoutesResult = (
  beginLetter: string,
  endLetter: string,
  routesArr: RouteI[],
  canTwice?: boolean,
  maxCost?: number,
  maxStop?: number,
): RouteResult[] => {
  const result = getDeliveryRoute(
    routesArr,
    beginLetter,
    endLetter,
    {
      cost: 0,
      routes: [],
      ids: {},
      route: [beginLetter],
    },
    canTwice,
    maxCost,
    maxStop,
  );
  const treeResult: RouteResult[] = [];
  goTreeResult(result, treeResult);
  return treeResult.sort((a, b) => {
    return a.cost - b.cost;
  });
};
export const checkUserRoute = (userRoute: string[], routeTab: RouteTable): RouteResult[] => {
  // const copyUserRoute = [...userRoute];
  const userRouteLength = userRoute.length;
  let cost = 0;
  let beginLetter = userRoute[0];
  // const route = [beginLetter]
  let idx = 1;
  let canGo = true;
  while (idx < userRouteLength && canGo) {
    const nextLetter = userRoute[idx];
    if (routeTab[beginLetter] && routeTab[beginLetter][nextLetter]) {
      cost += routeTab[beginLetter][nextLetter];
      beginLetter = nextLetter as string;
      // route.push(nextLetter);
      idx += 1;
    } else {
      canGo = false;
    }
  }
  console.log('routeTab', routeTab, idx, cost);
  return idx === userRouteLength
    ? [
        {
          route: userRoute,
          cost,
        },
      ]
    : [];
};
