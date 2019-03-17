//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const chai = require('chai');
chaiHttp = require('chai-http');
const index = require('../index');
const expect = chai.expect;
const supertest = require('supertest');
const assert = chai.assert;

chai.use(chaiHttp);

// Test cases for when make, model, age and owners param are not provided
describe('Bad request test for missing parameters, (Middleware test)', () => {
  it('app should give a bad request error, since no query parameters provided', done => {
    chai
      .request('http://localhost:3000')
      .get('/value')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('app should give a bad request error, since make query parameter missing', done => {
    chai
      .request('http://localhost:3000')
      .get('/value?model=NC750XD&age=118&owners=0')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('app should give a bad request error, since model query parameter missing', done => {
    chai
      .request('http://localhost:3000')
      .get('/value?make=honda&age=118&owners=0')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('app should give a bad request error, since age query parameter missing', done => {
    chai
      .request('http://localhost:3000')
      .get('/value?make=honda&model=civic&owners=0')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('app should give a bad request error, since owners query parameter missing', done => {
    chai
      .request('http://localhost:3000')
      .get('/value?make=honda&model=civic&age=118')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

// Test cases for when make or model is not found
describe('Not found errors', () => {
  it('app should give a not found error, since make is not registered', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Hondaa&model=civic&age=118&owners=0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('app should give a not found error, since model not found', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civil&age=118&owners=0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

// Test cases for Age criteria
describe('Tests for vehicle age value', () => {
  it('age is less than 10 years (6 years or 72 months)', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=72&owners=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 19200);
        done();
      })
      .catch(err => console.log(err));
  });

  it('age is equal 10 years (10 years or 120 months)', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=120&owners=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 12000);
        done();
      })
      .catch(err => console.log(err));
  });

  it('age is greater than 10 years (11 years or 132 months)', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=132&owners=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 12000);
        done();
      })
      .catch(err => console.log(err));
  });
});

// Test cases for Mileage criteria
describe('Test for vehicle mileage values', done => {
  it('mileage is 150000 miles (<=150,000 miles)', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=0&owners=1&mileage=150000')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 21000);
        done();
      })
      .catch(err => console.log(err));
  });

  it('mileage is 150001 miles (> 150,000 miles)', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=0&owners=1&mileage=150001')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 21000);
        done();
      })
      .catch(err => console.log(err));
  });
});

// Test cases for Owner Criteria
describe('Test for vehicle owners', done => {
  it('vehical had 0 owner', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=0&owners=0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 33000);
        done();
      })
      .catch(err => console.log(err));
  });
  it('vehical had 1 owner', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=0&owners=1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 30000);
        done();
      })
      .catch(err => console.log(err));
  });
  it('vehical had 3 owners', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=0&owners=3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 22500);
        done();
      })
      .catch(err => console.log(err));
  });
  it('vehical had 10 owners', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=0&owners=10')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 22500);
        done();
      })
      .catch(err => console.log(err));
  });
});

// Test cases for Collisions Criteria
describe('Tests for vehical collisions', done => {
  it('vehical had 0 collisions', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=0&owners=1&collisions=0')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 30000);
        done();
      })
      .catch(err => console.log(err));
  });

  it('vehical had 2 collisions', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=0&owners=1&collisions=2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 28800);
        done();
      })
      .catch(err => console.log(err));
  });

  it('vehical had 5 collisions', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=0&owners=1&collisions=5')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 27000);
        done();
      })
      .catch(err => console.log(err));
  });

  it('vehical had 10 collisions', done => {
    supertest('http://localhost:3000')
      .get('/value?make=Honda&model=civic&age=0&owners=1&collisions=10')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 27000);
        done();
      })
      .catch(err => console.log(err));
  });
});

// Test cases for custom scenarios
describe('Vehicle value with custom scenarios', done => {
  it('vehicle of age 100 months with 3 owners and two collisions with 80,000 miles', done => {
    supertest('http://localhost:3000')
      .get(
        '/value?make=Honda&model=civic&age=100&owners=3&collisions=2&mileage=80000'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 1500);
        done();
      })
      .catch(err => console.log(err));
  });

  it('vehicle of age 150 months with 0 owners and two collisions with 0 miles', done => {
    supertest('http://localhost:3000')
      .get(
        '/value?make=Honda&model=civic&age=150&owners=0&collisions=2&mileage=0'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equal(res.body.New_Value, 11880);
        done();
      })
      .catch(err => console.log(err));
  });
});
