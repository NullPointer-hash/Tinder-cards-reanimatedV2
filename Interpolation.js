class Lagrange {
    constructor(dataPoints2d) {
        this.dataPoints2d = dataPoints2d;
    }
    static kronecker = (i,j) => {
        return Math.floor(i/j)*Math.floor(j/i);
    }
    L(i,x) {
        var prod = 1;
        for(let j=0;j<this.dataPoints2d.length;j++) {
            prod *= i!=j ? 
            (x-this.dataPoints2d[j].x)/(this.dataPoints2d[i].x-this.dataPoints2d[j].x):
            1;
        }
        return prod;
    }
    P(x) {
        var sum = 0;
        for (let i = 0; i < this.dataPoints2d.length-1; i++) {
            sum += this.L(i,x)*this.dataPoints2d[i].y;
        }
        return sum;
    }
}
  