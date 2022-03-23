const isAddedTOCart = (productId) => {
  let cart = [{ id: 1 }, { id: 2 }];

  cart.filter((product) => {
    product.id === productId;
  });
};
isAddedTOCart(1);
