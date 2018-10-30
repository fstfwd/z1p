const search = require("./search");
const fs = require("fs");
const path = require("path");

const memo = {};

const CODES = fs
  .readdirSync(path.resolve(__dirname, "..", "assets"))
  .map(f => f.replace(".js", ""));

const z1p = (codes, options) => {
  if (!codes || !codes.length) {
    codes = CODES;
  }

  if (codes.length === 1 && Array.isArray(codes[0])) {
    codes = codes[0];
  }

  codes = codes.filter(c => typeof c === "string").map(c => c.toUpperCase());

  const validate = codes.every(c => CODES.includes(c));

  if (!validate) {
    throw new Error(
      "Some of county codes are not supported. Provide valid codes."
    );
  }

  const methods = {
    raw: comp =>
      codes.reduce((a, v) => {
        const val = search(v, comp) || [];
        return [...a, ...val];
      }, []),
    findBy: (key, value) =>
      codes.reduce((acc, code) => {
        const memory = memo[`${code}:${key}:${value}`] || [];
        let result;

        if (memory.length) {
          result = memory;
        } else {
          result = search(code, e => e[key] === value);
          memo[`${code}:${key}:${value}`] = result;
        }

        return [...acc, ...result];
      }, [])
  };

  return methods;
};

module.exports = z1p;
