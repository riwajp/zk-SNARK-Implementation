const Polynomial = require("../utils/Polynomial").Polynomial;

class Prover {
  constructor() {}

  evaluateHomomorphicPolynomial() {
    this.P_x.setExponentialValues(this.generator_exponents);
    this.p = this.P_x.evaluateWithExponentialValues();
  }

  evaluateQuotient() {
    this.h = this.h_x(this.s);
  }
}

class Verifyier {
  constructor() {}

  pickRandomPoint() {
    this.s = Math.floor(Math.random() * 20);
    return this.s;
  }

  evaluateTarget() {
    this.t = this.t_x(this.s);
    return this.t;
  }

  checkProof() {
    if (this.p == this.h * this.t) {
      return true;
    }
    return false;
  }

  evaluateGeneratorExponents() {
    //Verifyier calculates the following constants:
    // (higher order values of generator for the point s, from s raised to power 0 upto n (the order of p_x). ):
    this.generator_exponents = [];
    for (let i = 0; i <= this.n; i++) {
      let s__i = s ** i;
      let g__s__i = g ** s__i;
      this.generator_exponents.push(g__s__i);
    }
    return this.generator_exponents;
  }
}

// Polynomial functions and constants
const P_x = new Polynomial([4, 3, 1]);
P_x.setGeneratorExponentialValues([3, 9, 81]);
console.log(P_x.evaluateWithGeneratorExponentialValues());
process.exit();

const t_x = (x) => x - 2; // the function t(x) (target)

const h_x = (x) => x - 3; // the function h(x) such that h(x)=P(x)/t(x) (quotient)

const GENERATOR = 3; // the generator value

const n = 2; // the order of the polynomial p_x (P(x))

//============================================

const prover = new Prover();
const verifyier = new Verifyier();

// assign variables to the verifyier
verifyier.t_x = t_x;
verifyier.g = GENERATOR;
verifyier.n = n;

// assign variables to the prover
prover.P_x = P_x;
prover.t_x = t_x;
prover.h_x = h_x;
prover.g = GENERATOR;
prover.n = n;

// Step 1: Verifyier calculates a random point 's'.
verifyier.pickRandomPoint();

// Step 2: Verifyier calculates t=t(s).
verifyier.evaluateTarget();

// Step 3: Verify evaluates generator exponents to obfuscate the point s.
verifyier.evaluateGeneratorExponents();

// Step 4: Verifyier sends the generator exponents to the prover.
prover.generator_exponents = verifyier.generator_exponents;

//Step 5: Prover uses homomorphic property of exponentiation to calculate g__p_x and g__h_x.
