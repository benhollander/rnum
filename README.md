# rnum

Accepts an integer as input, and returns the number in Roman Numeral format[^1]
## TODOS
- [ ] Real readme content
- [ ] Basic API functionality
- [ ] Unit Tests
- [ ] Logging
- [ ] Dockerize



## Scaling concerns
rate limiting
tighter security


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