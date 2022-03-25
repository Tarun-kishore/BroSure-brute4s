const $container = document.getElementById("container");
const $loadingButton = document.getElementById("loadMore");

const limit = 10;
let skip = 0;

const load = () => {
  fetch("/info/all", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ limit, skip }),
  })
    .then((data) => data.json())
    .then((colleges) => {
      skip += limit;
      colleges.forEach((college) => {
        const div = document.createElement("div");

        div.innerHTML = `
                <div><a href='/info/view/${college._id}'>${college.college}</a></div>
                <div>${college.university}</div>
                <div>${college.desc}</div>
                <div>${college.numberOfCourses}</div>
                <div>${college.maxPackage.$numberDecimal}</div>
                <div>${college.averagePackage}</div>
                <div>${college.totalSeats}</div>
            `;

        $container.appendChild(div);
      });
    })
    .catch((e) => {});
};

load();

$loadingButton.addEventListener("click", (e) => {
  load();
});
