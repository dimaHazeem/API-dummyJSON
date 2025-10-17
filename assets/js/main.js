const loader = document.querySelector('.loader');
const getCategories = async () => {
    try {
        loader.classList.remove('d-none');
        const response = await axios.get(`https://dummyjson.com/products/category-list?limit=4`);
        console.log(response);
        if (response.status == 200) {
            const result = response.data.map(category =>
                `
            <div class="col-6 col-md-3 mb-4">
                <div class="card text-center mb-3 border-0" >
                    <div class="category-card category" data-category="${category}">
                        <h5 class="card-title">${category}</h5>
                    </div>
                </div>
            </div>
            `
            ).join('');
            document.querySelector(".Categories").innerHTML =
                `
        <div class = "row">
            ${result}
        <div>    
        ` ;
            const categories = document.querySelectorAll('.category');
            categories.forEach(cat => {
                cat.addEventListener("click", () => {
                    const selectedCategory = cat.getAttribute('data-category');
                    window.location.href = `Categories_Products.html?category=${selectedCategory}`;
                });
            });
        }
    } catch (err) {
        document.querySelector('.text-danger').textContent = "Error , Data not found";
    } finally {
        loader.classList.add('d-none');
    }
}
getCategories();