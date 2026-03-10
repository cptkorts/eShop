const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("[name=productId]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;

  const productElement = btn.closest("article");

  fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      productElement.remove();
    })
    .catch((err) => console.log(err));
};

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".delete-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      deleteProduct(btn);
    });
  });
});
