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
      res.status(404).json({ message: "No category found with relevant id" });
      return;
    }
    res.status(200).json(categoryGetId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const categoryPut = await Category.findByPk(req.params.id);

    if (!categoryPut) {
      res.status(404).json({ message: "No category found with relevant id" });
      return;
    }
    res.status(200).json(categoryPut);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryDelete) {
      res.status(404).json({ message: "No category found with relevant id" });
      return;
    }

    res
      .status(200)
      .json(`Category with ID: ${req.params.id} deleted from database.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
