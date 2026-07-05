$(function () {

  /* ---------- Smooth scroll for nav + CTA links ---------- */
  $('.nav-links a, .nav-cta').on('click', function (e) {
    const id = $(this).attr('href');
    if (id && id.startsWith('#')) {
      e.preventDefault();
      const $target = $(id);
      if ($target.length) {
        $('html, body').animate({ scrollTop: $target.offset().top }, 500);
      }
      closeMenu();
    }
  });

  /* ---------- Mobile hamburger menu ---------- */
  const $menuToggle = $('#menuToggle');
  const $navLinks = $('.nav-links');

  function closeMenu() {
    $navLinks.removeClass('mobile-open');
    $menuToggle.attr('aria-expanded', 'false').text('☰');
  }

  $menuToggle.on('click', function () {
    const isOpen = $navLinks.toggleClass('mobile-open').hasClass('mobile-open');
    $menuToggle.attr('aria-expanded', isOpen ? 'true' : 'false').text(isOpen ? '✕' : '☰');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.nav').length && $navLinks.hasClass('mobile-open')) {
      closeMenu();
    }
  });

  /* ---------- Scroll reveal ---------- */
  const $revealEls = $('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $(entry.target).addClass('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $revealEls.each(function () { io.observe(this); });
  } else {
    $revealEls.addClass('in');
  }

  /* ---------- Contact details: click-to-act ---------- */
  $('.info-row[data-action]').on('click', function () {
    const action = $(this).data('action');
    const value = $(this).data('value');
    const $row = $(this);

    if (action === 'email') {
      copyToClipboard(value, $row);
      window.location.href = 'mailto:' + value;
    } else if (action === 'call') {
      copyToClipboard(value, $row);
      window.location.href = 'tel:' + value.replace(/\s+/g, '');
    } else if (action === 'map') {
      window.open('https://maps.google.com/?q=' + encodeURIComponent(value), '_blank');
    }
  });

  function copyToClipboard(text, $row) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast($row));
    } else {
      showToast($row);
    }
  }

  function showToast($row) {
    const $toast = $row.find('.copied-toast');
    $toast.addClass('show');
    setTimeout(() => $toast.removeClass('show'), 1400);
  }

  /* ---------- Resume buttons ---------- */
  // Update RESUME_PATH below to point at your actual resume file
  const RESUME_PATH = 'assets/resume.pdf';

  $('#viewResumeBtn').on('click', function () {
    window.open(RESUME_PATH, '_blank');
  });

  $('#downloadResumeBtn').on('click', function () {
    const $link = $('<a>', {
      href: RESUME_PATH,
      download: 'Swapnil-Raut-Resume.pdf'
    }).appendTo('body');
    $link[0].click();
    $link.remove();
  });

});
