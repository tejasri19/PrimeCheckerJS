// Algorithm hints taken from http://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/

function isPrime(num, k) {
    console.log('num in func '+num);
    if(bigInt(num.toString()).eq(2))
        return true;
    if(bigInt(num.toString()).mod(2).eq(0))
        return false;

    var d = bigInt(num.toString()).minus(1), r = 0;
    while(d.mod(2).eq(0)) {
        d = d.divide(2);
        r++;
    }

    console.log('d'+d.toString());
    console.log('r'+r);
    for(var i = 0; i < k; i++) {
        if(millerTest(num, d, r) == false) {
            return false;
        }
    }

    return true;
}

function power(a, d, p) {
    //console.log('in power d'+d.toString());
    //console.log('in power a'+a.toString());
    //console.log('in power p'+p.toString());
    a = bigInt(a.toString()).mod(bigInt(p.toString()));
    if(bigInt(d.toString()).eq(0))
        return 1;
    if(bigInt(bigInt(d).mod(2)).eq(1))
        return bigInt(bigInt(a.toString()).multiply(bigInt(power(a, d.minus(1), p)).mod(bigInt(p.toString())))).mod(bigInt(p.toString())); //return (a * (power(a, d - 1, p) % p)) % p;
    var n = bigInt(power(a, d.divide(2), p)).mod(bigInt(p.toString()));
    return bigInt(n.multiply(n)).mod(p);
}

function millerTest(num, d, r) {
    console.log('num'+num);
    //var a = bigInt(Math.floor(Math.random() * (num - 4) + 2));
    //var a = bigInt(Math.floor(Math.random() * (num - 4))).add(2);
    var a = bigInt.randBetween(2, num - 4).toString();
    console.log('a'+a);
    var x = bigInt(power(a, d, num));
    console.log('x'+x.toString());
    if(x.eq(1) || x.eq(bigInt(num.toString()).minus(1)))
        return true;

    while(r-1 >= 0) {
        x = x.mod(bigInt(num.toString())).multiply(x.mod(bigInt(num.toString()))).mod(bigInt(num.toString()));
        console.log('x'+x.toString());
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
    console.log(primeToCheck);
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
