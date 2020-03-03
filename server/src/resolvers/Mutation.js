const { AuthenticationError } = require("apollo-server-express");
const {transporter} = require('../utilities/Mailer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId } = require('../utilities/Utils')

async function signup(parent, args, context, info) {
    console.log('SIGN_UP_SERVER')
    const user_exist = await context.prisma.user({ email: args.email })
    if (user_exist) {
      throw new AuthenticationError('USER_ALREADY_EXIST')
    }
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({ ...args, password})
    const token = jwt.sign({ userId: user.id }, context.APP_SECRET)
    
    var email = {
      from: 'awesome@bar.com',
      to: 'brieucjamain@gmail.com',
      subject: 'Hello',
      text: 'Hello world',
      html: '<b>Hello world</b>'
    };
    
    transporter.sendMail(email, function(err, info){
        if (err){
          console.log(err);
        }
        else {
          console.log('Message sent: ' + info.response);
        }
    });

    return {
      token,
      user,
    }
  }

  async function login(parent, args, context, info) {
    console.log('LOG_IN_SERVER')
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
      throw new AuthenticationError('BAD_EMAIL')
    }
  
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new AuthenticationError('BAD_PASSWORD')
    }
  
    const token = jwt.sign({ userId: user.id }, context.APP_SECRET)
    return {
      token,
      user,
    }
  }
  
  module.exports = {
    signup,
    login
  }