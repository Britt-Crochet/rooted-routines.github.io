
function updateCalendar() {
    const calendarEl = document.getElementById('live-calendar');
    if (calendarEl) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        calendarEl.textContent = now.toLocaleDateString(undefined, options);
    }
}
