// Classes for Prover and Verifyier
class Prover {
  constructor() {}

  evaluatePolynomial() {
    this.p = this.P_x(this.s);
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
}

// Polynomial functions
const P_x = (x) => (x - 2) * (x - 3); // the function P(x) (polynomial)

const t_x = (x) => x - 2; // the function t(x) (target)

const h_x = (x) => x - 3; // the function h(x) such that h(x)=P(x)/t(x) (quotient)

//============================================

const prover = new Prover();
const verifyier = new Verifyier();

// assign variables to the verifyier
verifyier.t_x = t_x;

// assign variables to the prover
prover.P_x = P_x;
prover.t_x = t_x;
prover.h_x = h_x;

// START======================================

// Step 1: Verifyier calculates a random point 's'.
verifyier.pickRandomPoint();

// Step 2: Verifyier calculates t=t(s).
verifyier.evaluateTarget();

// Step 3: Verifyier sends the random point 's' to the prover.
prover.s = verifyier.s;

// Step 4: Prover evaluates h=h(s), p=p(s)
prover.evaluatePolynomial();
prover.evaluateQuotient();

// Step 5: Prover sends value of p and h to the verifyier.
verifyier.p = prover.p;
verifyier.h = prover.h;

// Step 6: Verifyier tests if p=h*t
console.log(verifyier.checkProof());
