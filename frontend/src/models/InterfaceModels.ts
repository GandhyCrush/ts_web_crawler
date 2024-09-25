export interface Entry {
    number: number
    title: string
    points: number
    number_of_comments: number
}

export interface EntryResponse {
    result: Entry[]
}