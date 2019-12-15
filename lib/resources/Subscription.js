"use strict";

var generate = require('../generate');
var api = require('../api');

function subscription() {
    var baseURL = '/v1/billing/subscriptions/';
    var operations = ['create', 'list', 'update', 'get'];
    /**
     * List transactions for a subscription
     * @param  {String}   id         Identifier of the agreement resource for which to list transactions.
     * @param  {String}   start_time YYYY-MM-DDTHH:mm:ss.sssZ start date of range of transactions to list
     * @param  {String}   end_time   YYYY-MM-DDTHH:mm:ss.sssZ end date of range of transactions to list
     * @param  {Object|Function}   config     Configuration parameters e.g. client_id, client_secret override or callback
     * @param  {Function} cb         
     * @return {Object}              subscription transaction list object
     */
    function listTransactions(id, start_time, end_time, config, cb) {
        var date_range = {
            "start_time": start_time,
            "end_time": end_time
        };

        api.executeHttp('GET', baseURL + id + '/transactions', date_range, config, cb);
    }

    var ret = {
        baseURL: baseURL,
        activate: function reactivate(id, data, config, cb) {
            api.executeHttp('POST', this.baseURL + id + '/activate', data, config, cb);
        },
        list_transactions: listTransactions
    };

    ret = generate.mixin(ret, operations);
    return ret;
}

module.exports = subscription;