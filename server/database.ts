import Mysql from 'mysql';

export const connection = Mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shop',
});

export const connect = () => {
  connection.connect((err) => {
    if (!err) console.log('Database is connected!!');
    else console.log('Database connect error');
  });
};

export const closeDB = () => {
  connection.end((err) => {
    if (!err) console.log('close database');
  });
};
