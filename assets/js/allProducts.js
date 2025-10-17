const ascTitle = document.querySelector('.ascTitle');
const ascPrice = document.querySelector('.ascPrice');
const descTitle = document.querySelector('.descTitle');
const descPrice = document.querySelector('.descPrice');
const Search = document.querySelector('.search-input');
const productList = document.querySelector('.allProducts');
const pagination = document.querySelector('.pagination');
const back = document.querySelector('.back');
const loader = document.querySelector('.loader');

let currentSort = "";
let currentSearch = "";
let currentSortBy = "";
const perPage = 4;


const getProductsPage = async (page = 1) => {
    try {
        loader.classList.remove('d-none');
        let url = "";
        if (currentSearch) {
            url = `https://dummyjson.com/products/search?q=${currentSearch}&limit=${perPage}&skip=${(page - 1) * perPage}`;
        } else {
            url = `https://dummyjson.com/products?limit=${perPage}&skip=${(page - 1) * perPage}`;
            if (currentSort)
                url += `&sortBy=${currentSortBy}&order=${currentSort}`;
        }
        const response = await axios.get(url);
        display(response, page);
    } catch (err) {
        document.querySelector('.text-danger').textContent = "Error , Data not found";
    } finally {
        loader.classList.add('d-none');
    }
}
const dNone = () => {
    const result = ``;
    productList.innerHTML = `<div class="row">${result}</div>`;

}
const display = (response, page = 1) => {
    if (response.status === 200) {
        const result = response.data.products.map(product =>
            `
                <div class="col-6 col-md-3 mb-4">
                    <div class="card flex-fill h-100" style="width: 18rem;">
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text flex-grow-1">${product.description}</p>
                            <p class="card-text text-secondary">${product.category}</p>
                            <span class="w-100 d-none d-md-block">$${product.price}</span>
                            <div class="d-flex justify-content-between align-items-center mt-aut">
                                <a href="productDetails.html?id=${product.id}" class="btn btn-primary mt-2">Details</a>
                                <a href="delete.html?id=${product.id}" class="btn btn-danger mt-2">Delete</a>
                            </div>    
                        </div>
                    </div>
                </div>
            `
        ).join('');

        productList.innerHTML = `<div class="row">${result}</div>`;

        // Pagination
        const total = response.data.total;
        const pageNumbers = Math.ceil(total / perPage);

        let paginationLink = "";
        if (page > 1) {
            paginationLink += `<li class="page-item">
                    <button class="page-link" onclick="getProductsPage(${page - 1})">Previous</button>
                </li>`;
        } else {
            paginationLink += `<li class="page-item"><button class="page-link" disabled>Previous</button></li>`;
        }

        for (let i = 1; i <= pageNumbers; i++) {
            if (i === 1 || i === pageNumbers || (i > page - 3 && i < page + 3)) {
                paginationLink += `<li class="page-item">
                        <button class="page-link ${i === page ? 'active' : ''}" onclick="getProductsPage(${i})">${i}</button>
                    </li>`;
            }
        }

        if (page < pageNumbers) {
            paginationLink += `<li class="page-item">
                    <button class="page-link" onclick="getProductsPage(${page + 1})">Next</button>
                </li>`;
        } else {
            paginationLink += `<li class="page-item"><button class="page-link" disabled>Next</button></li>`;
        }

        pagination.innerHTML = paginationLink;
    }
}

// Sorting
ascTitle.addEventListener("click", () => {
    currentSort = "asc";
    currentSortBy = "title";
    dNone();
    getProductsPage(1);
    document.querySelector(".all").textContent = "All Products, Ascending By Title";
});
ascPrice.addEventListener("click", () => {
    currentSort = "asc";
    currentSortBy = "price";
    dNone();
    getProductsPage(1);
    document.querySelector(".all").textContent = "All Products, Ascending By Price";
});

descTitle.addEventListener("click", () => {
    currentSort = "desc";
    currentSortBy = "title";
    dNone();
    getProductsPage(1);
    document.querySelector(".all").textContent = "All Products, Descending By Title";
});
descPrice.addEventListener("click", () => {
    currentSort = "desc";
    currentSortBy = "price";
    dNone();
    getProductsPage(1);
    document.querySelector(".all").textContent = "All Products, Descending By Price";
});


Search.addEventListener("input", () => {
    currentSearch = Search.value.trim();
    dNone();
    getProductsPage(1);
});

back.addEventListener("click", () => {
    window.location.href = "products.html";
});

getProductsPage();


/*const deleteProduct = (event, id) => {
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
                event.target.closest('card').remove();
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
}*/