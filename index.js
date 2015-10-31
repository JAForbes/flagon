"use strict";

var flag = function flag(A) {
  return {
    contains: function contains(B) {
      return flag.contains(A, B);
    },
    merge: function merge(B) {
      return flag(flag.merge(A, B));
    },
    toggle: function toggle(B) {
      return flag(flag.toggle(A, B));
    },
    value: function value() {
      return A;
    },
    toString: function toString() {
      return A.toString(2);
    }
  };
};
flag.contains = function (A, B) {
  return (A & B) == B;
};
flag.merge = function (A, B) {
  return A | B;
};
flag.toggle = function (A, B) {
  return A ^ B;
};

if (typeof module !== "undefined") {
  module.exports = flag;
}

