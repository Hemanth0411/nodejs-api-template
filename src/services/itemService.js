const items = [
  { id: 1, name: 'Sample Item', description: 'This is a sample item' },
];

const getAllItems = () => items;

const getItemById = (id) => items.find((item) => item.id === id);

const createItem = (itemData) => {
  const newItem = {
    id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
    ...itemData,
  };
  items.push(newItem);
  return newItem;
};

const updateItem = (id, itemData) => {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...itemData };
  return items[index];
};

const deleteItem = (id) => {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
