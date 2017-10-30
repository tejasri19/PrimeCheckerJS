// Algorithm hints taken from http://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/

function isPrime(num, k) {
    if(bigInt(num.toString()).eq(2))
        return true;
    if(bigInt(num.toString()).mod(2).eq(0))
        return false;
    if(bigInt(num.toString()).eq(3))
        return true;

    var d = bigInt(num.toString()).minus(1), r = 0;
    while(d.mod(2).eq(0)) {
        d = d.divide(2);
        r++;
    }

    for(var i = 0; i < k; i++) {
        if(millerTest(num, d, r) == false) {
            return false;
        }
    }

    return true;
}

function power(a, d, p) {
    a = bigInt(a.toString()).mod(bigInt(p.toString()));
    if(bigInt(d.toString()).eq(0))
        return 1;
    if(bigInt(bigInt(d).mod(2)).eq(1))
        return bigInt(bigInt(a.toString()).multiply(bigInt(power(a, d.minus(1), p)).mod(bigInt(p.toString())))).mod(bigInt(p.toString()));
    var n = bigInt(power(a, d.divide(2), p)).mod(bigInt(p.toString()));
    return bigInt(n.multiply(n)).mod(p);
}

function millerTest(num, d, r) {
    var a = bigInt.randBetween(2, num - 4).toString();
    var x = bigInt(power(a, d, num));
    if(x.eq(1) || x.eq(bigInt(num.toString()).minus(1)))
        return true;

    while(r-1 >= 0) {
        x = x.mod(bigInt(num.toString())).multiply(x.mod(bigInt(num.toString()))).mod(bigInt(num.toString()));
        if(x.eq(1))
            return false;
        if(x.eq(bigInt(num.toString()).minus(1)))
            return true;
        r--;
    }
    return false;
}

function checkPrime() {
    var primeToCheck = document.getElementById("user_input").value;
    var k = 4;
    if(primeToCheck == 1) {
        alert('1 is neither a prime nor composite');
    } else if(primeToCheck <= 0) {
        alert('The concept of prime and composite can be applied only to positive integers.')
    } else {
        if(isPrime(primeToCheck, k))
            alert(primeToCheck + ' is a prime number.');
        else
            alert(primeToCheck + ' is a composite number.');
    }
}
