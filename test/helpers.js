const chai = require( 'chai' )
global.expect = chai.expect
const fs = require( 'fs' )
const jsdom = require( 'mocha-jsdom' )
const path = require( 'path' )
const babel = require( 'babel-core' );

const html = fs.readFileSync( path.resolve( __dirname, '..', 'index.html' ), 'utf-8' )

const babelResult = babel.transformFileSync(
  path.resolve( __dirname, '..', 'index.js' ), {
    presets: [ 'env' ]
  }
);

const src = babelResult.code

jsdom( {
  html,
  src,
  url: "http://localhost"
} );
// helpers.js
const fetch = require('node-fetch');

async function submitData(name, email) {
  try {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });
    
    const responseData = await response.json();

    if (response.ok) {
      document.body.innerHTML += responseData.id;
    } else {
      document.body.innerHTML += responseData.message;
    }
  } catch (error) {
    document.body.innerHTML += error.message;
  }
}

module.exports = {
  submitData: submitData
};

