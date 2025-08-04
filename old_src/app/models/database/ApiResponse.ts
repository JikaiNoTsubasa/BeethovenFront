import { TablePagination } from "./TablePagination";

export class ApiResponse{
    meta: TablePagination | null = null;
    data: any;
}