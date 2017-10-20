// Algorithm hints taken from http://www.geeksforgeeks.org/primality-test-set-3-miller-rabin/

function isPrime(num, k) {
    if(num <= 0)
        alert('Prime and composite are used only for positive integers.')
    if(num == 1)
        alert(num + ' is neither prime nor composite.');
    if(num == 2)
        alert(num + ' is a prime number.');
    if(num % 2 == 0)
        return false;

    var d = num - 1, r = 0;
    while(d % 2 == 0) {
        d /= 2;
        r++;
    }

    for(var i = 0; i < k; i++) {
        if(millerTest(num, d) == false) {
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
    var n = power(a, d / 2, p);
    return n * n;
}
