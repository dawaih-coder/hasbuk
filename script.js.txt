// مواضع عشوائية (مثال بسيط للتجربة)
const places = [
  "الجزء الأول - الصفحة 3",
  "الجزء الخامس - الصفحة 102",
  "الجزء العاشر - الصفحة 200",
  "الجزء الخامس عشر - الصفحة 300",
  "الجزء العشرون - الصفحة 400",
  "الجزء الثلاثون - الصفحة 600"
];

document.getElementById("generate").addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * places.length);
  document.getElementById("result").textContent = "📖 الموضع المختار: " + places[randomIndex];
});
