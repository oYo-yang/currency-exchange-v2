import isPrime from 'prime-number-check'
export const checkNumber = (value) => {
    return isPrime(value) ? "This number is prime": "This number is notprime";
}