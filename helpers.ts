export function getRandomValueFromArray(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

export function getRandomBirthDate(): Date {
    const year: number = 2011 - (Math.floor(Math.random() * 3)); //zabela roman: wrong random "+"
    const month: number = Math.floor(Math.random() * 12);
    const day: number = Math.floor(Math.random() * 29);
    return new Date(year, month, day);
}

 export function getFullName(firstName: string, lastName: string): string {
    return (firstName + ' ' + lastName);
 }