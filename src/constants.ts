export enum StorageKey {
    START_DATE = 'startDate',
    END_DATE = 'endDate',
}

export enum ErrorMessage {
    CLOSED = 'Даты закрыты для записи. Открытие в начале след года.',
    OCCUPIED = 'Выбранные даты уже заняты. Смотрите шахматку для поиска свободных дат',
}
