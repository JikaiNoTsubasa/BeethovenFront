import { Customer } from "./Customer";

export interface Product{
    id: number;
    name: string;
    customer: Customer | null;
    codeBaseLink: string;
}