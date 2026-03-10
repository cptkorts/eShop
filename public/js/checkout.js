var orderBtn = document.getElementById("order-btn");
if (orderBtn) {
  orderBtn.addEventListener("click", function () {
    var url = orderBtn.getAttribute("data-url");
    if (url) {
      window.location.href = url;
    }
  });
}
