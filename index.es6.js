var flagon = (A) => ({
  contains: (B) => flagon.contains(A,B),
  merge: (B) => flagon(flagon.merge(A,B)),
  toggle: (B) => flagon(flagon.toggle(A,B)),
  value: () => A,
  toString: () => A.toString(2)
})
flagon.contains = (A,B) => (A & B) == B
flagon.merge = (A,B) => A | B
flagon.toggle = (A,B) => A ^ B

if( typeof module !== "undefined" ){
  module.exports = flagon;
} else {
  window.flagon = flagon
}
