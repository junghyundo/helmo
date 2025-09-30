const fileCounterEl = document.getElementById("fileCounter");
const fileInput = document.getElementById("fileInput");
const multipleFileInput = document.getElementById("multipleFileInput");
const slots = document.querySelectorAll(".slot");
const multipleAddSlot = document.getElementById("multipleAddSlot");

let selectedSlot = null;

// URL에서 날짜 정보를 가져와 표시
const urlParams = new URLSearchParams(window.location.search);
const dateParam = urlParams.get('date');
const uploadDateInfoEl = document.getElementById("uploadDateInfo");
const uploadDateInfoEl2 = document.getElementById("uploadDateInfo2");

if (dateParam) {
    const dateObj = new Date(dateParam);
    const formattedDate = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

    uploadDateInfoEl.textContent = formattedDate;
    uploadDateInfoEl2.textContent = dateParam;
}

// 개별 슬롯 클릭 시 파일 입력 열기
slots.forEach(slot => {
    slot.addEventListener("click", () => {
        selectedSlot = slot;
        fileInput.click();
    });
});

// '여러 이미지 한번에 추가' 슬롯 클릭 시 파일 입력 열기
multipleAddSlot.addEventListener("click", () => {
    multipleFileInput.click();
});

// 파일 선택 시 슬롯에 이미지 표시 (개별)
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && selectedSlot) {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedSlot.innerHTML = `<img src="${e.target.result}" alt="업로드 이미지">`;
            selectedSlot.classList.add("has-image");
            updateFileCounter();
        };
        reader.readAsDataURL(file);
    }
});

// 파일 선택 시 슬롯에 이미지 표시 (여러 개)
multipleFileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    const imageSlots = Array.from(slots);

    for (let i = 0; i < imageSlots.length && i < files.length; i++) {
        const file = files[i];
        const slot = imageSlots[i];
        const reader = new FileReader();
        reader.onload = (e) => {
            slot.innerHTML = `<img src="${e.target.result}" alt="업로드 이미지">`;
            slot.classList.add("has-image");
        };
        reader.readAsDataURL(file);
    }
    updateFileCounter();
});

const rbtn = document.getElementsByClassName("save-btn");

function buttonClicked(){
    // URL에서 date 파라미터를 가져와서 result.html로 전달
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date');
    
    if (dateParam) {
        window.location.href = `result.html?date=${dateParam}`;
    } else {
        window.location.href = `result.html`;
    }
};


// 파일 선택 개수 업데이트
function updateFileCounter() {
    const filledSlots = document.querySelectorAll(".slot.has-image").length;
    fileCounterEl.textContent = `총 ${filledSlots}개 이미지 파일이 선택되었습니다.`;
}