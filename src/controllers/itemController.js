const itemService = require('../services/itemService');
const { itemSchema } = require('../schemas/itemSchema');

const getAll = (req, res) => {
  const items = itemService.getAllItems();
  res.json(items);
};

const getById = (req, res) => {
  const item = itemService.getItemById(parseInt(req.params.id, 10));
  if (!item) return res.status(404).json({ message: 'Item not found' });
  return res.json(item);
};

const create = (req, res) => {
  const validatedData = itemSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json({ errors: validatedData.error.errors });
  }
  const newItem = itemService.createItem(validatedData.data);
  return res.status(201).json(newItem);
};

const update = (req, res) => {
  const validatedData = itemSchema.safeParse(req.body);
  if (!validatedData.success) {
    return res.status(400).json({ errors: validatedData.error.errors });
  }
  const updatedItem = itemService.updateItem(
    parseInt(req.params.id, 10),
    validatedData.data,
  );
  if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
  return res.json(updatedItem);
};

const remove = (req, res) => {
  const success = itemService.deleteItem(parseInt(req.params.id, 10));
  if (!success) return res.status(404).json({ message: 'Item not found' });
  return res.status(204).send(); // 204 No Content
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
