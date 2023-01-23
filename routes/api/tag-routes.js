const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagGet = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagGet);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagRoutesGetId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagRoutesGetId) {
      res.status(404).json({ message: "No tag found with relevant id" });
      return;
    }
    res.status(200).json(tagRoutesGetId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const newTagData = await Tag.findByPk(req.params.id);

    if (!newTagData) {
      res.status(404).json({ message: "No tag found with relevant id" });
      return;
    }
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: "No tag found with relevant id" });
      return;
    }

    res.status(200).json(`tag with ID: ${req.params.id} deleted.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
