const { query } = require("express");
const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Error !!");
  }
};
exports.list = async (req, res) => {
  try {
    const count = parseInt(req.params.count);

    // console.log(count);
    // populate คือการ join ข้อมูล
    const product = await Product.find()

      .limit(count)
      .populate("category")
      .sort([["createdAt", "desc"]]);
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error !!");
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      _id: req.params.id,
    })
      .populate("category")
      .exec();
    res.send(deleted);
  } catch (err) {
    res.status(500).send("Server Error !!");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
    }).exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error !!");
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
      }
    ).exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Server Error !!");
  }
};

exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const product = await Product.find()
      .limit(limit)
      .populate("category")
      .sort([[sort, order]]);
    res.send(product);
  } catch (err) {
    res.status(500).send("ListBy Error !!");
  }
};

const handleQuery = async (req, res, query) => {
  let products = await Product.find({ $text: { $search: query } }).populate(
    "category",
    "_id name"
  );
  res.send(products);
};
const handleCategory = async (req, res, category) => {
  let products = await Product.find({ category }).populate(
    "category",
    "_id name"
  );
  res.send(products);
};

const handlePrice = async (req, res, price) => {
  let products = await Product.find({
    price: {
      $gte: price[0],
      $lte: price[1],
    },
  }).populate("category", "_id name");
  res.send(products);
};

exports.searchFilters = async (req, res) => {
  const { query, price, category } = req.body;
  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }

  //sort 0-200 = price [0,200]
  if (price !== undefined) {
    console.log("price", price);
    await handlePrice(req, res, price);
  }

  // search by category [_id,_id]
  if (category !== undefined) {
    console.log("category", category);
    await handleCategory(req, res, category);
  }
};
