const $form = document.getElementById("collegeInfoForm").querySelector("div");

const fixList = () => {
  const $courseNameInput = document.querySelectorAll(
    'input[class="courseName"]'
  );
  const $numberOfSeatsInput = document.querySelectorAll(
    'input[class="numberOfSeats"]'
  );
  const $maxPackageInput = document.querySelectorAll(
    'input[class="maxPackage"]'
  );
  const $averagePackageInput = document.querySelectorAll(
    'input[class="averagePackage"]'
  );
  const $placementPercentInput = document.querySelectorAll(
    'input[class="placementPercent"]'
  );

  for (let i = 0, len = $courseNameInput.length; i < len; i++) {
    $courseNameInput[i].name = `courses[${i}][courseName]`;
  }

  for (let i = 0, len = $numberOfSeatsInput.length; i < len; i++) {
    $numberOfSeatsInput[i].name = `courses[${i}][numberOfSeats]`;
  }
  for (let i = 0, len = $maxPackageInput.length; i < len; i++) {
    $maxPackageInput[i].name = `courses[${i}][maxPackage]`;
  }
  for (let i = 0, len = $averagePackageInput.length; i < len; i++) {
    $averagePackageInput[i].name = `courses[${i}][averagePackage]`;
  }
  for (let i = 0, len = $placementPercentInput.length; i < len; i++) {
    $placementPercentInput[i].name = `courses[${i}][placementPercent]`;
  }
};

fixList();

const addToList = () => {
  const $courseInputTemplate =
    '  <div> course name : <input type="text" class="courseName"> </div> <div> number of seat: <input type="number" class="numberOfSeats"> </div> <div> maxPackage: <input type="text" class="maxPackage"> </div> <div> averagePackage : <input type="text" class="averagePackage"> </div> <div> placementPercent: <input type="text" class="placementPercent"> </div>  ';

  const $div = document.createElement("div");
  $form.appendChild($div);
  $div.innerHTML = $courseInputTemplate;

  fixList();
};
