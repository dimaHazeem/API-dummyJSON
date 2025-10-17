const loader = document.querySelector('.loader');
const displayProducts = (response) => {
  console.log(response.data);
  const p = response.data;
  if (response.status === 200) {
    const result =
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
    document.querySelector(".productDetails").innerHTML += result;

    if (p.reviews && p.reviews.length > 0) {
      const resultHTML = p.reviews.map((review) =>
        `
          <tr>
            <th scope="col">${review.rating}</th>
            <th scope="col">${review.comment}</th>
            <th scope="col">${review.date}</th>
            <th scope="col">${review.reviewerName}</th>
            <th scope="col">${review.reviewerEmail}</th>
          </tr>
        `).join("");
      document.querySelector(".reviews").innerHTML += resultHTML;
    } else {
      document.querySelector(".reviews").innerHTML = 
      `
        <tr>
          <td colspan="5" class="text-center text-muted">No reviews available.
          </td>
        </tr>
      `;
    }
  }
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const getProductDetails = async (id) => {
  try {
    loader.classList.remove('d-none');
    console.log(id);
    if (!id) return;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    displayProducts(response);
  } catch (err) {
    document.querySelector('.text-danger').textContent = "Error , Data not found";
  } finally {
    loader.classList.add('d-none');
  }

}
getProductDetails(id);


const back = document.querySelector('.back');
back.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "index.html"; 
  }
})