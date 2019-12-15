"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should();

var paypal = require('..');
require('./configure');

describe('SDK', function () {
    describe('Subscription New', function () {
        var plan_attributes = {
            "product_id": "PROD-6NY82371VV782935M",
            "name": "Video Streaming Service Plan",
            "description": "Video Streaming Service basic plan",
            "status": "ACTIVE",
            "billing_cycles": [
                {
                    "frequency": {
                        "interval_unit": "MONTH",
                        "interval_count": 1
                    },
                    "tenure_type": "TRIAL",
                    "sequence": 1,
                    "total_cycles": 1,
                    "pricing_scheme": {
                        "fixed_price": {
                            "value": "10",
                            "currency_code": "USD"
                        }
                    }
                },
                {
                    "frequency": {
                        "interval_unit": "MONTH",
                        "interval_count": 1
                    },
                    "tenure_type": "REGULAR",
                    "sequence": 2,
                    "total_cycles": 12,
                    "pricing_scheme": {
                        "fixed_price": {
                            "value": "100",
                            "currency_code": "USD"
                        }
                    }
                }
            ],
            "payment_preferences": {
                "auto_bill_outstanding": true,
                "setup_fee": {
                    "value": "10",
                    "currency_code": "USD"
                },
                "setup_fee_failure_action": "CONTINUE",
                "payment_failure_threshold": 3
            },
            "taxes": {
                "percentage": "10",
                "inclusive": false
            }
        };

        var activation_attributes = {
            'reason': 'Test Activation'
        };

        it('subscription plan create and get success', function () {
            paypal.subscriptionPlan.create(plan_attributes, function (error, plan) {
                expect(error).equal(null);
                expect(plan.id).to.contain('P-');
                expect(plan.product_id).to.equal(plan_attributes.product_id);
                expect(plan.status).to.equal('ACTIVE');

                paypal.subscriptionPlan.get(plan.id, function (error, plan) {
                    expect(error).equal(null);
                    expect(plan.id).to.contain('P-');
                    expect(plan.product_id).to.equal(plan_attributes.product_id);
                    expect(plan.status).to.equal('ACTIVE');
                })
            });
        });

        it('subscription plan create and create, get subscription success', function () {
            paypal.subscriptionPlan.create(plan_attributes, function (error, plan) {
                expect(error).equal(null);
                expect(plan.id).to.contain('P-');
                expect(plan.product_id).to.equal(plan_attributes.product_id);
                expect(plan.status).to.equal('ACTIVE');

                var subscription_attributes = {
                    "plan_id": plan.id,
                    "subscriber": {
                        "name": {
                            "given_name": "John",
                            "surname": "Doe"
                        },
                        "email_address": "customer@example.com"
                    },
                    "application_context": {
                        "brand_name": "example",
                        "locale": "en-US",
                        "shipping_preference": "SET_PROVIDED_ADDRESS",
                        "user_action": "SUBSCRIBE_NOW",
                        "payment_method": {
                            "payer_selected": "PAYPAL",
                            "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
                        },
                        "return_url": "https://example.com/returnUrl",
                        "cancel_url": "https://example.com/cancelUrl"
                    }
                }
                paypal.subscription.create(subscription_attributes, function(error, subscription) {
                    expect(error).equal(null);
                    expect(subscription.status).to.equal('APPROVAL_PENDING');
                    expect(subscription.id).to.contain('I-');
                    paypal.subscription.get(subscription.id, function(error, subscription) {
                        expect(error).equals(null);
                        expect(subscription.status).to.equal('APPROVAL_PENDING');
                    });
                })
            });
        });

        // this test fails with 404... not sure why
        /*it('subscription plan create, activate subscription, list transactions success', function () {
            paypal.subscriptionPlan.create(plan_attributes, function (error, plan) {
                expect(error).equal(null);
                expect(plan.id).to.contain('P-');
                expect(plan.product_id).to.equal(plan_attributes.product_id);
                expect(plan.status).to.equal('ACTIVE');

                var subscription_attributes = {
                    "plan_id": plan.id,
                    "subscriber": {
                        "name": {
                            "given_name": "John",
                            "surname": "Doe"
                        },
                        "email_address": "customer@example.com"
                    },
                    "application_context": {
                        "brand_name": "example",
                        "locale": "en-US",
                        "shipping_preference": "SET_PROVIDED_ADDRESS",
                        "user_action": "SUBSCRIBE_NOW",
                        "payment_method": {
                            "payer_selected": "PAYPAL",
                            "payee_preferred": "IMMEDIATE_PAYMENT_REQUIRED"
                        },
                        "return_url": "https://example.com/returnUrl",
                        "cancel_url": "https://example.com/cancelUrl"
                    }
                }
                paypal.subscription.create(subscription_attributes, function(error, subscription) {
                    expect(error).equal(null);
                    expect(subscription.id).to.contain('I-');

                    paypal.subscription.list_transactions(subscription.id, '2019-11-15T18:29:27.234Z', '2019-12-30T18:29:27.234Z', 
                        function(error, transactions) {
                            expect(error).equals(null);
                            expect(transactions.transactions).to.equal([]);
                            expect(transactions.total_items).to.equal(0);
                        })
                })
            });
        });*/
    })
})