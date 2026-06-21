

/* галереи */
const TOUR_GALLERIES = {
  hiking: {
    title: 'Пешие туры',
    images: [
      'images/tour-hiking.jpg',
      'images/gallery-hiking-1.jpg',
      'images/gallery-hiking-2.jpg',
      'images/gallery-hiking-3.jpg',
      'images/gallery-hiking-4.jpg',
    ]
  },
  water: {
    title: 'Водные прогулки',
    images: [
      'images/tour-water.jpg',
      'images/gallery-water-1.jpg',
      'images/gallery-water-2.jpg',
      'images/gallery-water-3.jpg',
      'images/gallery-water-4.jpg',
    ]
  },
  cycling: {
    title: 'Велопрогулки',
    images: [
      'images/tour-cycling.jpg',
      'images/gallery-cycling-1.jpg',
      'images/gallery-cycling-2.jpg',
      'images/gallery-cycling-3.jpg',
      'images/gallery-cycling-4.jpg',
    ]
  },
  camping: {
    title: 'Палаточный лагерь',
    images: [
      'images/tour-camping.jpg',
      'images/gallery-camping-1.jpg',
      'images/gallery-camping-2.jpg',
      'images/gallery-camping-3.jpg',
      'images/gallery-camping-4.jpg',
    ]
  },
  extreme: {
    title: 'Экстремальный отдых',
    images: [
      'images/tour-extreme.jpg',
      'images/gallery-extreme-1.jpg',
      'images/gallery-extreme-2.jpg',
      'images/gallery-extreme-3.jpg',
      'images/gallery-extreme-4.jpg',
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {

  /*экран загрузки*/
  const loader    = document.getElementById('loader');
  const loaderTxt = loader?.querySelector('.loader__text');

  /* «...» */
  let dotCount = 1;
  const dotTimer = loaderTxt ? setInterval(() => {
    dotCount = (dotCount % 3) + 1;
    loaderTxt.textContent = 'Загрузка' + '.'.repeat(dotCount);
  }, 500) : null;

  /* скрываем через 3.5 сек */
  setTimeout(() => {
    clearInterval(dotTimer);
    loader?.classList.add('is-hidden');
    loader?.addEventListener('transitionend', () => loader.remove(), { once: true });
  }, 3500);


  /* уведомление об ошибке */
  const toastEl = document.getElementById('toast');
  let toastTimer;

  function showToast(msg, type = 'error') {
    if (!toastEl) return;
    clearTimeout(toastTimer);
    toastEl.textContent = msg;
    toastEl.className = `toast toast--${type} toast--show`;
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('toast--show');
    }, 4000);
  }


  /* окно успеха */
  const successPopup      = document.getElementById('successPopup');
  const successPopupClose = document.getElementById('successPopupClose');

  function showSuccessPopup() {
    if (!successPopup) return;
    successPopup.classList.add('is-open');
    successPopup.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    successPopupClose?.focus();
  }

  function closeSuccessPopup() {
    successPopup?.classList.remove('is-open');
    successPopup?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  successPopupClose?.addEventListener('click', closeSuccessPopup);

  /* чтобы при клике на тёмный фон тоже закрывает */
  successPopup?.addEventListener('click', (e) => {
    if (e.target === successPopup) closeSuccessPopup();
  });


  /* автопрокрутка каждые 4.5 сек */
  const slides  = document.querySelectorAll('.slide');
  const dots    = document.querySelectorAll('#sliderDots .slider__dot');
  let current   = 0;
  let autoTimer;

  function goToSlide(idx) {
    /* убираем активный класс у текущего */
    slides[current].classList.remove('slide--active');
    dots[current].classList.remove('slider__dot--active');
    dots[current].removeAttribute('aria-selected');

    /* переходим к новому */
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('slide--active');
    dots[current].classList.add('slider__dot--active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(current + 1), 4500);
  }

  document.getElementById('sliderNext')?.addEventListener('click', () => {
    goToSlide(current + 1); resetTimer();
  });
  document.getElementById('sliderPrev')?.addEventListener('click', () => {
    goToSlide(current - 1); resetTimer();
  });
  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    goToSlide(i); resetTimer();
  }));

  resetTimer(); /* запускаем автопрокрутку */

  /* свайп пальцем по главному слайдеру */
  const sliderEl = document.getElementById('slider');
  let sliderTouchStartX = 0;
  sliderEl?.addEventListener('touchstart', e => {
    sliderTouchStartX = e.touches[0].clientX;
  }, { passive: true });
  sliderEl?.addEventListener('touchend', e => {
    const diff = sliderTouchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      goToSlide(diff > 0 ? current + 1 : current - 1);
      resetTimer();
    }
  });


  /* ── Анимация слогана «ДЛЯ ТЕХ,» → «КТО УСТАЛ» → … */
  const PHRASES = ['ДЛЯ ТЕХ,', 'КТО УСТАЛ', 'ОТ ОБЫЧНОГО ОТДЫХА'];
  const tagEl   = document.getElementById('taglineText');
  let pIdx      = 0;

  if (tagEl) {
    tagEl.style.transition = 'opacity .3s ease';
    setInterval(() => {
      tagEl.style.opacity = '0';
      setTimeout(() => {
        pIdx = (pIdx + 1) % PHRASES.length;
        tagEl.textContent = PHRASES[pIdx];
        tagEl.style.opacity = '1';
      }, 320);
    }, 2400);
  }


  /* мобильное меню (бургер)*/
  const burger      = document.getElementById('burger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const overlay     = document.getElementById('menuOverlay');

  function openMenu() {
    mobileMenu?.classList.add('is-open');
    overlay?.classList.add('is-visible');
    mobileMenu?.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu?.classList.remove('is-open');
    overlay?.classList.remove('is-visible');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', openMenu);
  mobileClose?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-menu__link').forEach(l => l.addEventListener('click', closeMenu));


  /* типы туров */
  const modal      = document.getElementById('tourModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalTrack = document.getElementById('modalTrack');
  const modalDots  = document.getElementById('modalDots');
  const modalPrev  = document.getElementById('modalPrev');
  const modalNext  = document.getElementById('modalNext');
  const modalClose = document.getElementById('modalClose');
  const modalBack  = document.getElementById('modalBackdrop');

  let mCurrent = 0;
  let mTotal   = 0;

  function buildModalSlider(tourKey) {
    const data = TOUR_GALLERIES[tourKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalTrack.innerHTML   = '';
    modalDots.innerHTML    = '';
    mCurrent = 0;

    /* проверка на ошибку */
    const validImages = [];

    data.images.forEach(src => {
      const img = new Image();
      img.src = src;
      /* onerror — файл не найден, пропускаем */
      img.onload = () => {
        /* добавляем в слайдер только загруженные */
      };
      /* Добавляем все сразу — браузер сам обработает 404 */
      validImages.push(src);
    });

    mTotal = validImages.length;

    validImages.forEach((src, i) => {
      /* картинка */
      const img = document.createElement('img');
      img.src     = src;
      img.alt     = `${data.title} — фото ${i + 1}`;
      img.loading = i === 0 ? 'eager' : 'lazy';
      modalTrack.appendChild(img);

      /* точка-индикатор */
      const dot = document.createElement('button');
      dot.className = 'modal__dot' + (i === 0 ? ' modal__dot--active' : '');
      dot.setAttribute('aria-label', `Фото ${i + 1}`);
      dot.addEventListener('click', () => goModal(i));
      modalDots.appendChild(dot);
    });

    goModal(0);
  }

  function goModal(idx) {
    mCurrent = (idx + mTotal) % mTotal;
    modalTrack.style.transform = `translateX(-${mCurrent * 100}%)`;
    modalDots.querySelectorAll('.modal__dot').forEach((d, i) => {
      d.classList.toggle('modal__dot--active', i === mCurrent);
    });
  }

  function openModal(tourKey) {
    buildModalSlider(tourKey);
    modal?.classList.add('is-open');
    modal?.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    modalClose?.focus();
  }

  function closeModal() {
    modal?.classList.remove('is-open');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* клик на карточку тура */
  document.querySelectorAll('.tour-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.tour));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.tour);
      }
    });
  });

  modalClose?.addEventListener('click', closeModal);
  modalBack?.addEventListener('click',  closeModal);
  modalPrev?.addEventListener('click',  () => goModal(mCurrent - 1));
  modalNext?.addEventListener('click',  () => goModal(mCurrent + 1));

  /* клавиатура в модале */
  modal?.addEventListener('keydown', e => {
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft')  goModal(mCurrent - 1);
    if (e.key === 'ArrowRight') goModal(mCurrent + 1);
  });

  /* свайпы на телефоне */
  let touchStartX = 0;
  modalTrack?.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  modalTrack?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goModal(diff > 0 ? mCurrent + 1 : mCurrent - 1);
  });


  /* смена фото на карту по клику*/
  document.querySelectorAll('.region-card').forEach(card => {
    const img      = card.querySelector('.region-card__img');
    if (!img) return;

    const photoSrc = img.src;
    const mapSrc   = img.dataset.map;

    card.addEventListener('click', () => {
      const showingMap = card.classList.contains('is-map');

      /* fade out */
      img.style.opacity    = '0';
      img.style.transition = 'opacity .25s ease';

      setTimeout(() => {
        /* меняем источник */
        img.src = showingMap ? photoSrc : (mapSrc || photoSrc);
        card.classList.toggle('is-map', !showingMap);

        /* fade in */
        img.style.opacity = '1';
      }, 260);
    });
  });


  /* аккордеон */
  document.querySelectorAll('.faq__item').forEach(item => {
    const btn    = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        btn.setAttribute('aria-expanded', 'false');
        answer.setAttribute('hidden', '');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.removeAttribute('hidden');
      }
    });
  });


  /* подбор тура */
  document.getElementById('tourForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const form      = e.target;
    const priceFrom = +form.priceFrom.value;
    const priceTo   = +form.priceTo.value;
    const region    = form.region.value;
    const dateFrom  = form.dateFrom.value;
    const dateTo    = form.dateTo.value;

    if (!region) {
      showToast('!Укажите регион путешествия');
      form.region.focus(); return;
    }
    if (!dateFrom || !dateTo) {
      showToast('!Укажите даты поездки (от и до)');
      return;
    }
    if (new Date(dateFrom) >= new Date(dateTo)) {
      showToast('!Дата начала должна быть раньше даты окончания');
      return;
    }
    if (priceFrom && priceTo && priceFrom > priceTo) {
      showToast('!Минимальная цена не может быть больше максимальной');
      return;
    }

    /* победа */
    showSuccessPopup();
    form.reset();
  });


  /* форма анкеты и валидация*/
  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const form    = e.target;
    const name    = form.name.value.trim();
    const phone   = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name) {
      showToast('!Пожалуйста, введите ваше имя');
      form.name.focus(); return;
    }
    if (name.length < 2) {
      showToast('!Имя должно содержать минимум 2 буквы');
      form.name.focus(); return;
    }
    if (!phone) {
      showToast('!Введите номер телефона');
      form.phone.focus(); return;
    }
    const digits = phone.replace(/\D/g, '');
    const validStart = /^(\+7|7|8)/.test(phone.trim());
    if (!validStart || digits.length !== 11) {
      showToast('!Введите номер из 11 цифр, начиная с +7, 7 или 8');
      form.phone.focus(); return;
    }
    if (!message) {
      showToast('!Напишите ваш вопрос или сообщение');
      form.message.focus(); return;
    }
    showSuccessPopup();
    form.reset();
  });


  /* ссылки внутри */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

}); 
