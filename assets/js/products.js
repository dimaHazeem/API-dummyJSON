const loader = document.querySelector('.loader');
const getProducts = async () => {
    try {
        loader.classList.remove('d-none');
        const response = await axios.get(`https://dummyjson.com/products?limit=4`);
        if (response.status == 200) {
            const result = response.data.products.map(product =>
                `
            <div class = "col-6 col-md-3 mb-4">
                <div class="card flex-fill h-100" style="width: 18rem;">
                    <img src= ${product.thumbnail} class="card-img-top" alt=${product.title}>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text flex-grow-1">${product.description}</p>
                        <p class="card-text text-secondary">${product.category}</p>
                        <div class="d-flex justify-content-between align-items-center mt-aut">
                            <span class="w-100 d-none d-md-block">${product.price}</span>
                            <a href="productDetails.html?id=${product.id}" class="btn btn-primary mt-2"> Detaits </a>
                        </div>
                    </div>
                </div>
            </div>
            `
            ).join('');
            document.querySelector(".products").innerHTML +=
                `
        <div class = "row">
            ${result}
        <div>    
        ` ;
        }
    } catch (err) {
        document.querySelector('.text-danger').textContent = "Error , Data not found";
    } finally {
        loader.classList.add('d-none');
    }
}
getProducts();

const back = document.querySelector('.back');
back.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
})