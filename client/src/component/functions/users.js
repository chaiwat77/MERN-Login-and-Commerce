import axios from "axios";

export const listUser = async (authtoken) => {
  // console.log(authtoken);
  return await axios.get(process.env.REACT_APP_API + "/users", {
    headers: {
      authtoken,
    },
  });
};

export const changeStatus = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/change-status", value, {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/change-role", value, {
    headers: {
      authtoken,
    },
  });
};

export const removeUser = async (authtoken, id) => {
  // console.log(authtoken);
  return await axios.delete(process.env.REACT_APP_API + "/users/" + id, {
    headers: {
      authtoken,
    },
  });
};

export const resetPassword = async (authtoken, id, values) => {
  // console.log(authtoken);
  return await axios.put(process.env.REACT_APP_API + "/users/" + id, values, {
    headers: {
      authtoken,
    },
  });
};

export const userCart = async (authtoken, cart) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/cart",
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getUserCart = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
};

export const emptyCart = async (authtoken) => {
  return await axios.delete(process.env.REACT_APP_API + "/user/cart", {
    headers: {
      authtoken,
    },
  });
};

//Address
export const saveAddress = async (authtoken, address) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/address",
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
};

//Create Order
export const saveOrder = async (authtoken) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/order",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getOrder = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/order", {
    headers: {
      authtoken,
    },
  });
};

// wishlist
export const getWishList = async (authtoken) => {
  return await axios.get(process.env.REACT_APP_API + "/user/wishlist", {
    headers: {
      authtoken,
    },
  });
};

export const addToWishList = async (authtoken, productId) => {
  return await axios.post(
    process.env.REACT_APP_API + "/user/wishlist",
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const removeToWishList = async (authtoken, productId) => {
  return await axios.put(
    process.env.REACT_APP_API + "/user/wishlist/" + productId,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
