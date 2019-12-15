"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal = require('..');
require('./configure');

describe('SDK', function () {
    describe('Products', function () {
        var product_attributes = {
            "name": "Video Streaming Service",
            "description": "Video streaming service",
            "type": "SERVICE",
            "category": "SOFTWARE",
            "image_url": "https://example.com/streaming.jpg",
            "home_url": "https://example.com/home"
        }
        it('product create and get success', function () {
            paypal.product.create(product_attributes, function(error, product) {
                expect(error).equal(null);
                expect(product.id).to.contain('PROD-')
                expect(product.name).to.equal(product_attributes.name);

                paypal.product.get(product.id, function(error, product) {
                    expect(error).equal(null);
                    expect(product.name).to.equal(product_attributes.name);
                })
            })
        })
    })
})