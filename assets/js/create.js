const createUser = document.forms['newUser'];
const input = Array.from(document.querySelectorAll('.form-control'));
const invalidVlaue = document.querySelectorAll('.text-danger');

createUser.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = validateTitle() && validateDescription() && validateCategory();   
    if (isValid == false) {
        alert();
        return;
    }
    const formData = new FormData(createUser);
    const response = await axios.post("https://dummyjson.com/products/add", formData);
    console.log(response);

    if (response.status == 201) {
        Swal.fire({
            title: "Success!",
            icon: "success",
            draggable: true
        }).then(() => {
            location.href = 'allProducts.html';
        });
    }
});
const validateTitle = () => {
    const regex = /^[A-Za-z0-9\s'’\-]{3,50}$/;
    if (!regex.test(input[0].value)) {
        input[0].classList.remove('is-valid');
        input[0].classList.add('is-invalid');
        invalidVlaue[0].innerHTML = 
            "Title must be 3–50 characters long and can only contain letters, numbers, spaces, hyphens, or apostrophes.";
        return false;
    } else {
        input[0].classList.remove('is-invalid');
        input[0].classList.add('is-valid');
        invalidVlaue[0].textContent = "";
        return true;
    }
}
const validateDescription = () =>{
    const regex = /^[A-Za-z0-9\s.,!'"()\-]{10,300}$/;
    if (!regex.test(input[1].value)) {
        input[1].classList.remove('is-valid');
        input[1].classList.add('is-invalid');
        invalidVlaue[1].innerHTML = 
            "Description must be 10–300 characters and can include letters, numbers, spaces, and punctuation (. , ! ' ( ) -).<br><br>Example : Durable and stylish bag for everyday use";
        return false;
    } else {
        input[1].classList.remove('is-invalid');
        input[1].classList.add('is-valid');
        invalidVlaue[1].textContent = "";
        return true;
    }
}
const validateCategory = () => {
    const regex = /^[A-Za-z\s]{3,30}$/;
    if (!regex.test(input[2].value)) {
        input[2].classList.remove('is-valid');
        input[2].classList.add('is-invalid');
        invalidVlaue[2].innerHTML = 
            "Category must be 3–30 characters long and can only include letters, numbers, and spaces.<br><br>Example: Home Appliances";
        return false;
    } else {
        input[2].classList.remove('is-invalid');
        input[2].classList.add('is-valid');
        invalidVlaue[2].textContent = "";
        return true;
    }
}
const alert = () => {
    Swal.fire({
        title: "Input data is Wrong ,Please check the value again",
        showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
        },
        hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
        }
    });
}
input[0].addEventListener("input", validateTitle);
input[1].addEventListener("input", validateDescription);
input[2].addEventListener("input",validateCategory);

const back = document.querySelector('.back');
back.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "index.html"; 
  }
})