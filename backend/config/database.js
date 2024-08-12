const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'bbymsisrahv61qxoiqey-mysql.services.clever-cloud.com',
  user: 'usrlc3u67vv3yjl8',
  password: 'sYNLNJzdouh6vCu4GtnJ',
  database: 'bbymsisrahv61qxoiqey',
  waitForConnections:true
});

pool.getConnection((err,conn)=>{
  if(err)console.log(err);
  else console.log("MySQL Connected Successfully!");
})

module.exports = pool.promise();
