//your code here
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

function evalString(expr) {
  try {
    const cleaned = expr.replace(/\s+/g, "");

    for (let ch of cleaned) {
      if (!/[0-9+\-*/]/.test(ch)) {
        throw new OutOfRangeError(ch);
      }
    }

    if (/[+\-*/]{2,}/.test(cleaned)) {
      throw new InvalidExprError();
    }

    if (/^[+/*]/.test(cleaned)) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    if (/[+\-*/]$/.test(cleaned)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    return eval(cleaned);
  } catch (e) {
    return e.name + ": " + e.message;
  }
}
