// Mid-Florida Wildlife Services — shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Close mobile nav when a nav link is clicked
  var navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      document.body.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Mark current page link as active
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('is-active');
    }
  });

  // Only allow one accordion item open at a time within the same group
  var accordionGroups = document.querySelectorAll('[data-accordion-group]');
  accordionGroups.forEach(function (group) {
    var items = group.querySelectorAll('details.accordion-item');
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) {
          items.forEach(function (other) {
            if (other !== item) other.removeAttribute('open');
          });
        }
      });
    });
  });

  // ---------- Animal info modal ----------
  var animalData = {
    rats: {
      tag: 'Rodents',
      title: 'Rat & Mouse Removal',
      image: 'images/rat-photo.png',
      alt: 'Rat chewing through electrical wiring in an attic',
      intro: 'Rats in a home pose serious health risks from diseases like hantavirus and salmonellosis, transmitted through droppings and urine. Rats can cause structural damage by chewing wires, leading to potential fires, and by damaging insulation and walls. They also contaminate food and water sources with feces, saliva, and hair, and their presence can trigger or worsen allergies and asthma. Additionally, rats can introduce other pests like ticks and fleas into your home, and invite other animals like raccoons or snakes.',
      risks: [
        'Chewed wiring that can spark electrical fires',
        'Damaged insulation and walls',
        'Contaminated food and water sources',
        'Triggered or worsened allergies and asthma',
        'An open door for ticks, fleas, and other pests — and even bigger animals like raccoons or snakes'
      ],
      outro: 'Mid-Florida Wildlife can remove the rodents, sanitize the areas, and use our proven exclusion methods to keep them out.'
    },
    bats: {
      tag: 'Protected species',
      title: 'Bat Removal & Exclusion',
      image: 'images/bat-photo.png',
      alt: 'Colony of bats roosting in an attic',
      intro: 'Did you know many bat species actually cuddle for warmth and social bonding? While a "cuddle ball" sounds cute in nature, it\'s a major health risk in your attic. Because bats are social, seeing just one usually means a colony is already moving in. Protect your home and your health — bats are vital to Florida\'s ecosystem, but they are unsanitary houseguests.',
      risks: [
        'Droppings (guano) can cause serious respiratory illnesses',
        'Bats are known carriers of rabies',
        "Don't wait for the colony to grow — what starts as one bat rarely stays that way"
      ],
      lawNote: "<strong>State-Protected:</strong> Bats are protected in Florida by both State and Federal laws. In Florida, bats must be handled according to strict wildlife laws — removal and clean-up should be done by a licensed professional. Only licensed Wildlife Specialists can safely and legally perform an exclusion.",
      outro: "Free Inspection: we'll identify entry points and provide a safe, legal solution before the colony grows any further."
    },
    squirrels: {
      tag: 'Rodents',
      title: 'Squirrel Removal',
      image: 'images/squirrel-photo.png',
      alt: 'Squirrels chewing through a roof vent',
      intro: 'Squirrels will chew your roof vents to get into your home. Squirrels in Florida can cause significant damage by chewing electrical wires, creating fire hazards and electrical malfunctions; shredding insulation, reducing energy efficiency; and damaging the home\'s structure by tearing through wood, soffits, and shingles.',
      risks: [
        'Chewed electrical wires — fire hazards and electrical malfunctions',
        "Shredded insulation, reducing your home's energy efficiency",
        'Damage to wood, soffits, and shingles'
      ],
      outro: "It's best to contact Mid-Florida Wildlife for safe and effective removal and to prevent future infestations."
    },
    opossums: {
      tag: 'Nuisance wildlife',
      title: 'Opossum Removal',
      image: 'images/opossum-photo.png',
      alt: 'Opossum nesting in attic insulation',
      intro: 'Opossums are beneficial for the ecosystem, acting as natural pest controllers, but can become a nuisance if they access garbage, pet food, or find shelter in attics and crawl spaces.',
      risks: [
        'Disease risk from flea- and tick-borne illnesses',
        'Unsanitary conditions from feces and urine',
        'Property damage from chewing and scratching',
        'Potential attraction of other pests',
        'Unpleasant odors associated with their droppings'
      ],
      outro: 'We remove them humanely and close off the access points for good.'
    },
    raccoons: {
      tag: 'Nuisance wildlife',
      title: 'Raccoon Removal',
      image: 'images/raccoon-photo.png',
      alt: 'Raccoon and baby on a deck',
      intro: "Don't let these masked bandits fool you — raccoons in the attic are dangerous due to the health risks of diseases like rabies and raccoon roundworm, and the potential for significant structural and electrical damage they cause.",
      risks: [
        'Disease risk, including rabies and raccoon roundworm',
        'Fire hazards from gnawed wires',
        'Mold from roof damage',
        'Health issues from exposure to urine and feces'
      ],
      outro: 'Contact a Mid-Florida professional wildlife control specialist for safe removal — especially if you suspect babies are involved.'
    }
  };

  var overlay = document.getElementById('animal-modal-overlay');
  if (overlay) {
    var modalCard = overlay.querySelector('.modal-card');
    var lastFocused = null;

    function buildModalContent(data) {
      var risksHtml = data.risks.map(function (r) { return '<li>' + r + '</li>'; }).join('');
      var lawNoteHtml = data.lawNote ? '<div class="law-note">' + data.lawNote + '</div>' : '';
      modalCard.innerHTML =
        '<button type="button" class="modal-close" aria-label="Close">&times;</button>' +
        '<div class="img-slot"><img src="' + data.image + '" alt="' + data.alt + '"></div>' +
        '<div class="modal-body">' +
          '<span class="tag">' + data.tag + '</span>' +
          '<h2>' + data.title + '</h2>' +
          '<p>' + data.intro + '</p>' +
          '<ul class="risk-list">' + risksHtml + '</ul>' +
          lawNoteHtml +
          '<p>' + data.outro + '</p>' +
          '<div class="modal-footer-cta">' +
            '<a href="tel:3524349110" class="btn btn-primary">Call Now: 352-434-9110</a>' +
            '<a href="contact.html" class="btn btn-secondary">Request Free Inspection</a>' +
          '</div>' +
        '</div>';
      modalCard.querySelector('.modal-close').addEventListener('click', closeModal);
    }

    function openModal(animalKey) {
      var data = animalData[animalKey];
      if (!data) return;
      buildModalContent(data);
      lastFocused = document.activeElement;
      overlay.classList.add('is-open');
      document.body.classList.add('modal-open');
      overlay.setAttribute('aria-hidden', 'false');
      modalCard.querySelector('.modal-close').focus();
    }

    function closeModal() {
      overlay.classList.remove('is-open');
      document.body.classList.remove('modal-open');
      overlay.setAttribute('aria-hidden', 'true');
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll('[data-animal-modal]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(trigger.getAttribute('data-animal-modal'));
      });
      // Support Enter/Space activation for non-button elements (e.g. the
      // clickable service-detail cards on services.html use role="button").
      if (trigger.tagName !== 'BUTTON' && trigger.tagName !== 'A') {
        trigger.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(trigger.getAttribute('data-animal-modal'));
          }
        });
      }
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
    });
  }
});
