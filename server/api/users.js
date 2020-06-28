const graphql = require("graphql");
const { User } = require("../db/models");
const { Ingredient } = require("../db/models");


const ingredientType = new graphql.GraphQLObjectType({
  name: "Ingredient",
  fields: {
    id: { type: graphql.GraphQLID },
    userId: {type: graphql.GraphQLInt},
    name: { type: graphql.GraphQLString },
    quantity: { type: graphql.GraphQLInt },
  },
});

const userType = new graphql.GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: graphql.GraphQLID },
    email: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    password: { type: graphql.GraphQLString },
    ingredients: { type: graphql.GraphQLList(ingredientType) }
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
            include: [{
              model: Ingredient,
              where: {userId: args.id},
              required: false
            }]
          });
          console.log('>>>>>>>>>>>>',foundUser)
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
          const users = await User.findAll({ include: Ingredient });
          console.log(users)
          return users;
        } catch (err) {
          console.log(err);
        }
      },
    },
    ingredient: {
      type: ingredientType,
      args: {
        id: { type: graphql.GraphQLID },
      },
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const found = await Ingredient.findOne({
            where: { id: args.id },
          });
          return found;
        } catch (err) {
          console.log(err);
        }
      },
    },
    ingredients: {
      type: graphql.GraphQLList(ingredientType),
      resolve: async (parent, args) => {
        // code to get data from db
        try {
          const ingredients = await Ingredient.findAll();
          console.log(ingredients)
          return ingredients;
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
    addIngredient: {
      type: ingredientType,
      args: {
        userId: {type: graphql.GraphQLInt},
        name: { type: graphql.GraphQLString },
        quantity: { type: graphql.GraphQLInt },
      },
      async resolve(parent, args) {
        try {
            let ingredient = new Ingredient({
            name: args.name,
            quantity: args.quantity,
            userId: args.userId
            });
            const created = await Ingredient.create(ingredient.dataValues);
            return created
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
});

const schema = new graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
module.exports = schema;
