import { z } from 'zod';

import { MAXIMUM_INTEGER, MINIMUM_INTEGER } from './constants';

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

// Another alternative implementation using recursion is below
// There are likely a number of other ways to do this using math functions
// In this case, I wanted to lean into readability and testability as much as possible
export const getRomanNumeral = (integer: number): string => {
    try {
        const schema = z.coerce.number().min(MINIMUM_INTEGER).max(MAXIMUM_INTEGER);
        schema.parse(integer);

    } catch(e) {
        throw new Error(`bad input: ${integer}`);
    }

    // split the number into place values
    const thousands = Math.floor(integer / 1000);
    const hundreds = Math.floor((integer - thousands * 1000) / 100);
    const tens = Math.floor((integer - hundreds * 100 - thousands * 1000) / 10);
    const units = integer % 10;
    
    // Build the string starting with thousands
    let result = getThousands(thousands);
    result += getHundreds(hundreds);
    result += getTens(tens);
    result += getUnits(units);

    return result;
}

// Alternative implementation using recursion
// export const getRomanNumeral = (integer:number, previous=''):string => {
//     // Follow the logic outlined in the table at the bottom of README.md

//     const units = integer % 10;
//     const tens = Math.floor(integer / 10);
//     const hundreds = Math.floor(integer / 100);
//     const thousands = Math.floor(integer / 1000);

//     // thousands
//     if (thousands >= 1) {
//         return `${'M'.repeat(thousands)}${getRomanNumeral(integer - 1000 * thousands)}`;
//     }

//     // hundreds
//     if (hundreds === 9) {
//         return `CM${getRomanNumeral(integer - 100 * hundreds)}`;
//     }
//     if (hundreds >= 5) {
//         return `D${'C'.repeat(hundreds)}${getRomanNumeral(integer - 100 * hundreds)}`
//     }
//     if (hundreds == 4) {
//         return `CD${getRomanNumeral(integer - 100 * hundreds)}`
//     }
//     if (hundreds >= 1) {
//         return `${'C'.repeat(hundreds)}${getRomanNumeral(integer - 100 * hundreds)}`
//     }

//     // tens
//     if (integer >= 90) { return `XC${getRomanNumeral(integer - 90)}`}
//     if (integer >= 50) {
//         return `L${'X'.repeat((integer-50)/10)}${getRomanNumeral(units)}`;
//     }
//     if (integer >= 40) {
//         return `XL${getRomanNumeral(units)}`
//     }
//     if (tens >= 1) {
//         return `${'X'.repeat(tens)}${getRomanNumeral(units)}`
//     }


//     // units
//     if (integer >= 9) { return `IX${getRomanNumeral(integer-9)}`; }
//     if (integer >= 5) { return `V${'I'.repeat(integer-5)}`; }
//     if (integer >= 4) { return `IV${getRomanNumeral(integer-4)}`; }
//     if (integer >= 1) { return 'I'.repeat(integer); }
//     return '';
// }
