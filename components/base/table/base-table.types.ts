export interface TableData {
  id?: string;
  content?: string;
  link?: string;
  callback?: (id?: string) => void;
  isAction?: boolean;
  payload?: string | number | boolean | Array<string | number | boolean>;
  highlightTerm?: string;
}

export type TableRow = TableData[]