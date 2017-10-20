// Algorithm hints taken from http://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/

function isPrime(num, k) {
    if(num == 2)
        return true;
    if(num % 2 == 0)
        return false;

    var d = num - 1, r = 0;
    while(d % 2 == 0) {
        d /= 2;
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
    a = a % p;
    if(d == 0)
        return 1;
    if(d % 2 == 1)
        return (a * (power(a, d - 1, p) % p)) % p;
    var n = power(a, d / 2, p) % p;
    return (n * n) % p;
}

function millerTest(num, d, r) {
    var a = Math.floor(Math.random() * (num - 4) + 2);
    var x = power(a, d, num);
    if(x == 1 || x == num - 1)
        return true;
    while(r-1 > 0) {
        x = ((x % num) * (x % num)) % num;
        if(x == 1)
            return false;
        if(x == num - 1)
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
