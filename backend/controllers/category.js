const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (!category) {
      return res.status(400).json({
        error: err.message,
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (!category) {
      return res.status(400).json({
        error: err.message,
      });
    }
    res.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = async (req, res) => {
  const items = await Category.find();
  if (!items) {
    return res.status(400).json({
      error: "Category not found",
    });
  }
  res.json(items);
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  console.log(req.body);

  category.save((err, updated) => {
    if (!updated) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(updated);
  });
};

exports.deleteCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (!category) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Category deleted!",
    });
  });
};
