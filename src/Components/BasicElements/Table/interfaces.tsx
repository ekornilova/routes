export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
  format?: (value: any) => string;
}

export type AnyObject = {
  [key: string]: any;
};

export interface TableProps<T extends AnyObject> {
  columns: Column[];
  rows: T[];
  className?: string;
}
