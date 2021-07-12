/* eslint-disable no-unused-vars */
import promise from 'bluebird';
import pg from 'pg-promise';

const camelizeColumns = (data) => {
  const template = data[0] || {};
  Object.keys(template).forEach((prop) => {
    const camel = pg.utils.camelize(prop);
    if (!(camel in template)) {
      data.forEach((el) => {
        const d = el;
        d[camel] = d[prop];
        delete d[prop];
      });
    }
  });
};

const options = {
  promiseLib: promise,
  receive: (data, result, e) => camelizeColumns(data),
  query(e) {
    logger.debug(`QUERY_RAN <==> ${JSON.stringify(e.query)}`);
  }
};

const pgp = pg(options);
const db = pgp('postgres://********:********@localhost:5432/notes');

export default db;
