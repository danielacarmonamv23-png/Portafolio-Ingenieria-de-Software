const form=document.getElementById("contactForm"),
status=document.getElementById("formStatus"),
fields=[document.getElementById("nombre"),
document.getElementById("email"),document.getElementById("asunto"),
document.getElementById("mensaje")];
function validateField(f){const ok=f.checkValidity();
f.classList.toggle("invalid",!ok);
return ok}fields.forEach(f=>f.addEventListener("input",()=>validateField(f)));
form.addEventListener("submit",e=>{e.preventDefault();
const ok=fields.every(validateField);
if(!ok){status.textContent="Revisa los campos marcados antes de enviar.";
status.className="form-status error";
return}status.textContent="Mensaje validado correctamente. Formulario enviado de forma simulada.";
status.className="form-status success";
form.reset();
fields.forEach(f=>f.classList.remove("invalid"))});
