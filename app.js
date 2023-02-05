let page = 1;
const limit = 10;
let paginationLinks = document.querySelectorAll(".page-link");
const previousPagionation = document.querySelector(".previous");
const nextPagionation = document.querySelector(".next");
async function getData(page) {
  let respon = await fetch(
    `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${10}`
  );
  let data = await respon.json();
  for (let i = 0; i < data.length; i++) {
    ul.append(createLi(data[i].body, data[i].id));
  }
}
let ul = document.querySelector("#comments");
let pagination = document.querySelector(".pagination");

function createLi(body, id) {
  let li = document.createElement("li");
  li.innerText = `${body} ID: ${id}`;
  return li;
}

paginationLinks.forEach((paginationLink) => {
  paginationLink.addEventListener("click", (e) => {
    let clickedPage = e.target.innerText;
    let activeLink = document.querySelector(".page-item.active")
    if (page !== 10) {
      nextPagionation.removeAttribute("disabled");
    }
    if (page !== 1) {
      previousPagionation.removeAttribute("disabled");
    }

    if (clickedPage === "Next") {
      page++;
      activeLink.classList.remove("active")
      paginationLinks[page].parentElement.classList.add("active")
    } 
    else if (clickedPage === "Previous") {
      page--;
      activeLink.classList.remove("active");
      paginationLinks[page].parentElement.classList.add("active");
    }
    else {
      page = +clickedPage
      activeLink.classList.remove("active");
      paginationLinks[page].parentElement.classList.add("active");
    }


    if (page === 10) {
      nextPagionation.setAttribute("disabled", true);
    }
    if (page === 1) {
      previousPagionation.setAttribute("disabled", true);
    }
    ul.innerHTML = ""
    getData(page)
  });
});

getData(page);
