export function getNormalizedDateString(date: Date) {
    const dayStart = date.setHours(0, 0, 0, 0);
    const newDate = new Date(dayStart);

    return newDate.toISOString();
}
