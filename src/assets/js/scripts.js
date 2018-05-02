window.onscroll = function() {
  var scrollTop = document.documentElement.scrollTop;
  if(scrollTop > 10){
    document.querySelector('.header').classList.add('shadow');
  }else{
    document.querySelector('.header').classList.remove('shadow');
  }
}