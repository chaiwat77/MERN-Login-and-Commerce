const Order = require("../models/Order");

exports.changOrderStatus = async (req, res) => {
  try {
    const { orderId, orderstatus } = req.body;

    let orderUpdate = await Order.findByIdAndUpdate(
      orderId,
      { orderstatus },
      { new: true }
    );
    res.send(orderUpdate);
  } catch (err) {
    res.status(500).send("Change Status Error !!");
  }
};

exports.getOrderAdmin = async (req, res) => {
  try {
    let order = await Order.find()
      .populate("products.product")
      .populate("orderdBy", "username")
      .exec();

    res.json(order);
  } catch (err) {
    res.status(500).send("Get order Error!!");
  }
};
