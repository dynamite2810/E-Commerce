export type TPagination = {
  currentPage?: number;
  totalPage?: number;
  totalRecord?: number;
};

export type TFilterParams = {
  page?: number;
  size?: number;
  query?: string;
  sortBy?: string;
  sortType?: 'ASC' | 'DESC';
};
