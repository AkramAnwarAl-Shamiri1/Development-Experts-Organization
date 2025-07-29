// تفعيل زر إظهار وإخفاء الشريط الجانبي في الموبايل
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.getElementById("sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
});

// رسم بياني لعدد المتطوعين شهريًا باستخدام Chart.js
const ctx = document.getElementById('volunteersChart').getContext('2d');
const volunteersChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [{
      label: 'عدد المتطوعين',
      data: [30, 45, 60, 50, 70, 80],
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});
