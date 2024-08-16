import { caesarCipher } from '../src/encryption/caesarCipher';

describe('caesarCipher', () => {
    it('should encrypt "hello" with shift 3', () => {
        expect(caesarCipher('hello', 3)).toBe('khoor');
    });

    it('should encrypt "HELLO" with shift 3', () => {
        expect(caesarCipher('HELLO', 3)).toBe('KHOOR');
    });


    it('should handle negative shifts for encryption', () => {
        expect(caesarCipher('hello', -3)).toBe('ebiil');
    });


    it('should handle shifts larger than 26 for encryption', () => {
        expect(caesarCipher('hello', 29)).toBe('khoor');
    });

    it('should not change non-alphabetic characters for encryption', () => {
        expect(caesarCipher('hello, world!', 3)).toBe('khoor, zruog!');
    });



    it('should return the same string if shift is 0 for encryption', () => {
        expect(caesarCipher('hello', 0)).toBe('hello');
    });

 

    it('should handle empty strings for encryption', () => {
        expect(caesarCipher('', 3)).toBe('');
    });

    

    it('should handle shift values that are multiples of 26 for encryption', () => {
        expect(caesarCipher('hello', 26)).toBe('hello');
        expect(caesarCipher('hello', 52)).toBe('hello');
    });

    
});