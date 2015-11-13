var assert = require('assert')
var flagon = require('../index.es6.js')

var permission = {
  NOTHING: 	0b0000,
  READ:     0b0001,
  CREATE:   0b0010,
  MODIFY:   0b0100,
  DELETE:   0b1000
}

var GUEST = permission.READ
var USER = flagon.merge(permission.READ, permission.MODIFY)
var ADMIN = flagon.merge(USER, permission.CREATE)
var SUPERUSER = flagon.merge(ADMIN, permission.DELETE)

var SUPER_GUEST = flagon.toggle(GUEST, permission.DELETE)

describe('flagon', () => {

	it('should merge bit masks', () =>
		 assert.equal(USER, permission.READ | permission.MODIFY)
	)
	it('should check if a bitmask contains another bitmask', () => {
		assert( flagon.contains(SUPERUSER, ADMIN))
		assert.equal( flagon.contains(ADMIN, SUPERUSER), false )
		assert( flagon.contains(ADMIN, GUEST))
	})
	it('should toggle flags in a bit mask that differ from a second bitmask', () => {
		assert(flagon.contains(SUPER_GUEST, permission.DELETE))
		assert.equal(flagon.toggle(SUPER_GUEST, permission.DELETE), GUEST)
	})
	it('should be able to chain contains,merge,toggle', () => {

		var DELETE_BUT_NOT_READ = flagon(USER)
				.merge(permission.DELETE)
				.toggle(permission.READ)

		assert.equal(
			DELETE_BUT_NOT_READ.contains(permission.READ),
			false
		)

		assert(
			DELETE_BUT_NOT_READ.contains(permission.DELETE)
		)
	})
	it('flagon.contains should always return true if the second argument is 0', () => {
		assert(
			flagon.contains(1, 0)
		)
		assert(
			flagon.contains(0, 0)
		)
	})
})