// components/FetchData.js

export default async function fetchData() {
  try {
    let response = await fetch('/data/data.json');
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
    return response.json();
  } catch (err) {
    console.error('Ошибка при получении данных:', err.message);
    return [];
  }
}
