const heroSlider = document.getElementById("hero-slider");
const heroImages = [
  "slide.webp",
  "slide1.webp",
  "slide12.webp",
];

let heroIndex = 0;

function changeHeroBackground() {
  heroSlider.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
  heroIndex = (heroIndex + 1) % heroImages.length;
}

changeHeroBackground(); 
setInterval(changeHeroBackground, 5000);

function toggleMenu() {
  const menu = document.getElementById('nav-menu');
  menu.classList.toggle('active');
}

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-menu').classList.remove('active');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");

  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    const speed = 200;

    const updateCount = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target); // مرة وحدة فقط
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => counterObserver.observe(counter));

  // التأثير البصري عند الظهور
  const faders = document.querySelectorAll(".fade-in");
  const faderObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  faders.forEach(fader => faderObserver.observe(fader));

  // ✅ قائمة الجوال المنسدلة
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    const links = mobileMenu.querySelectorAll("a");

    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    links.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
});

// ✅ الثيم الداكن / الفاتح
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

toggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// ✅ التحقق من النماذج
function handleFormValidation(formId, fieldsConfig, messages) {
  const form = document.getElementById(formId);
  if (!form) return;

  const errorMsg = form.querySelector('.general-error');
  const successMsg = form.querySelector('.success-msg');

  function validateField(field) {
    const input = document.getElementById(field.id);
    const errorSpan = input.nextElementSibling;
    const value = input.value.trim();

    if (value === '') {
      errorSpan.textContent = field.msgEmpty;
      return false;
    }

    if (field.id.includes('Email')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorSpan.textContent = field.msgInvalid;
        return false;
      }
    }

    if (field.id === 'amount') {
      const num = Number(value);
      if (isNaN(num) || num <= 0) {
        errorSpan.textContent = field.msgInvalid;
        return false;
      }
    }

    errorSpan.textContent = '';
    return true;
  }

  fieldsConfig.forEach(field => {
    const input = document.getElementById(field.id);
    if (!input) return;

    input.addEventListener('blur', () => validateField(field));
    input.addEventListener('input', () => {
      input.nextElementSibling.textContent = '';
      if (errorMsg) errorMsg.textContent = '';
      if (successMsg) successMsg.textContent = '';
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let hasError = false;
    fieldsConfig.forEach(field => {
      if (!validateField(field)) hasError = true;
    });

    if (hasError) {
      if (errorMsg) errorMsg.textContent = messages.error;
      if (successMsg) successMsg.textContent = '';
    } else {
      if (errorMsg) errorMsg.textContent = '';
      if (successMsg) successMsg.textContent = messages.success;
      form.reset();
      setTimeout(() => {
        if (successMsg) successMsg.textContent = '';
      }, 4000);
    }
  });
}

handleFormValidation('donationForm', [
  { id: 'donorName', msgEmpty: 'يرجى إدخال الاسم الكامل' },
  { id: 'donorEmail', msgEmpty: 'يرجى إدخال البريد الإلكتروني', msgInvalid: 'يرجى إدخال بريد إلكتروني صالح' },
  { id: 'amount', msgEmpty: 'يرجى إدخال مبلغ التبرع', msgInvalid: 'يرجى إدخال مبلغ صحيح أكبر من 0' },
  { id: 'paymentMethod', msgEmpty: 'يرجى اختيار طريقة الدفع' }
], {
  error: 'يرجى تصحيح الأخطاء في النموذج',
  success: ' تم إرسال التبرع بنجاح!'
});

handleFormValidation('contactForm', [
  { id: 'name', msgEmpty: 'يرجى إدخال الاسم الكامل' },
  { id: 'email', msgEmpty: 'يرجى إدخال البريد الإلكتروني', msgInvalid: 'يرجى إدخال بريد إلكتروني صالح' },
  { id: 'subject', msgEmpty: 'يرجى إدخال الموضوع' },
  { id: 'message', msgEmpty: 'يرجى إدخال الرسالة' }
], {
  error: 'يرجى تصحيح الأخطاء في النموذج',
  success: ' تم إرسال النموذج بنجاح!'
});
