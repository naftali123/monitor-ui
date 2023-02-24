
export const upFirstLetter = (text: string) => text.split("").map((e, i) => i === 0 ? e.toUpperCase() : e).join("");
