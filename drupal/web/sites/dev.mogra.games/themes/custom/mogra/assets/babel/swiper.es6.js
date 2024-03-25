// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination, FreeMode } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const wrapCharSpan = function(str) {
  return [...str].map(char => `<span>${char}</span>`).join('');
}

const pickup = document.querySelector('#block-views-block-pickup-block');
const pickup_h2 = pickup.querySelector('h2');
pickup_h2.innerHTML = wrapCharSpan(pickup_h2.textContent);

const slidePosition = {
  110: [
    [-335,-345],
    [-680,-690],
    [-1025,-1035],
  ],
  160: [
    [-512,-522],
    [-1034,-1044],
    [-1556,-1566],
  ],
};

const isSlidePosition = (height, translate) => {
  let pos = slidePosition[height];
  for (let i = 0; i < pos.length; i++) {
    if (translate <= pos[i][0] && translate >= pos[i][1]) {
      return true;
    }
  }
  return false;
}

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, FreeMode]);

const swiper = new Swiper('.swiper', {
  slidesPerView: 'auto',
  spaceBetween: 10,
  PreventClicks: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  freeMode: {
    enabled: true,
    momentum: true,
  },
  on: {
    init: function (swiper) {
      if (swiper.slides.length == 1) {
        pickup.querySelector('.view-pickup').style.marginBottom = '0';
      }
      pickup.classList.add('initialized');
    },
    setTranslate: function (swiper) {
      if (swiper.isBeginning || isSlidePosition(swiper.height, swiper.translate)) {
        swiper.el.classList.remove('is-end');
        swiper.el.classList.add('is-beginning');
      } else if (swiper.isEnd) {
        swiper.el.classList.remove('is-beginning');
        swiper.el.classList.add('is-end');
      } else {
        swiper.el.classList.remove('is-beginning', 'is-end');
      }
    },
    transitionEnd: function (swiper) {
      // blazyのlazyload発火
      Drupal.blazy.init.revalidate();
    },
  },
});
