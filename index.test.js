const _ = require("lodash");
const fc = require("fast-check");

const divisibleCount = (x, y, k) => {
  return _.chain(y - x)
    .range()
    .map(n => x + n)
    .reject(n => n % k)
    .size()
    .value();
};

test("works", () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer(), fc.nat(), (x, k, n) => {
      fc.pre(k !== 0);
      let y = x + n * k;
      return n === divisibleCount(x, y, k);
    })
  );
});
