const revealElements=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");
observer.unobserve(entry.target)}}),{threshold:.12});
revealElements.forEach(e=>observer.observe(e));
