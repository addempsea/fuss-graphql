/* eslint-disable no-unused-vars */
import DataLoader from 'dataloader';
import { user, note } from '../../model';
import { helpers, constants, ApiError } from '../../utils';

const {
  ResponseHelper: { moduleErrLogMessager, graphQLResponse }
} = helpers;

const {
  httpStatusCodes: { OK, INTERNAL_SERVER_ERROR }
} = constants;
const data = user();
const notes = note();

const userResolvers = {
  Query: {
    getAllUsers(_, __, ctx) {
      try {
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
        const singleUser = data.find((el) => el.id === args.id);
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
  },
  Mutation: {
    addNewUser(_, args, ctx, info) {
      try {
        data.push({ ...args.data });
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
    note: (parent, { limit }) => {
      const noteLoader = new DataLoader((keys) => {
        const result = limit
          ? keys.map((val) => notes.filter((el) => el.userId === val).slice(0, limit))
          : keys.map((val) => notes.filter((el) => el.userId === val));
        return Promise.resolve(result);
      });

      return noteLoader.load(parent.id);
    }
  }
};

export default userResolvers;
