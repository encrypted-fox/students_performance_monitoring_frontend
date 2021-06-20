export interface Student {
    id?: number,
    name: string,
    first_name: string,
    last_name: string,
    fathers_name: string,
    email: string,
    average_rating: number,
    update_date: string,
    group: string
}

export interface StudentsState {
    data?: Student[],
}