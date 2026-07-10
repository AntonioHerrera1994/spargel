const form = document.getElementById("contact-form");

if (form) {
  const submitBtn = form.querySelector(".contact-form__submit");
  const statusEl = form.querySelector(".contact-form__status");

  const fields = {
    name: form.querySelector("#cf-name"),
    company: form.querySelector("#cf-company"),
    email: form.querySelector("#cf-email"),
    message: form.querySelector("#cf-message"),
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(field, message) {
    const wrapper = field.closest(".contact-form__field");
    const errorEl = wrapper.querySelector(".contact-form__error");
    if (message) {
      wrapper.classList.add("has-error");
      errorEl.textContent = message;
    } else {
      wrapper.classList.remove("has-error");
      errorEl.textContent = "";
    }
  }

  function validate() {
    let isValid = true;

    if (!fields.name.value.trim()) {
      setError(fields.name, "Por favor ingresa tu nombre.");
      isValid = false;
    } else {
      setError(fields.name, "");
    }

    // Empresa es opcional, no se valida.
    setError(fields.company, "");

    if (!fields.email.value.trim()) {
      setError(fields.email, "Por favor ingresa tu correo electrónico.");
      isValid = false;
    } else if (!EMAIL_REGEX.test(fields.email.value.trim())) {
      setError(fields.email, "Ingresa un correo electrónico válido.");
      isValid = false;
    } else {
      setError(fields.email, "");
    }

    if (!fields.message.value.trim()) {
      setError(fields.message, "Cuéntanos en qué podemos ayudarte.");
      isValid = false;
    } else {
      setError(fields.message, "");
    }

    return isValid;
  }

  // Limpia el error de un campo en cuanto el usuario empieza a corregirlo.
  Object.values(fields).forEach((field) => {
    field.addEventListener("input", () => {
      if (field.closest(".contact-form__field").classList.contains("has-error")) {
        setError(field, "");
      }
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    statusEl.textContent = "";
    statusEl.classList.remove("is-success", "is-error");

    if (!validate()) {
      statusEl.textContent = "Revisa los campos marcados en rojo.";
      statusEl.classList.add("is-error");
      return;
    }

    const payload = {
      name: fields.name.value.trim(),
      company: fields.company.value.trim(),
      email: fields.email.value.trim(),
      message: fields.message.value.trim(),
    };

    submitBtn.disabled = true;
    submitBtn.querySelector(".contact-form__submit-label").textContent =
      "Enviando...";

    try {
      // TODO: reemplazar por el endpoint real cuando exista el backend.
      // const response = await fetch("/api/contacto", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      // if (!response.ok) throw new Error("request-failed");

      // Simulación temporal mientras no hay backend conectado.
      await new Promise((resolve) => setTimeout(resolve, 900));

      statusEl.textContent =
        "¡Mensaje enviado! Te contactaremos muy pronto.";
      statusEl.classList.add("is-success");
      form.reset();
    } catch (error) {
      statusEl.textContent =
        "Ocurrió un error al enviar tu mensaje. Intenta de nuevo.";
      statusEl.classList.add("is-error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector(".contact-form__submit-label").textContent =
        "Enviar Mensaje";
    }
  });
}