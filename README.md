# rnum

A REST API that accepts an integer as input, and returns the number in Roman Numeral format[^1]

## TODOS
- [ ] Logging (datadog?)
- [ ] Double-check that docker is working the right way by actually deploying somewhere

### Examples
#### Single integer
```sh
curl "http://localhost:3000/romannumeral?query=3" #output: {"input":"3","output":"III"}
```
#### Range
```sh
curl "http://localhost:3000/romannumeral?min=3&max=6" #output: {"conversions":[{"input":3,"output":"III"},{"input":4,"output":"IV"},{"input":5,"output":"V"},{"input":6,"output":"VI"}]}
```
#### Both single integer and range
```sh
curl "http://localhost:3000/romannumeral?min=3&max=6&query=2024" #output: {"conversions":[{"input":3,"output":"III"},{"input":4,"output":"IV"},{"input":5,"output":"V"},{"input":6,"output":"VI"}],"input":2024,"output":"MMXXIV"}
```
_Supports integers 1-3999_

## Dependencies
Dependencies are installed via `npm ci`. [DEPENDENCIES.md](./DEPENDENCIES.md) contains a report of all dependencies and their license data.
 
## Development
Automatically refreshes server on save for faster development
```sh
npm run dev
```

## Running in Docker
This can also be run in production mode from a [Docker](https://www.docker.com/) container
```sh
docker compose up --build
```

## Available npm commands
* `build`: generates a production build in `./build`
* `dev`: runs the server in watch mode for faster development
* `generate-license-report`: Regenerate DEPENDENCIES.md file
* `lint`: runs linter for all typescript files
* `prepare`: used by [husky](https://typicode.github.io/husky/) for precommit scripts
* `test`: runs jest unit test suite
* `test:watch`: runs unit tests in watch mode for faster development

## Future considerations
* Improve scalability - Rate limiting to prevent DDoS attacks

[^1]: Following the 'Standard form' outlined  at https://en.wikipedia.org/wiki/Roman_numerals
    | Integer | Thousands | Hundreds | Tens | Units |
    |---------|-----------|----------|------|-------|
    | 1       | M         | C        | X    | I     |
    | 2       | MM        | CC       | XX   | II    |
    | 3       | MMM       | CCC      | XXX  | III   |
    | 4       |           | CD       | XL   | IV    |
    | 5       |           | D        | L    | V     |
    | 6       |           | DC       | LX   | VI    |
    | 7       |           | DCC      | LXX  | VII   |
    | 8       |           | DCCC     | LXXX | VIII  |
    | 9       |           | CM       | XC   | IX    |