const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utilities/Utils')

function users(parent, args, ctx, info){
  console.log("USERS")
  console.log(ctx.prisma.users())
  return ctx.prisma.users()
}

module.exports = {
  users
}