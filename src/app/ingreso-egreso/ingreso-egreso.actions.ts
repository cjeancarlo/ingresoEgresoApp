import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso.model';

export const SET_ITEMS   = '[ INGRESO/EGRESO SET   ] = Set Items';
export const UNSET_ITEMS = '[ INGRESO/EGRESO UNSET ] = UnSet Items';

export class SetItemsAction  implements Action {
    readonly type =  SET_ITEMS;
    constructor (public item: IngresoEgreso[]) {

    }
}

export class UnsetItemsAction  implements Action {
    readonly type =  UNSET_ITEMS;

}

export  type Actions = SetItemsAction | UnsetItemsAction;
