const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const categoryGet = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryGet);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryGetId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
  if (!categoryGetId) {
    res.status(404).json({ message: "No category found with relevant id"});
    return;
  }
    res.status(200).json(categoryGetId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
