export enum AppRoutes {
    ROOT = '/star-wars/',
    PERSON = '/star-wars/person/:id',
    NOT_FOUND = '*',
}

export const getRoutePerson = (id: string | number) =>
    `/star-wars/person/${id}`
