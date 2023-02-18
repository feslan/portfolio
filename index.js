const text = '<b class="text-gray-500">text<b/>';
const str = document.getElementById("str");
str.addEventListener("click", function () {
  str.innerHTML = text;
});
