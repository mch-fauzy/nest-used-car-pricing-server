export interface Filter {
  selectFields?: string[];
  filterFields?: FilterField[];
  pagination?: Pagination;
  sorts?: Sort[];
}

interface FilterField {
  field: string;
  operator: '=' | '!=' | '<' | '<=' | '>' | '>=' | 'ILIKE';
  value: string | number | boolean | null;
}

interface Pagination {
  page: number;
  limit: number;
}

interface Sort {
  field: string;
  order: 'ASC' | 'DESC';
}
