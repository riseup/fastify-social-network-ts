import * as dotenv from 'dotenv';
dotenv.config();

export function main() {
  console.log(`Environment variable: ${process.env.EXAMPLE_VARIABLE}`);
  return "Hello world";
}

console.log(main());