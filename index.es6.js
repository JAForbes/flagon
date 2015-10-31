var flag = (A) => ({
  contains: (B) => flag.contains(A,B),
  merge: (B) => flag(flag.merge(A,B)),
  toggle: (B) => flag(flag.toggle(A,B)),
  value: () => A,
  toString: () => A.toString(2)
})
flag.contains = (A,B) => (A & B) == B
flag.merge = (A,B) => A | B
flag.toggle = (A,B) => A ^ B

if( typeof module !== "undefined" ){
  module.exports = flag
}
