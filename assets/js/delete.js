const displayProducts = (response) => {
  const p = response.data;
  if (response.status === 200) {
    document.querySelector(".productDetails").innerHTML +=
      `
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${p.thumbnail}" class="img-fluid rounded-start" alt="${p.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${p.title}</h5>
              <p class="card-text">${p.description}</p>
              <p class="card-text"><strong>Category:</strong> ${p.category}</p>
              <p class="card-text"><strong>Price:</strong> $${p.price}</p>
              <p class="card-text"><strong>Rating:</strong> ${p.rating}</p>
            </div>
          </div>
        </div>
      </div>      
        `;

    if (p.reviews && p.reviews.length > 0) {
      const resultHTML = p.reviews.map((review, index) => `
    <tr>
      <th scope="col">${index + 1}</th>
      <th scope="col">${review.rating}</th>
      <th scope="col">${review.comment}</th>
      <th scope="col">${review.date}</th>
      <th scope="col">${review.reviewerName}</th>
    </tr>
  `).join("");
      document.querySelector(".reviews").innerHTML += resultHTML;
    } else {
      document.querySelector(".reviews").innerHTML = `
    <tr><td colspan="5" class="text-center text-muted">No reviews available.</td></tr>
  `;
    }

  }
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const loader = document.querySelector('.loader');

const getProductDetails = async (id) => {
  try{
    loader.classList.remove('d-none');
    if (!id) return;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    displayProducts(response);    
  }catch (err) {
        document.querySelector('.text-danger').textContent = "Error , Data not found";
    } finally {
        loader.classList.add('d-none');
    }

}
getProductDetails(id);


const deleteProduct = document.querySelector('.delete');
deleteProduct.addEventListener("click", () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await axios.delete(`https://dummyjson.com/products/${id}`);
      if (response.status == 200) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  }).then(() => {
    location.href = 'allProducts.html';
  });
})

const back = document.querySelector('.back');
back.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "index.html";
  }
})
