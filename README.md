# flagon

<img src="https://p2.liveauctioneers.com/21/27744/10536219_1_l.jpg" width="200px"></img>

A tiny utility to make using bitwise operations readable by mere mortals.  Drink up!

#### Quick start

`npm install flagon --save`

Use either a chaining API `flag(A).method(B).method(B).value()` or access the raw functions via `flag.method(A,B)`

```js
var flagon = require('flagon')

var A = 0b1000
var B = 0b1001
var C = 0b0110

//Chaining API
flagon(A).merge(B).value() == 0b1001

//Raw API
flagon.toggle(A,B) == 0b0001

flagon.contains(B,C) == false
```

#### Why make something so concise so verbose?  

Bitwise operations are very powerful and concise.  But exactly because they are so powerful, they are often used in security critical situations.  By making the operations more readable it is less likely the developer will unintentionally permit access to restricted data or operations.

I developed this utility for validating user and organizations permissions in a REST API.  For simpler use cases, you may prefer to stick to using the underlying bitwise operations.

#### Why is Binary OR named merge?  and XOR named toggle?

This utility is trying to infer the purpose of the operation in the context of your application.  It is likely this guess may be incorrect, and if so I'd be happy to alias the function names to anything reasonable.

Here is an example where you may be using Binary OR to `merge` permissions

```js
var permission = {
  READ:     0b0001,
  CREATE:   0b0010,
  MODIFY:   0b0100,
  DELETE:   0b1000
}

var GUEST = permission.READ,
var USER = flagon.merge(permission.READ, permission.MODIFY),
var ADMIN = flagon.merge(USER, permission.CREATE)
var SUPERUSER = flagon.merge(ADMIN, permission.DELETE)

```

And you may want to check if a `GUEST` can `MODIFY`.

```js
flagon(GUEST).contains(permission.CREATE).value() == false
```

And you may want to temporarily grant access to `MODIFY` to a `GUEST` user.

```js
var GUEST_THAT_CAN_MODIFY = flagon.toggle(GUEST,permission.MODIFY)

//then revoke it later
var GUEST = flagon.toggle(GUEST_THAT_CAN_MODIFY,permission.MODIFY)
```

All of the examples seek to demonstrate that the operations purpose is more important than the underlying binary flags.
The flags themselves are uninteresting, but they facilitate expansion of your permission model without altering other aspects of your application (e.g. your DB Schema)

#### Functions

##### merge (Binary OR)

Usage: `flagon.merge(A,B)` or `flagon(A).merge(B).value()`
Equivalent Operation: `A | B`

Merges all true flags that share a column in two binary sequences.

e.g. 
```js
(0b1000 | 0b0100 | 0b0010) == 0b1110

flagon.merge(0b1000).merge(0b0100).merge(0b0010).value() == 0b1110
```

##### contains

Usage: `flagon.contains(A,B)` or `flagon(A).contains(B).value()`
Equivalent Operation: `(A & B) == B`

Does a bit mask contain every true value of another bit mask.

e.g. 
```js
var A = 0b1000
var B = 0b1100

;(A & B) == B == false

flagon.contains(B,A) == false

;(A & B) == A == true
```

##### toggle

Usage: `flagon.toggle(A,B)` or `flagon(A).toggle(B).value()`
Equivalent Operation: `(A ^ B)`

Flips every bit of the object that has a different true value to the subject.

e.g. 
```js
var A = 0b1000
var B = 0b1100

;(A ^ B) == 0b0100

flagon.toggle(A,B) == 0b0100

//toggling twice reverts the change

flagon(A).toggle(B).toggle(B).value() == A == true
```
##### toString
Usage: `flagon(A).toString()` or `flagon(A) + ""`

Outputs a binary represenation of a number as a string.

```js
flagon(2).toString() == flagon(2)+"" == 10
```

Note, Javascript has similar functionality by providing a radix to a Number toString

```js
4..toString(2) == "100"
```

You can still access this functionality via flagon by simply calling `toString(2)` on the outputted value.

```
flagon(4).value().toString(2) == 100

//output Hexadecimal too!
flagon(15).value().toString(16) == 'f'
```

##### value

Usage: `flagon(A).value()`

Outputs the number value A that was wrapped by calling `flagon(A)`.  Useful for extracting the number value after performing a chained operation.

##### flagon

Usage: `flagon(A).<method>(B).<method>(C)....value()`

Wraps a value so you can call a series of operations.  Access the raw value by calling `value()` or access a binary representation by calling `toString()`


Example:
```js
//flagon(A).<method>(B).<method>(C).value()

//toString
flagon(0b10).merge(0b01).toString() == "11"
//or
flagon(0b10).merge(0b01)+"" == "11"

//value
flagon(0b111).toggle(0b010).value() == 0b101
```

----

#### Why chaining?  

I don't really like chaining, it doesn't work well with composition.  But I added chaining when writing the library to help me get my head around the operations.  One benefit of chaining, is it becomes quite clear which argument is the object, and which is the subject.  In your actual application code I don't see it being that useful, but I also don't see any need for removing it when the whole script is ~20 lines of code.

#### Where is bit shifting?

I didn't need it for my use case, [YAGNI](https://en.wikipedia.org/wiki/You_aren't_gonna_need_it).
PR's welcome though.
