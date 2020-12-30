const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll(req.params.id, {
      include: [{model: Product}, {model: Tag}],
    });

    if (!categoryData){
      res.status(404).json({message: "This didn't work!"})
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryID = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!categoryID){
      res.status(404).json({message: "No category with this ID was found"});
      return;
    }
    res.status(200).json(categoryID);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const locationData = await Category.create(req.body);
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryUpdatePut = await Category.update(req.body, {
      where: {
        category_id: req.body.category_id,
      }
    });
    if(!categoryUpdatePut){
      res.status(404).json({message: "No category with this ID was found"});
      return;
    }
    res.status(200).json(categoryUpdatePut);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryDeleteId = await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  if(!categoryDeleteId){
    res.status(404).json({message: "No category with this ID found to delete"});
    return;
  }
  res.status(200).json(categoryDeleteId);
} catch (error) {
  res.status(500).json(error);
}
});

module.exports = router;
