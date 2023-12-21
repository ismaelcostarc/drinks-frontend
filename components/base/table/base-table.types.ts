export interface TableData {
  id?: string;
  // Conteúdo em texto da célula
  content?: string;
  // Se o conteúdo da célula for um link, esse atributo irá conter a Url
  link?: string;
  // Indica se a célula contém um botão de ação
  isAction?: boolean;
  // Função que irá ser chamada quando o conteúdo da célula for algum botão de ação
  callback?: (id?: string) => void;
  // O dado que irá ser passado para o callback
  payload?: string | number | boolean | Array<string | number | boolean>;
  // Destaca algum termo dentro do conteúdo em texto da célula
  highlightTerm?: string;
}

export type TableRow = TableData[]

export interface TableHeader {
  // Cabeçalho de cada coluna
  title: string;
  // Largura de cada coluna, de 0 a 100, sendo a porcetagem que a coluna 
  // irá ocupar da tabela inteira
  size?: number;
}