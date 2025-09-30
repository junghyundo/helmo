const monthYear = document.getElementById("monthYear");
const calendarGrid = document.getElementById("calendarGrid");
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function renderCalendar(month, year) {
    calendarGrid.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    monthYear.textContent = `${year}년 ${month + 1}월`;

    // 요일 표시
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    weekdays.forEach((d, i) => {
    const div = document.createElement("div");
    div.textContent = d;
    div.classList.add("weekday");
    if (i === 0) div.classList.add("sunday");
    if (i === 6) div.classList.add("saturday");
    calendarGrid.appendChild(div);
    });

    // 공백 채우기
    for (let i = 0; i < firstDay; i++) {
    const div = document.createElement("div");
    calendarGrid.appendChild(div);
    }

    // 날짜 채우기
    for (let day = 1; day <= lastDate; day++) {
    const div = document.createElement("div");
    const dayOfWeek = new Date(year, month, day).getDay();
    div.textContent = day;
    div.classList.add("day");

    // 요일 색상 반영
    if (dayOfWeek === 0) div.classList.add("sunday");
    if (dayOfWeek === 6) div.classList.add("saturday");

    // 날짜 형식 생성
    const selectedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    // hover 시 나타날 버튼들 생성
    const buttonsDiv = document.createElement("p");
    buttonsDiv.classList.add("day-buttons");
    
    // 기록하기 버튼
    const recordBtn = document.createElement("button");
    recordBtn.textContent = "업로드";
    recordBtn.classList.add("day-btn", "record");
    recordBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `detail.html?date=${selectedDate}`;
    });
    
    // 결과보기 버튼
    const viewBtn = document.createElement("button");
    viewBtn.textContent = "결과보기";
    viewBtn.classList.add("day-btn", "view");
    viewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = `result.html?date=${selectedDate}`;
    });

    buttonsDiv.appendChild(recordBtn);
    buttonsDiv.appendChild(viewBtn);
    div.appendChild(buttonsDiv);

    // 기존 클릭 이벤트 (날짜 클릭 시)
    div.addEventListener("click", () => {
        // 모든 날짜에서 selected 클래스 제거
        document.querySelectorAll(".calendar-grid .day").forEach(d => d.classList.remove("selected"));
        // 현재 클릭한 날짜에만 selected 클래스 추가
        div.classList.add("selected");
        
        // 모든 기록 날짜 업데이트 (일별, 주간, 월간)
        updateAllDates(year, month, day);
        
        // window.location.href = `detail.html?date=${selectedDate}`;
    });
    
    calendarGrid.appendChild(div);
    }
}

// 이전 달
document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

// 다음 달
document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

// 선택된 날짜를 기준으로 모든 기록 날짜 업데이트하는 함수
function updateAllDates(year, month, day) {
  const selectedDate = new Date(year, month, day);
  
  // 일별 기록
  const dailyDate = selectedDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  document.getElementById('daily-date').textContent = dailyDate;
  
  // 주간 기록 (선택된 날짜가 포함된 주의 월요일 ~ 일요일)
  const dayOfWeek = selectedDate.getDay(); // 0(일) ~ 6(토)
  const monday = new Date(selectedDate);
  monday.setDate(selectedDate.getDate() - ((dayOfWeek + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const weeklyDate = `${monday.toLocaleDateString('ko-KR')} ~ ${sunday.toLocaleDateString('ko-KR')}`;
  document.getElementById('weekly-date').textContent = weeklyDate;

  // 월간 기록 (선택된 날짜의 월)
  const monthlyDate = selectedDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });
  document.getElementById('monthly-date').textContent = monthlyDate;
}

function updateDates() {
  const today = new Date();

  // 일별 기록 (기본값은 오늘 날짜)
  const dailyDate = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  document.getElementById('daily-date').textContent = dailyDate;

  // 주간 기록 (이번 주 월요일 ~ 일요일)
  const dayOfWeek = today.getDay(); // 0(일) ~ 6(토)
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const weeklyDate = `${monday.toLocaleDateString('ko-KR')} ~ ${sunday.toLocaleDateString('ko-KR')}`;
  document.getElementById('weekly-date').textContent = weeklyDate;

  // 월간 기록
  const monthlyDate = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
  });
  document.getElementById('monthly-date').textContent = monthlyDate;
}

updateDates();

// 초기 렌더링
renderCalendar(currentMonth, currentYear);