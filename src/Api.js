export const fetchCalculator = async (num1, num2, operation) => {
  try {
    let url = `http://localhost:8080/?num1=${num1}&num2=${num2}&operation=${operation}`;
    const res = await fetch(url, {
      method: "POST",
      mode: "cors", // <---
      cache: "default",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
