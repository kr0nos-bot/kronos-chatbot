export enum ChatType {
    CHAT,
    ACTION,
    OTHER
}

export type Notification = {
    id: string
    // todo
}

export type Message = {
    role: string
    content: string
    type?: ChatType
}
