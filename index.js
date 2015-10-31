"use strict";

var flagon = function flagon(A) {
  return {
    contains: function contains(B) {
      return flagon.contains(A, B);
    },
    merge: function merge(B) {
      return flagon(flagon.merge(A, B));
    },
    toggle: function toggle(B) {
      return flagon(flagon.toggle(A, B));
    },
    value: function value() {
      return A;
    },
    toString: function toString() {
      return A.toString(2);
    }
  };
};
flagon.contains = function (A, B) {
  return (A & B) == B;
};
flagon.merge = function (A, B) {
  return A | B;
};
flagon.toggle = function (A, B) {
  return A ^ B;
};

if (typeof module !== "undefined") {
  module.exports = flagon;
} else {
  window.flagon = flagon;
}

