// check JSON string
export const isJsonString = (data) => {
  try {
    // chuyển đổi json thành 1 đối tượng js
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

// get base x64
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  // Conver Price from ',' to '.'
export const convertPrice = (price) => {
  try {
    // pass price
    const result = price.toLocaleString().replaceAll(",", ".");
    return result;
  } catch (error) {
    return null;
  }
};
