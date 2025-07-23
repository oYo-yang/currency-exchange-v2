import { rejects } from "assert";
import { resolve } from "path";


export function processDate(input) {
    return new Promise((resolve, reject) => {
        if (!input) {
            return reject(new Error("No input provided"));
        }

        const result = input.toUpperCase();
        resolve(result);
    });
}

processDate("hello world")
    .then(result => console.log("Processed:", result))
    .catch(err => console.error("Error:", err.message));
