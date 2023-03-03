export const upFirstLetter = (text: string) => text.split("").map((e, i) => i === 0 ? e.toUpperCase() : e).join("");

export const separateCamelCase = (text: string) => text.split(/(?=[A-Z])/).join(" ");

export const separateCamelCaseAndUpFirstLetter = (text: string) => upFirstLetter(separateCamelCase(text).toLowerCase());

export const isValidDate = (date: string): boolean => new Date(date).toString() !== 'Invalid Date';