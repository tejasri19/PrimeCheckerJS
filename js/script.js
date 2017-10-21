// Algorithm hints taken from http://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/

function isPrime(num, k) {
    if(bigInt(num).eq(2))
        return true;
    if(bigInt(num).mod(2).eq(0))
        return false;

    var d = bigInt(num - 1), r = 0;
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
    a = bigInt(a).mod(p);
    if(bigInt(d).eq(0))
        return 1;
    if(bigInt(bigInt(d).mod(2)).eq(1))
        return bigInt(a.multiply(bigInt(power(a, d-1, p)).mod(p))).mod(p); //return (a * (power(a, d - 1, p) % p)) % p;
    var n = bigInt(power(a, bigInt(d/2), bigInt(p))).mod(p);
    return bigInt(n.multiply(n)).mod(p);
}

function millerTest(num, d, r) {
    var a = bigInt(Math.floor(Math.random() * (num - 4) + 2));
    var x = bigInt(power(a, d, num));
    if(x.eq(1) || x.eq(num - 1))
        return true;

    while(r-1 >= 0) {
        x = x.mod(num).multiply(x.mod(num)).mod(num);
        if(x.eq(1))
            return false;
        if(x.eq(num-1))
            return true;
        r--;
    }
    return false;
}

function checkPrime() {
    var primeToCheck = parseInt(document.getElementById("user_input").value);
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
