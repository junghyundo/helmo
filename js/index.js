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

    // 클릭 이벤트
    div.addEventListener("click", () => {
        document.querySelectorAll(".calendar-grid .day").forEach(d => d.classList.remove("selected"));
        div.classList.add("selected");

        // 새로운 페이지로 이동
        const selectedDate = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        window.location.href = `detail.html?date=${selectedDate}`;
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

// 초기 렌더링
renderCalendar(currentMonth, currentYear);