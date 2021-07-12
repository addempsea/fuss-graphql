import { gql } from 'apollo-server-express';

const Note = gql`
  type Note {
    id: ID
    content: String
    isPublished: Boolean
    userId: String
  }
`;

export default Note;
