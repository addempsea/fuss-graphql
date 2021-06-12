import faker from 'faker';

// eslint-disable-next-line import/prefer-default-export
export const user = () => {
  const users = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 100; i++) {
    users.push({
      id: `${i}`,
      userName: faker.internet.userName(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      isActive: faker.datatype.boolean()
    });
  }
  return users;
};
