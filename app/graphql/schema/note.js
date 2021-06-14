import { gql } from 'apollo-server-express';

const Note = gql`
  type Note {
    id: ID
    content: String
    isPublic: Boolean
    userId: String
  }
`;

export default Note;
