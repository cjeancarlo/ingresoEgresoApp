import { Action } from '@ngrx/store';

export const BEGIN_LOADING = '[UI LOADING] = loading Start';
export const END_LOADING   = '[UI LOADING] = loading Ends';

export class BeginLoadingAction  implements Action {
    readonly type =  BEGIN_LOADING;
}

export class EndLoadingAction implements Action {
    readonly type =  END_LOADING;
}

export  type Actions = BeginLoadingAction  | EndLoadingAction;
