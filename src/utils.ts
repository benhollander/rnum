export const getThousands = (thousands: number): string => {
    return 'M'.repeat(thousands);
};

export const getHundreds = (hundreds: number):string => {
    if (hundreds === 9) return 'CM';
    if (hundreds === 4) return 'CD';
    if (hundreds >= 5) return `D${'C'.repeat(hundreds - 5)}`;
    if (hundreds >= 1) return 'C'.repeat(hundreds);

    return '';
}

export const getTens = (tens: number): string => {
    if (tens === 9) return 'XC';
    if (tens === 4) return 'XL';
    if (tens >= 5) return `L${'X'.repeat(tens - 5)}`;
    if (tens >= 1) return 'X'.repeat(tens);
    
    return '';
}

export const getUnits = (units: number): string => {
    if (units === 9) return 'IX';
    if (units === 4) return 'IV';
    if (units >= 5) return `V${'I'.repeat(units - 5)}`;
    if (units >= 1) return 'I'.repeat(units);

    return '';
}

// There are likely a number of other ways to do this using math functions and/or regex replacements
// In this case, I wanted to lean into readability and testability as much as possible
// Input validation is being handled by the validator middleware
export const getRomanNumeral = (integer: number): Promise<string> => {
    // return a Promise so that multiple calls can be run in parallel per the instructions
    return new Promise((resolve) => {

        // split the number into place values
        const thousands = Math.floor(integer / 1000);
        const hundreds = Math.floor((integer - thousands * 1000) / 100);
        const tens = Math.floor((integer - hundreds * 100 - thousands * 1000) / 10);
        const units = integer % 10;
        
        // Follow the logic outlined in the table at the bottom of README.md
        // Build the string starting with thousands
        let result = getThousands(thousands);
        result += getHundreds(hundreds);
        result += getTens(tens);
        result += getUnits(units);

        // wait at a random interval to prove that this is being run async and in parallel
        // (skip this step in proudction mode)
        if (process.env.NODE_ENV !== 'production') {
            const randomInterval = Math.floor(Math.random()*10);
            console.log(`wait for ${randomInterval}ms before resolving ${integer} -> ${result}`)
            setTimeout(() => { resolve(result) }, randomInterval);
        } else {
            resolve(result);
        }
    });
};
