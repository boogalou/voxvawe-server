import { DialogEntity } from "../dialog/entity/dialog.entity";


export interface DialogResponse extends DialogEntity {
  account_id: string;
  username: string;
  avatar: string;
}