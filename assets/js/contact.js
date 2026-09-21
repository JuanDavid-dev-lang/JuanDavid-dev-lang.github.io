/* ==========================================================================
   JuanDavid.dev — Contact Form Validation & Submission
   ========================================================================== */

const contactManager = (() => {
  function init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name-input');
    const emailInput = document.getElementById('contact-email-input');
    const messageInput = document.getElementById('contact-message-input');
    const successDiv = document.getElementById('contact-success-container');

    // Input validations on blur
    nameInput.addEventListener('blur', () => validateField(nameInput, val => val.trim().length > 0, 'contact_error_name'));
    emailInput.addEventListener('blur', () => validateField(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'contact_error_email'));
    messageInput.addEventListener('blur', () => validateField(messageInput, val => val.trim().length >= 10, 'contact_error_message'));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, val => val.trim().length > 0, 'contact_error_name');
      const isEmailValid = validateField(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'contact_error_email');
      const isMsgValid = validateField(messageInput, val => val.trim().length >= 10, 'contact_error_message');

      if (!isNameValid || !isEmailValid || !isMsgValid) return;

      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim()
      };

      // Static GitHub Pages has no backend: without a Formspree endpoint
      // configured in SITE_CONFIG we hand the message to the mail client.
      const formspreeEndpoint = SITE_CONFIG.contact && SITE_CONFIG.contact.formspreeEndpoint;
      if (!formspreeEndpoint) {
        openMailClient(payload);
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      try {
        const res = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          form.style.display = 'none';
          successDiv.classList.add('visible');
          successDiv.style.opacity = '0';
          setTimeout(() => {
            successDiv.style.transition = 'opacity 0.5s ease';
            successDiv.style.opacity = '1';
          }, 50);
        } else {
          throw new Error('Error al enviar el formulario.');
        }
      } catch (err) {
        console.error('Submission failed', err);
        alert(i18nManager.t('contact_error_general') || 'Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  function openMailClient({ name, email, message }) {
    const subject = encodeURIComponent(`Contacto desde el portafolio: ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
    window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
  }

  function validateField(input, checkFn, errorKey) {
    const value = input.value;
    const group = input.closest('.form-group');
    const isValid = checkFn(value);
    
    if (isValid) {
      group.classList.remove('error');
    } else {
      group.classList.add('error');
      const errorSpan = group.querySelector('.form-error');
      if (errorSpan) {
        errorSpan.textContent = i18nManager.t(errorKey);
      }
    }
    return isValid;
  }

  return { init };
})();
