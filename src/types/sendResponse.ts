interface IToolbar {
  header: string;
}

interface IFields {
  label: string;
  code: string;
  isVisible: boolean;
}

interface IOperator {
  label: string;
  value: string;
}

interface IFilters {
  field: string;
  label: string;
  operator: IOperator[];
}

interface IStructure {
  fields: IFields[];
  filters?: IFilters[];
}

export interface ISendResponse {
  message: string;
  items: object[];
  structure: IStructure;
  toolbar: IToolbar;
  page?: number;
  pageSize?: number;
  totalItems?: number;
  currentPage?: number;
  pageCount?: number;
}
