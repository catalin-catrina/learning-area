const menu = document.querySelector('.menu');

menu.addEventListener('shown.bs.collapse', () => {
  menu.classList.add('show');
});

menu.addEventListener('hidden.bs.collapse', () => {
    menu.classList.remove('show');
  });
  