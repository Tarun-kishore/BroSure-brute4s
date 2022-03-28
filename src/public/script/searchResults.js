const $container = document.getElementById("card-container");
const $loadingButton = document.getElementById("loadMore");
const $searchForm = document.getElementById("searchForm");
const $searchInput = document.getElementById("searchInput");
const $searchButton = document.getElementById("searchButton");

const limit = 10;
let skip = 0;

const getResults = (search) => {
  fetch("/info/search", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ limit, skip, search }),
  })
    .then((data) => data.json())
    .then((colleges) => {
      skip += limit;
      colleges.forEach((college) => {
        const div = document.createElement("div");
        div.className = "card-body col-12";

        div.innerHTML = `
        <div class="card-left">
        <div class="college-name">
          <p onclick="reDirect('/info/view/${college._id}');">${college.college}</p>
        </div>
        <div class="card-info">${college.university}</div>
        <div class="card-info college-desc">${college.desc}</div>
        <div class="card-info">Number of courses: ${college.numberOfCourses}</div>
        <div class="card-info">Total Seats: ${college.totalSeats}</div>
      </div>
      <div class="card-right">
        <figure class="image is-4by3">
          <img
            src="https://unpkg.collegeplanning-nonprod.collegeboard.org/@acorn/college-search-filters-mfe@%5E1.0.0/system/363c5b8febf30f3e84df57ed3751bc1d.svg"
            class="img-fluid"
            alt=""
          />
        </figure>
      </div>
      `;
        $container.appendChild(div);
      });
    })
    .catch((e) => {});
};

$searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  skip = 0;
  $container.innerHTML = "";
  getResults($searchInput.value);
});

$loadingButton.addEventListener("click", (e) => {
  getResults($searchInput.value);
});
