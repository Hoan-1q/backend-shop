import mysql from 'promise-mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shop',
});
export default connection;
// export const connect = () => {
//   connection.connect((err) => {
//     if (!err) console.log('Database is connected!!');
//     else console.log('Database connect error');
//   });
// };

// export const closeDB = () => {
//   connection.end((err) => {
//     if (!err) console.log('close database');
//   });
// };
