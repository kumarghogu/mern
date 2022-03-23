const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "c9nscx79wt6wx598",
  publicKey: "xv3ggjhxkv72nhfc",
  privateKey: "8c1e995537365142faf64f1c88e7319d",
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    // pass clientToken to your front-end
    if (err) {
      // console.log(err);
      res.status(500).send(err);
    } else {
      // console.log(response);
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amount = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonceFromTheClient,
      // deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result);
      }
    }
  );
};
