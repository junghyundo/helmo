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
            // slot-time 요소를 보존하면서 이미지만 추가
            const slotTime = selectedSlot.querySelector('.slot-time');
            const timeText = slotTime ? slotTime.textContent : '';
            
            selectedSlot.innerHTML = `
                <span class="slot-time">${timeText}</span>
                <img src="${e.target.result}" alt="업로드 이미지">
            `;
            selectedSlot.classList.add("has-image");
            updateFileCounter();
        };
        reader.readAsDataURL(file);
        
        // 파일 입력 초기화 (같은 파일을 다시 선택할 수 있도록)
        fileInput.value = '';
    }
});

// 파일 선택 시 슬롯에 이미지 표시 (여러 개)
multipleFileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    const imageSlots = Array.from(slots);

    // 먼저 모든 슬롯을 초기화
    imageSlots.forEach(slot => {
        const slotTime = slot.querySelector('.slot-time');
        const timeText = slotTime ? slotTime.textContent : '';
        
        slot.innerHTML = `
            <span class="slot-time">${timeText}</span>
            <div class="slot-placeholder">
                <span class="plus-icon">+</span>
                <span class="add-text">이미지 추가</span>
            </div>
        `;
        slot.classList.remove("has-image");
    });

    // 선택된 파일들을 슬롯에 순서대로 배치
    for (let i = 0; i < imageSlots.length && i < files.length; i++) {
        const file = files[i];
        const slot = imageSlots[i];
        const reader = new FileReader();
        reader.onload = (e) => {
            // slot-time 요소를 보존하면서 이미지만 추가
            const slotTime = slot.querySelector('.slot-time');
            const timeText = slotTime ? slotTime.textContent : '';
            
            slot.innerHTML = `
                <span class="slot-time">${timeText}</span>
                <img src="${e.target.result}" alt="업로드 이미지">
            `;
            slot.classList.add("has-image");
        };
        reader.readAsDataURL(file);
    }
    
    // 파일 입력 초기화 (중요: 같은 파일을 다시 선택할 수 있도록)
    multipleFileInput.value = '';
    updateFileCounter();
});

const rbtn = document.getElementsByClassName("save-btn");

function buttonClicked(){
    console.log('🔍 결과보기 버튼이 클릭되었습니다.');
    
    // 선택된 이미지들을 수집
    const selectedImages = [];
    const imageSlots = document.querySelectorAll(".slot.has-image");
    
    console.log(`📊 선택된 이미지 슬롯 개수: ${imageSlots.length}`);
    
    imageSlots.forEach((slot, index) => {
        const img = slot.querySelector('img');
        const slotId = slot.getAttribute('data-slot-id');
        const timeSlotElement = slot.querySelector('.slot-time');
        const timeSlot = timeSlotElement ? timeSlotElement.textContent : `슬롯 ${slotId}`;
        
        if (img) {
            selectedImages.push({
                slotId: slotId,
                timeSlot: timeSlot,
                imageData: img.src
            });
            console.log(`✅ 이미지 수집: ${timeSlot} (슬롯 ID: ${slotId})`);
        }
    });
    
    // localStorage에 이미지 데이터 저장
    localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
    console.log(`💾 localStorage에 ${selectedImages.length}개 이미지 저장 완료`);
    
    // URL에서 date 파라미터를 가져와서 result.html로 전달
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get('date');
    
    console.log(`📅 날짜 파라미터: ${dateParam}`);
    
    try {
        if (dateParam) {
            console.log(`🔄 이동 중: result.html?date=${dateParam}`);
            window.location.href = `result.html?date=${dateParam}`;
        } else {
            console.log(`🔄 이동 중: result.html`);
            window.location.href = `result.html`;
        }
    } catch (error) {
        console.error('❌ 페이지 이동 중 오류:', error);
        alert('페이지 이동 중 오류가 발생했습니다. 콘솔을 확인해주세요.');
    }
};


// 파일 선택 개수 업데이트
function updateFileCounter() {
    const filledSlots = document.querySelectorAll(".slot.has-image").length;
    fileCounterEl.textContent = `총 ${filledSlots}개 이미지 파일이 선택되었습니다.`;
}

// 전역에서 접근 가능하도록 window 객체에 함수 할당
window.buttonClicked = buttonClicked;

// DOMContentLoaded 이벤트로 버튼에 이벤트 리스너 추가 (대안 방법)
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Detail.js 로드 완료');
    
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        console.log('✅ 저장 버튼 찾음');
        
        // onclick 속성 외에 추가로 이벤트 리스너도 등록
        saveBtn.addEventListener('click', function(e) {
            console.log('📱 버튼 클릭 (addEventListener 방식)');
            buttonClicked();
        });
    } else {
        console.error('❌ 저장 버튼을 찾을 수 없습니다');
    }
});