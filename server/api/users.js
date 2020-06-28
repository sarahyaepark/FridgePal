const graphql = require("graphql");
const { User } = require("../db/models");

const userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLID },
    email: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    password: { type: graphql.GraphQLString },
  },
});

const queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: graphql.GraphQLID },
      },
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const foundUser = await User.findOne({
            where: { id: args.id },
          });
          return foundUser;
        } catch (err) {
          console.log(err);
        }
      },
    },
    users: {
      type: graphql.GraphQLList(userType),
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const users = await User.findAll();
          return users;
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});

const mutationType = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: userType,
      args: {
        email: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        password: { type: graphql.GraphQLString },
      },
      async resolve(parent, args) {
        try {
          let attemptFind = await User.findOne({ 
            where: { email: args.email }
          })
          if (attemptFind) {
            return attemptFind
          }
          else {
            let user = new User({
            email: args.email,
            name: args.name,
            password: args.password,
            });
            const created = await User.create(user.dataValues);
            return created
          }
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});

const userSchema = new graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
module.exports = userSchema;
