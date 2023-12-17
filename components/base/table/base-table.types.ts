export interface TableData {
  id?: string;
  content: string;
  link?: string;
  callback?: (id?: string) => void;
}

export type TableRow = [TableData, TableData]