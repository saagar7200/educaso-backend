
import fs from "fs";
import universitymodel from "../models/University/universitymodel";
import slugify from "slugify";

export const createUniversityController = async (req, res) => {
  try {
    const { name, description } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const universitys = new universitymodel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      universitys.photo.data = fs.readFileSync(photo.path);
      universitys.photo.contentType = photo.type;
    }
    await universitys.save();
    res.status(201).send({
      success: true,
      message: "University Created Successfully",
      universitys,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating university",
    });
  }
};

//get all university
export const getUniversityController = async (req, res) => {
  try {
    const products = await universitymodel
      .find({})
      .populate("university")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALlUniversitys ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting universitys",
      error: error.message,
    });
  }
};
// get single product
export const getSingleUniversityController = async (req, res) => {
  try {
    const product = await universitymodel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("university");
    res.status(200).send({
      success: true,
      message: "Single University Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single university",
      error,
    });
  }
};

// get photo
export const univeristyPhotoController = async (req, res) => {
  try {
    const university = await universitymodel.findById(req.params.pid).select("photo");
    if (university.photo.data) {
      res.set("Content-type", university.photo.contentType);
      return res.status(200).send(university.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteUniversityController = async (req, res) => {
  try {
    await universitymodel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "university Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting university",
      error,
    });
  }
};

//upate UNIVERSITY
export const updateUniversityController = async (req, res) => {
  try {
    const { name, description } =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const universitys = await universitymodel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      universitys.photo.data = fs.readFileSync(photo.path);
      universitys.photo.contentType = photo.type;
    }
    await universitys.save();
    res.status(201).send({
      success: true,
      message: "university Updated Successfully",
      universitys,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte university",
    });
  }
};