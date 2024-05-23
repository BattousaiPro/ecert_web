import { PaginRequest } from "../../../utils/PaginRequest";

export interface RolesRequest extends PaginRequest {
  name: string;// Nombres
}
export class RolesRequest {
  constructor() {
    this.name = '';
  }
}