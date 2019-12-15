"use strict";

var generate = require('../generate');
var api = require('../api');

function subscriptionPlan() {
    var baseURL = '/v1/billing/plans/';
    var operations = ['create', 'list', 'get'];

    var ret = {
        baseURL: baseURL
    };

    ret = generate.mixin(ret, operations);
    return ret;
}

module.exports = subscriptionPlan;