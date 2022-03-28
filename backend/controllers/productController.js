const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeature");

//create product--Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user=req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

  const resultPerPage = 15;
  const productCount=await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount
  });
});
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  res.status(200).json({
    success: true,
    product
  });
});

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});
