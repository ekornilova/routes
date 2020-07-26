export const columns = [
  {
    id: 'route',
    label: 'Route',
    minWidth: 170,
    format: (value: string[]) => value.join(' - '),
    align: 'center',
  },
  {
    id: 'cost',
    label: 'Cost',
    minWidth: 170,
    align: 'center',
  },
];
