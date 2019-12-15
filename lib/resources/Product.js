"use strict";

var generate = require('../generate');
var api = require('../api');

function product() {
    var baseURL = '/v1/catalogs/products/';
    var operations = ['create', 'list', 'get'];

    var ret = {
        baseURL: baseURL
    };

    ret = generate.mixin(ret, operations);
    return ret;
}

module.exports = product;