class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not '${arg}'`);
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

    const invalidPatterns = [
      /\+\+/,  
      /\+[*\/]/, 
      /[*\/]\+/, 
      /[*]{2}/,  
      /\/\//,    
      /\*\/|\/\*/, 
      /-\*|-\//   
    ];

    for (let p of invalidPatterns) {
      if (p.test(cleaned)) throw new InvalidExprError();
    }

    if (/^[+/*]/.test(cleaned)) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    if (/[+\-*/]$/.test(cleaned)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    return eval(cleaned);

  } catch (e) {
    throw e;
  }
}

function run() {
  const expr = document.getElementById("input1").value;

  try {
    evalString(expr);
    alert("passed");
  } catch (e) {
    alert("failed");
    throw e;    
  }
}
