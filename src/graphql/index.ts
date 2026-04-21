import { typeDefs } from "./typedefs/typedefs.js";
import { userResolver } from "./resolvers/user.resolver.js";

export const resolvers = {
    Query: {
        ...userResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation
    }
   
}

export {typeDefs} 
