const perPage = 4;
let currentReponse = null;
const displayProducts = (response, page = 1) => {
    if (response.status === 200) {
        const total = response.data.products.length;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const productsToShow = response.data.products.slice(start, end);
        const result = productsToShow.map(product =>
            `
            <div class = "col-6 col-md-3 mb-4">
                <div class="card h-100" style="width: 18rem;">
                    <img src= ${product.thumbnail} class="card-img-top" alt=${product.title}>
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">${product.category}</p>
                        <span class="w-100 d-none d-md-block">${product.price}</span>
                        <a href="productDetails.html?id=${product.id}" class="btn btn-primary mt-2"> Details </a>
                    </div>
                </div>
            </div>
            `
        ).join('');
        document.querySelector(".Categories_Products").innerHTML = `<div class="row">${result}</div>`;

        // Pagination;
        const pageNumbers = Math.ceil(total / perPage);
        let paginationLink = "";
        if (page > 1) {
            paginationLink += `<li class="page-item">
                    <button class="page-link" onclick="displayProducts(currentReponse,${page - 1})">Previous</button>
                </li>`;
        } else {
            paginationLink += `<li class="page-item"><button class="page-link" disabled>Previous</button></li>`;
        }

        for (let i = 1; i <= pageNumbers; i++) {
            if (i === 1 || i === pageNumbers || (i > page - 3 && i < page + 3)) {
                paginationLink += `<li class="page-item">
                        <button class="page-link ${i === page ? 'active' : ''}" onclick="displayProducts(currentReponse, ${i})">${i}</button>
                    </li>`;
            }
        }

        if (page < pageNumbers) {
            paginationLink += `<li class="page-item">
                    <button class="page-link" onclick="displayProducts(currentReponse,${page + 1})">Next</button>
                </li>`;
        } else {
            paginationLink += `<li class="page-item"><button class="page-link" disabled>Next</button></li>`;
        }

        document.querySelector(".pagination").innerHTML = paginationLink;
    }
}

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const loader = document.querySelector('.loader');
const getProductsByCategory = async (category) => {
    try{
        loader.classList.remove('d-none');
        if (!category) return;
        const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
        document.querySelector(".title").textContent += category + " Prodects";
        currentReponse = response;
        displayProducts(response);        
    }catch (err) {
        document.querySelector('.text-danger').textContent = "Error , Data not found";
    } finally {
        loader.classList.add('d-none');
    }
}

getProductsByCategory(category);

const back = document.querySelector('.back');
back.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
})