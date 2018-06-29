const assert = require("assert");
const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;

const request = supertest( 'http://localhost:3000');

function add(a, b) {
    return a + b;
}

describe('Array', function () {
    describe('# test function add', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(3, add(1, 2));

        });
    });
});

describe('web test', () => {
    it('测试/getString.json请求', (done) => {
        request
            .get('/patent/api/hello')
            .expect(200)
            .end((err, res) => {
                // console.log(res);
                // 断言判断结果是否为object类型
                expect(res.body).to.be.an('object');
                expect(res.body).any.keys('name','old');
                done();
            })
    })

});