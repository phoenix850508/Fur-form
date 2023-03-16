const dogs = [{ name: "小黑", age: "2歲", img: 'https://images.unsplash.com/photo-1554224311-beee415c201f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80', breed: '臘腸犬', sex: "公" },
{ name: "花花", age: "4歲", img: 'https://images.pexels.com/photos/2737393/pexels-photo-2737393.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', breed: '柯基犬', sex: "母" },
{ name: "皮克", age: "3歲", img: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', breed: '牧羊犬', sex: "公" },
{ name: "哈金", age: "6歲", img: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', breed: '黃金獵犬', sex: "母" },
{ name: "藍哥", age: "7歲", img: 'https://images.unsplash.com/photo-1511382686815-a9a670f0a512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80', breed: '牧羊犬', sex: "公" },
{ name: "大小姐", age: "5歲", img: 'https://images.pexels.com/photos/164186/pexels-photo-164186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', breed: '柯基犬', sex: "母" },
{ name: "公主", age: "2歲", img: 'https://images.pexels.com/photos/545063/pexels-photo-545063.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', breed: '法國鬥牛犬', sex: "母" },
{ name: "獨角獸", age: "2歲", img: 'https://images.pexels.com/photos/1564506/pexels-photo-1564506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', breed: '法國鬥牛犬', sex: "公" },
{ name: "阿獅", age: "3歲", img: 'https://images.unsplash.com/photo-1446231855385-1d4b0f025248?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', breed: '松獅犬', sex: "母" },
{ name: "辛巴", age: "2歲", img: 'https://images.unsplash.com/photo-1455526050980-d3e7b9b789a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=625&q=80', breed: '中華田園犬', sex: "公" },
{ name: "豆皮", age: "2歲", img: 'https://images.unsplash.com/photo-1446730853965-62433e868929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', breed: '貴賓犬', sex: "公" },
{ name: "阿瓜", age: "2歲", img: 'https://images.unsplash.com/photo-1513757271804-385fb022e70a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', breed: '吉娃娃', sex: "母" }
]
const sex = { male: `<i class="fa-solid fa-mars sex"></i>`, female: `<i class="fa-solid fa-venus sex female"></i>` }

const cardPanel = document.querySelector(".card-panel");
const steps = document.querySelectorAll(".step");
const preBtn = document.querySelector(".btn-outline");
const nextBtn = document.querySelector(".btn-primary");
const formRow = document.querySelectorAll(".form-row");
const form = document.querySelector("#form");
const bDay = document.querySelector("#birthday");
const sortBar = document.querySelector(".sort-bar");
const viewAll = document.querySelector(".view-all");

// 用JavaScript渲染出多個狗狗資料卡片
function renderCard(data) {
  let rawHTML = '';
  for (let i = 0; i < data.length; i++) {
    rawHTML += `<div class="card">
        <img src="${data[i].img}" alt="" class="card-img" />
        <div class="card-text">
          <h2 class="card-title">${data[i].name}</h2>
          <p class="card-age"><i class="fa-sharp fa-solid fa-baby-carriage"></i>${data[i].age}</p>
          <p class="card-breed"><i class="fa-sharp fa-solid fa-paw"></i></i>${data[i].breed}</p>
          <button class="btn card-btn" type="button">詳細</button>
        </div>
      </div>`
  }
  cardPanel.innerHTML = rawHTML;
}
renderCard(dogs)

// 幫狗狗加上性別圖示
function addGender(data) {
  const cardTitle = document.querySelectorAll(".card-title");
  const male = data.filter(each => each.sex === "公")
  const female = data.filter(each => each.sex === "母")
  cardTitle.forEach(card => {
    male.forEach(each => {
      if (each.name === card.textContent) card.innerHTML += sex.male;
    })
    female.forEach(each => {
      if (each.name === card.textContent) card.innerHTML += sex.female;
    })
  })
}
addGender(dogs)

// 過濾符合sort-bar的狗狗卡片
function filterCards() {
  if (sortBar.children[0].value !== "" && sortBar.children[1].value !== "") {
    const doubleFilter = dogs.filter(dog => dog.sex === sortBar.children[0].value && dog.breed === sortBar.children[1].value);
    renderCard(doubleFilter);
  }
  else {
    let singleFilter = dogs.filter(dog => dog.sex === sortBar.children[0].value || dog.breed === sortBar.children[1].value);
    singleFilter.length === 0 ? renderCard(dogs) : renderCard(singleFilter);
  }
}

// 清空select裡的資料
function clearSelection() {
  for (let i = 0; i < sortBar.children.length; i++) {
    if (sortBar.children[i].tagName === "select") {
      sortBar.children[i].reset();
    }
  }
}

//上一步和下一步按鈕控制
let step = 0;

function handleBtnControl(e) {
  let nowStep = steps[step];
  let nextStep = steps[step + 1];
  if (e.target.tagName === "BUTTON" || e.target.tagName === "ACTION") {
    //讓表格檢查是否有表格不符規格
    // if (!form.checkValidity()) return
    //處理下一步
    if (e.target.classList[1].includes("btn-primary") && step === 0) {
      e.preventDefault();
      nowStep.classList.add("checked");
      nowStep.classList.remove("active");
      formRow[1].classList.remove("d-none");
      formRow[0].classList.add("d-none");
      nextStep.classList.add("active");
      step += 1;
      nextBtn.type = "submit";
      nextBtn.innerText = "送出表單";
    }
    //處理上一步
    else if (e.target.classList[1].includes("btn-outline") && step === 1) {
      let prevStep = steps[step - 1];
      nowStep.classList.remove("active");
      prevStep.classList.remove("checked");
      prevStep.classList.add("active");
      formRow[1].classList.add("d-none");
      formRow[0].classList.remove("d-none");
      step -= 1;
      // nextBtn.type = "button";
      nextBtn.innerText = "下一步";
    }
  }
  setBtnDisabled()
}

//使上一步按鈕失效
function setBtnDisabled() {
  if (step === 0) {
    preBtn.setAttribute("disabled", "disabled");
  }
  else {
    preBtn.removeAttribute("disabled");
  }
}

function validateForm(e) {
  if (!form.checkValidity()) {
    e.preventDefault();
    e.stopPropagation();
  }
}

//確認使用者年齡小於20歲
function validateAge(e) {
  const newDate = +new Date(e.target.value);
  const userAge = ((Date.now() - newDate) / (31557600000));
  bDay.setCustomValidity('');
  if (userAge < 20) {
    bDay.setCustomValidity("Invalid field.");
  }
}


//監聽器
form.addEventListener("click", (e) => {
  handleBtnControl(e)
})

form.addEventListener("submit", function onFormSubmit(e) {
  validateForm(e)
})

nextBtn.addEventListener("click", function onSubmitBtnClick(e) {
  form.classList.add("was-validated");
})
bDay.addEventListener("input", function onDateInput(e) {
  validateAge(e)
})

sortBar.addEventListener("input", function onSelectClick() {
  filterCards()
  addGender(dogs)
})

viewAll.addEventListener("click", function onViewAllClicked() {
  renderCard(dogs)
  addGender(dogs)
  clearSelection()
})



