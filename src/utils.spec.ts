import { getRomanNumeral, getTens, getHundreds, getThousands, getUnits } from './utils';

describe('utils - getUnits', () => {
    test('5 -> V', () => {
        expect(getUnits(5)).toBe('V');
    });
    test('4 -> IV', () => {
        expect(getUnits(4)).toBe('IV');
    });
});

describe('utils - getTens', () => {
    test('6 -> LX', () => {
        expect(getTens(6)).toBe('LX');
    });
    test('5 -> L', () => {
        expect(getTens(5)).toBe('L');
    });
    test('3 -> XXX', () => {
        expect(getTens(3)).toBe('XXX');
    });
});

describe('utils - getHundreds', () => {
    test('1 -> C', () => {
        expect(getHundreds(1)).toBe('C');
    });
    test('2 -> CC', () => {
        expect(getHundreds(2)).toBe('CC');
    });
});

describe('utils - getThousands', () => {
    test('1000 -> M', () => {
        expect(getThousands(1)).toBe('M');
    });
    test('3000 -> MMM', () => {
        expect(getThousands(3)).toBe('MMM');
    });
});

describe('utils - getRomanNumeral', () => {
    test('39 -> XXXIX', async () => {
        expect(await getRomanNumeral(39)).toBe('XXXIX');
    });
    test('246 -> CCXLVI', async () => {
        expect(await getRomanNumeral(246)).toBe('CCXLVI');
    });
    test('789 -> DCCLXXXIX', async () => {
        expect(await getRomanNumeral(789)).toBe('DCCLXXXIX');
    });
    test('2421 -> MMCDXXI', async () => {
        expect(await getRomanNumeral(2421)).toBe('MMCDXXI');
    });
    test('160 -> CLX', async () => {
        expect(await getRomanNumeral(160)).toBe('CLX');
    });
    test('207 -> CCVII', async () => {
        expect(await getRomanNumeral(207)).toBe('CCVII');
    });
    test('3999 -> MMMCMXCIX', async () => {
        expect(await getRomanNumeral(3999)).toBe('MMMCMXCIX');
    });
    test('1 -> I', async () => {
        expect(await getRomanNumeral(1)).toBe('I');
    });
    test('1337 -> MCCCXXXVII', async () => {
        expect(await getRomanNumeral(1337)).toBe('MCCCXXXVII');
    });
});
