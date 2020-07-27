//  const routes = `AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1`
import { RouteI, RouteTree, RouteResult, RouteTable } from './interfaces';

const getUniqId = (begin: string, end: string) => {
  return [begin, end].sort().join('');
};
export const getRoutesFromStr = (
  routesStr: string,
): {
  routes: RouteI[];
  table: RouteTable;
  letters: string[];
} => {
  const routes = routesStr.replace(/[\s]/g, '');
  const letters = new Set();
  let table = {};
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
          unicId: getUniqId(begin, end),
        };
        result.push(routeObj);
        letters.add(begin);
        letters.add(end);
        if (!table[begin as keyof typeof table]) {
          table = {
            ...table,
            [begin as keyof typeof table]: {},
          };
        }
        table = {
          ...table,
          [begin]: {
            ...(table[begin as keyof typeof table] as {
              [key: string]: number;
            }),
            [end]: cost,
          },
        };
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
  canTwice?: boolean,
  maxCost?: number,
  maxStop?: number,
): RouteTree | null => {
  const { cost, ids: oldIds } = result;
  const newCost = cost + route.cost;
  const extraCondition = canTwice
    ? true
    : //  !oldIds[route.unicId] || oldIds[route.unicId] < 2
      !oldIds[route.id];
  if (
    (maxCost && newCost > maxCost) ||
    (maxStop && result.route.length + 1 > maxStop + 1) ||
    !extraCondition
  ) {
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
const getRoute = (begin: string, end: string, cost: number): RouteI => {
  return {
    begin,
    end,
    cost,
    id: [begin, end, cost].join(''),
    unicId: getUniqId(begin, end),
  };
};
export const getDeliveryRoute = (
  routeTab: RouteTable,
  beginL: string,
  endL: string,
  result: RouteTree,
  canTwice?: boolean,
  maxCost?: number,
  maxStop?: number,
): RouteTree => {
  if (routeTab[beginL]) {
    const possibleRoutes = Object.entries(routeTab[beginL]).map(([end, cost]) => {
      return getRoute(beginL, end, cost);
    });
    if (possibleRoutes.length) {
      possibleRoutes.forEach((route) => {
        const newRouteForArr = getNextRoute(result, route, canTwice, maxCost, maxStop);
        if (!newRouteForArr) {
          return;
        }
        if (canTwice ? true : route.end !== endL) {
          const continueRoute = getDeliveryRoute(
            routeTab,
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
        } else {
          result.routes.push(newRouteForArr);
        }
      });
    }
  }
  return result;
};
export const goTreeResult = (tree: RouteTree, routes: RouteResult[], endL: string) => {
  if (!tree.routes.length) {
    routes.push({
      route: tree.route,
      cost: tree.cost,
    });
  } else {
    if (tree.route[tree.route.length - 1] === endL && tree.route.length > 1) {
      routes.push({
        route: tree.route,
        cost: tree.cost,
      });
    }
    tree.routes.forEach((treeRoute) => {
      goTreeResult(treeRoute, routes, endL);
    });
  }
};
export const getRoutesResult = (
  beginLetter: string,
  endLetter: string,
  routeTab: RouteTable,
  canTwice?: boolean,
  maxCost?: number,
  maxStop?: number,
): RouteResult[] => {
  const result = getDeliveryRoute(
    routeTab,
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
  goTreeResult(result, treeResult, endLetter);
  return treeResult.sort((a, b) => {
    return a.cost - b.cost;
  });
};
export const checkUserRoute = (userRoute: string[], routeTab: RouteTable): RouteResult[] => {
  const userRouteLength = userRoute.length;
  let cost = 0;
  let beginLetter = userRoute[0];
  let idx = 1;
  let canGo = true;
  while (idx < userRouteLength && canGo) {
    const nextLetter = userRoute[idx];
    if (routeTab[beginLetter] && routeTab[beginLetter][nextLetter]) {
      cost += routeTab[beginLetter][nextLetter];
      beginLetter = nextLetter as string;
      idx += 1;
    } else {
      canGo = false;
    }
  }
  return idx === userRouteLength
    ? [
        {
          route: userRoute,
          cost,
        },
      ]
    : [];
};
