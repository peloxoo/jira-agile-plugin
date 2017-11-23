/*var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
*/

var should = require('chai').should();
var expect = require('chai').expect;
var myAuxCode = require('./auxfunctions');
var myCode = require('../public/js/services');

describe('tests', function () {
  describe('testFunction', function () {
    it('should return 1', function () {
      // Call the exported function from the module
      myAuxCode.testFunction().should.equal(1);
    });
  })
})
// test para la llamada a la API de JIRA que devuelve la lista de proyectos del usuario
describe('testing promises', function () {
  describe('getProjects', function () {
    it('should return OK', (done) => {
      myCode.getProjects().then(function (result) {
        expect(result).to.be.an('array');
        done();
      });
    })
  })
})
// test para la llamada a la API de JIRA que crea un issue
describe('testing issue', function () {
  describe('doPost', function () {
    it('should return OK', (done) => {
      myCode.doPost().then(function (result) {
        done();
      });
    })
  })
})
