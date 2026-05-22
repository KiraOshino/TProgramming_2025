
const a = 2.25;
const Xk = 1.2;
const Xh = 2.7;
const VX = 0.3;
const xMassiv = [1.31, 1.39, 1.44, 1.56, 1.92];

console.log("A");
for (let x = Xk; x <= Xh; x = x + VX) {
    const formula = x * x - 1;
    const part1 = Math.pow(a, formula);
    const part2 = Math.log10(formula);
    const part3 = Math.cbrt(formula);
    const y = part1 - part2 + part3;
    console.log("x = " + x.toFixed(2) + " -> y = " + y.toFixed(4));
}
console.log("Б");
for (let i = 0; i < xMassiv.length; i++) {
    const x = xMassiv[i];
    const formula = x * x - 1;
    const part1 = Math.pow(a, formula);
    const part2 = Math.log10(formula);
    const part3 = Math.cbrt(formula);
    const y = part1 - part2 + part3;
    console.log("x = " + x.toFixed(2) + " -> y = " + y.toFixed(4));
}
