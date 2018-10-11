// @flow
export type ITask = {
    id: string,
    dateToComplete: string,
    name: string,
    description: string,
    isDone: boolean,
    completionDate?: string
}
