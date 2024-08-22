document.getElementById('show-gallery1').addEventListener('click', function() {
  document.getElementById('gallery1').classList.remove('d-none');
  document.getElementById('gallery2').classList.add('d-none');
});

document.getElementById('show-gallery2').addEventListener('click', function() {
  document.getElementById('gallery1').classList.add('d-none');
  document.getElementById('gallery2').classList.remove('d-none');
});