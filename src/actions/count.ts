import { Action } from '../store';

export enum ActionTypes {
  INCREMENT = '@count/increment'
}

export const increment = (count: number): Action => ({
  type: ActionTypes.INCREMENT,
  count
});

export type Actions = ReturnType<typeof increment>;
