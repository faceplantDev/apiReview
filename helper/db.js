const config = require('../config.json')

const mysql2 = require('mysql2')

let db = exports

db.connection = mysql2.createConnection({
  host: `${config.host}`,
  user: `${config.user}`,
  password: `${config.password}`
  });

function initBase() {
  try{
  db.connection.query(`CREATE DATABASE IF NOT EXISTS api;`, (err, result) => {if(err) return console.log(err)})

  db.connection.query(`USE api`)
  
  db.connection.query(`CREATE TABLE IF NOT EXISTS users (
    id INT auto_increment,
    login VARCHAR(255),
    passhash VARCHAR(255),
    name VARCHAR(255),
    primary key (id)
  );`, (err, result) => {if(err) return console.log(err)})
  
  db.connection.query(`CREATE TABLE IF NOT EXISTS posts (
    id INT auto_increment,
    title VARCHAR(255),
    content VARCHAR(255),
    timestamp VARCHAR(255),
    primary key (id)
  );`, (err, result) => {if(err) return console.log(err)})
 } catch (err) {
   console.log(err)
 }
}

initBase()
