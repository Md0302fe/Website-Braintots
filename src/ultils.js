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

export const converDateString = (dateString) => {
  try {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
  } catch (error) {
    console.log("Lỗi trong quá trình convert thời gian : ", error);
  }
};
