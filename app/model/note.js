import faker from 'faker';

// eslint-disable-next-line import/prefer-default-export
export const note = () => {
  const notes = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 100; i++) {
    notes.push({
      id: `${i}`,
      content: faker.lorem.paragraph(),
      userId: `${faker.helpers.randomize(Array.from(Array(100).keys()))}`,
      isPublic: faker.datatype.boolean()
    });
  }
  return notes;
};
