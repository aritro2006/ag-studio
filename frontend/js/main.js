const BACKEND_URL = 'ag-studio-production.up.railway.app';

const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = {
      name: form.name.value,
      email: form.email.value,
      service: form.service.value,
      budget: form.budget.value,
      message: form.message.value,
    };

    try {
      const res = await fetch(`ag-studio-production.up.railway.app/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        formMsg.textContent = "Message sent! I'll get back to you within 24 hours.";
        formMsg.style.color = '#34d399';
        form.reset();
      } else {
        formMsg.textContent = 'Something went wrong. Please try again.';
        formMsg.style.color = '#f87171';
      }
    } catch (err) {
      formMsg.textContent = 'Could not connect. Please try again.';
      formMsg.style.color = '#f87171';
    }

    btn.textContent = 'Send Message →';
    btn.disabled = false;
  });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#e8e8f0' : '';
  });
});
