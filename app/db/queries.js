export default {
  insertUser: `
    INSERT INTO users (
        id,
        username,
        last_name,
        first_name,
        is_active
    ) VALUES ($1, $2, $3, $4, $5)
  `,
  insertNote: `
    INSERT INTO notes (
        id,
        content,
        user_id,
        is_published
    ) VALUES ($1, $2, $3, $4)
  `,
  getAllUsers: `
    SELECT id, username, last_name, first_name, is_active FROM users
  `,
  getUserNotes: 'SELECT * FROM notes WHERE user_id IN ($1:csv)',
  getSingleUser: 'SELECT id, username, last_name, first_name, is_active FROM users where id = $1'
};
