/* eslint-disable no-unused-vars */
import queries from '../../db/queries';
import db from '../../db/setup';
import { notesByUserIds } from '../../services/notes';
import { helpers, constants, ApiError } from '../../utils';

const {
  ResponseHelper: { moduleErrLogMessager, graphQLResponse }
} = helpers;

const {
  httpStatusCodes: { OK, INTERNAL_SERVER_ERROR }
} = constants;

const userResolvers = {
  Query: {
    async getAllUsers(_, __, ctx) {
      try {
        const data = await db.many(queries.getAllUsers);
        return graphQLResponse(OK, 'Fetched users successfully', data);
      } catch (err) {
        const error = new ApiError({
          status: 'USERS',
          message: err.message
        });
        moduleErrLogMessager(error);
        return graphQLResponse(
          INTERNAL_SERVER_ERROR,
          'Error while trying to fetch users. It is not you, it is us'
        );
      }
    },
    getUserById(_, args, ctx, info) {
      try {
        const singleUser = db.oneOrNone(queries.getSingleUser, args.id);
        return graphQLResponse(OK, 'Fetched users successfully', singleUser);
      } catch (err) {
        const error = new ApiError({
          status: 'SINGLE_USERS',
          message: err.message
        });
        moduleErrLogMessager(error);
        return graphQLResponse(
          INTERNAL_SERVER_ERROR,
          'Error while trying to fetch user. It is not you, it is us'
        );
      }
    }

    // TODO: Add more resolver
  },
  Mutation: {
    addNewUser(_, args, ctx, info) {
      try {
        return graphQLResponse(OK, ' user added ', { ...args.data });
      } catch (err) {
        const error = new ApiError({
          status: 'ADD_USER',
          message: err.message
        });
        moduleErrLogMessager(error);
        return graphQLResponse(
          INTERNAL_SERVER_ERROR,
          'Error while trying to fetch user. It is not you, it is us'
        );
      }
    }
  },
  User: {
    note: ({ id }, { limit }, { loaders }) => loaders.notesLoader.load(id)
  }
};

export default userResolvers;
