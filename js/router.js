/* ============================================================
   FILE: js/router.js
   PURPOSE: Controls which "page" is visible on screen.
            Since this is a single HTML file, we simulate
            page navigation by showing/hiding sections.
            Also contains all the HTML rendering functions
            that build page content from config.js data.
   ============================================================ */


/* ------------------------------------------------------------
   PAGE NAVIGATION
   Shows one page and hides all others.
   Also scrolls back to the top smoothly.

   @param {string} pageId - the id of the page to show
                            e.g. 'home', 'tours', 'kl', 'hatyai'
------------------------------------------------------------ */
function showPage(pageId) {
  /* Hide ALL pages first */
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });

  /* Show the requested page */
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
  }

  /* Scroll to top of page smoothly */
  window.scrollTo({ top: 0, behavior: 'smooth' });

  /* Update nav link highlight */
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(a) {
    a.classList.remove('active');
  });
  if (pageId === 'home')  document.getElementById('nav-home')?.classList.add('active');
  if (pageId === 'tours') document.getElementById('nav-tours')?.classList.add('active');

  /* Close mobile menu if open */
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) mobileMenu.classList.remove('open');
}


/* ------------------------------------------------------------
   SCROLL TO SECTION
   Goes to the home page first, then scrolls to
   a specific section by its HTML id.

   @param {string} sectionId - the id of the section to scroll to
------------------------------------------------------------ */
function scrollToSection(sectionId) {
  showPage('home');
  /* Small delay to let the page show before scrolling */
  setTimeout(function() {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 120);
}


/* ------------------------------------------------------------
   TOGGLE MOBILE MENU
   Opens or closes the hamburger menu on small screens.
------------------------------------------------------------ */
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}


/* ------------------------------------------------------------
   SWITCH SEARCH TAB
   Changes the From/To dropdown options in the search
   widget depending on which tab (airport/interstate/tour)
   the user clicks.

   @param {HTMLElement} btn  - the tab button that was clicked
   @param {string}      type - 'airport', 'interstate', or 'tour'
------------------------------------------------------------ */
function switchTab(btn, type) {
  /* Remove active state from all tabs */
  document.querySelectorAll('.search-tab').forEach(function(t) {
    t.classList.remove('active');
  });
  /* Set clicked tab as active */
  btn.classList.add('active');

  const from = document.getElementById('from-select');
  const to   = document.getElementById('to-select');

  /* Update dropdown options based on tab type */
  if (type === 'airport') {
    from.innerHTML = '<option>KLIA / KLIA2</option><option>KL City</option><option>Penang Airport</option><option>JB Airport</option>';
    to.innerHTML   = '<option>KL City</option><option>KLIA / KLIA2</option><option>Selangor</option><option>Pahang</option><option>Melaka</option>';
  } else if (type === 'interstate') {
    from.innerHTML = '<option>Kuala Lumpur</option><option>Selangor</option><option>Penang</option><option>Johor</option><option>Melaka</option>';
    to.innerHTML   = '<option>Penang</option><option>Johor Bahru</option><option>Melaka</option><option>Pahang</option><option>Perak</option><option>Kelantan</option>';
  } else {
    /* Tour tab — show tour destinations */
    from.innerHTML = '<option>KL Sentral</option>';
    to.innerHTML   = CONFIG.tourPackages.map(function(t) {
      return `<option>${t.title}</option>`;
    }).join('');
  }
}


/* ------------------------------------------------------------
   SEARCH WIDGET — QUICK BOOK
   When user clicks "Search" in the search widget,
   this opens WhatsApp with a pre-filled message
   based on their From/To/Date/Passengers selection.
------------------------------------------------------------ */
function searchBooking() {
  const from       = document.getElementById('from-select').value;
  const to         = document.getElementById('to-select').value;
  const date       = document.getElementById('travel-date').value;
  const passengers = document.getElementById('search-pax').value;

  /* Build a quick WhatsApp message */
  const msg = [
    `Hi JomShuttle! 👋 I'd like to enquire about a booking.`,
    ``,
    `From      : ${from}`,
    `To        : ${to}`,
    `Date      : ${date || 'TBD'}`,
    `Passengers: ${passengers}`,
    ``,
    `Please advise on availability and pricing. Thank you!`,
  ].join('\n');

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/${CONFIG.whatsapp.primary}?text=${encoded}`, '_blank');
}


/* ============================================================
   PAGE RENDERERS
   These functions BUILD the HTML content for each page
   dynamically from the data in config.js.
   This means you only edit config.js — not the HTML here.
   ============================================================ */


/* ------------------------------------------------------------
   RENDER — DESTINATION CARDS (Homepage)
   Builds the grid of state destination cards.
   Data comes from CONFIG.destinations in config.js.
------------------------------------------------------------ */
function renderDestinations() {
  const container = document.getElementById('dest-grid');
  if (!container) return;

  container.innerHTML = CONFIG.destinations.map(function(d) {
    /* If a destination has its own page, link to it; else link to WhatsApp */
    const clickAction = d.page
      ? `showPage('${d.page}')`
      : `window.open('https://wasap.my/${CONFIG.whatsapp.primary}/${d.waKey}','_blank')`;

    return `
      <div class="dest-card" onclick="${clickAction}">
        <div class="dest-icon">${d.icon}</div>
        <div class="dest-name">${d.name}</div>
        <div class="dest-type">${d.type}</div>
      </div>`;
  }).join('');
}


/* ------------------------------------------------------------
   RENDER — FEATURES SECTION (Homepage "Why Choose Us")
   Builds the feature cards from CONFIG.features.
------------------------------------------------------------ */
function renderFeatures() {
  const container = document.getElementById('features-grid');
  if (!container) return;

  container.innerHTML = CONFIG.features.map(function(f) {
    return `
      <div class="feature-card">
        <div class="feature-icon">${f.icon}</div>
        <div class="feature-title">${f.title}</div>
        <div class="feature-desc">${f.desc}</div>
      </div>`;
  }).join('');
}


/* ------------------------------------------------------------
   RENDER — HOW IT WORKS STEPS (Homepage)
   Builds the step numbers from CONFIG.steps.
------------------------------------------------------------ */
function renderSteps() {
  const container = document.getElementById('steps-container');
  if (!container) return;

  container.innerHTML = CONFIG.steps.map(function(s) {
    return `
      <div class="step">
        <div class="step-num">${s.num}</div>
        <div class="step-title">${s.title}</div>
        <div class="step-desc">${s.desc}</div>
      </div>`;
  }).join('');
}


/* ------------------------------------------------------------
   RENDER — TOUR CARDS
   Builds the tour package cards.
   Used on both the homepage preview and the Tours page.

   @param {string} containerId - id of the container element
   @param {number} limit       - max number of tours to show (0 = all)
------------------------------------------------------------ */
function renderTourCards(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  /* Limit how many tours to show (for homepage preview) */
  const tours = limit ? CONFIG.tourPackages.slice(0, limit) : CONFIG.tourPackages;

  container.innerHTML = tours.map(function(t) {
    return `
      <div class="tour-card" onclick="showPage('tour-${t.id}')">
        <div class="tour-img">
          <div class="tour-img-bg" style="background:linear-gradient(135deg,${t.bgFrom},${t.bgTo});"></div>
          <span class="tour-emoji">${t.emoji}</span>
          <div class="tour-badge" style="background:${t.badgeColor}">${t.badge}</div>
        </div>
        <div class="tour-body">
          <div class="tour-title">${t.title}</div>
          <div class="tour-info">
            <span class="tour-tag">📅 ${t.duration}</span>
            <span class="tour-tag">👥 ${t.groupType}</span>
            ${t.extras.map(function(e){ return `<span class="tour-tag">${e}</span>`; }).join('')}
          </div>
          <p style="font-size:.87rem;color:var(--muted);margin-bottom:14px;line-height:1.6;">${t.desc}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <div>
              <div class="tour-price">${t.price} <span>/pax</span></div>
              <div style="font-size:.75rem;color:var(--muted);">${t.priceLabel}</div>
            </div>
            <a class="btn btn-green btn-sm"
               href="https://wasap.my/${CONFIG.whatsapp.primary}/${t.waKey}"
               target="_blank"
               onclick="event.stopPropagation()">📲 Book Now</a>
          </div>
        </div>
      </div>`;
  }).join('');
}


/* ------------------------------------------------------------
   RENDER — AIRPORT ROUTES (KL Page)
   Builds the booking cards for KL airport routes.
   Data comes from CONFIG.airportRoutes in config.js.
------------------------------------------------------------ */
function renderAirportRoutes() {
  const container = document.getElementById('airport-routes');
  if (!container) return;

  container.innerHTML = CONFIG.airportRoutes.map(function(r) {
    return `
      <div class="booking-card">
        <div class="booking-card-header">
          <div class="booking-card-title">🚐 ${r.title}</div>
          <div class="booking-price-big">${r.price}</div>
        </div>
        <div class="capacity-tags">
          ${r.capacity.map(function(c){ return `<div class="cap-tag">${c}</div>`; }).join('')}
        </div>
        <a class="btn btn-green"
           href="https://wasap.my/${CONFIG.whatsapp.primary}/${r.waKey}"
           target="_blank"
           style="width:100%;justify-content:center;">
          📲 Book ${r.title.split('—')[0].trim()} — ${r.price}
        </a>
      </div>`;
  }).join('');
}


/* ------------------------------------------------------------
   RENDER — TOUR DETAIL PAGES
   Dynamically creates a full detail page for EACH tour
   in CONFIG.tourPackages. The page id is "tour-{id}".

   This means when you add a new tour to config.js,
   its detail page is created automatically — no extra HTML needed!
------------------------------------------------------------ */
function renderTourDetailPages() {
  const wrapper = document.getElementById('tour-pages-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = CONFIG.tourPackages.map(function(t) {
    /* Build the itinerary HTML for this tour */
    const itineraryHTML = t.itinerary.map(function(day) {
      const itemsHTML = day.items.map(function(item) {
        return `<div class="itin-item">${item}</div>`;
      }).join('');
      return `
        <div class="itin-day">
          <div class="itin-day-title">${day.day}</div>
          <div class="itin-items">${itemsHTML}</div>
        </div>`;
    }).join('');

    /* Build the includes badges */
    const includesHTML = t.includes.map(function(inc) {
      return `<div class="cap-tag">${inc}</div>`;
    }).join('');

    /* Return the full page HTML for this tour */
    return `
      <!-- ====== TOUR DETAIL PAGE: ${t.title} ====== -->
      <div class="page" id="page-tour-${t.id}">

        <!-- Page header banner -->
        <div class="page-header">
          <div class="page-header-inner">
            <button class="back-btn" onclick="showPage('tours')">← Back to Tours</button>
            <h1>${t.emoji} ${t.title}</h1>
            <div class="sub">${t.duration} · ${t.groupType} · ${t.price}</div>
          </div>
        </div>

        <section>
          <div class="container" style="max-width:800px;">

            <!-- Price + includes card -->
            <div class="booking-card">
              <div class="booking-card-header">
                <div>
                  <div class="booking-card-title">${t.emoji} ${t.title}</div>
                  <div style="color:var(--muted);font-size:.88rem;margin-top:4px;">${t.groupType} · ${t.duration}</div>
                </div>
                <div>
                  <div class="booking-price-big">${t.price}<span>/pax</span></div>
                  <div style="font-size:.75rem;color:var(--muted);">${t.priceLabel}</div>
                </div>
              </div>
              <div class="capacity-tags">${includesHTML}</div>
              <a class="btn btn-green"
                 href="https://wasap.my/${CONFIG.whatsapp.primary}/${t.waKey}"
                 target="_blank"
                 style="width:100%;justify-content:center;font-size:1.05rem;padding:16px;">
                📲 Quick Book on WhatsApp
              </a>
            </div>

            <!-- Detailed itinerary card -->
            <div class="booking-card">
              <div class="booking-card-title" style="margin-bottom:20px;">📅 Full Itinerary</div>
              ${itineraryHTML}
              <div style="background:#e8f0ff;border-radius:10px;padding:16px;margin-top:14px;font-size:.88rem;color:var(--blue);">
                <strong>ℹ️ Info:</strong> ${t.notes}
              </div>
            </div>

            <!-- Full booking form -->
            <div class="booking-card">
              <div class="booking-card-title" style="margin-bottom:6px;">📋 Book This Package</div>
              <p style="color:var(--muted);font-size:.88rem;margin-bottom:20px;">
                Fill in your details below. We'll open WhatsApp with your info pre-filled
                AND send an email alert to our team at the same time.
              </p>
              ${buildBookingFormHTML(t.title, t.waKey)}
            </div>

            <!-- Direct WhatsApp button at bottom -->
            <div style="text-align:center;margin-top:8px;">
              <a class="btn btn-green"
                 href="https://wasap.my/${CONFIG.whatsapp.primary}/${t.waKey}"
                 target="_blank"
                 style="font-size:1.05rem;padding:16px 36px;">
                📲 Book ${t.title} on WhatsApp
              </a>
            </div>

          </div>
        </section>
      </div>
      <!-- ====== END TOUR: ${t.title} ====== -->`;
  }).join('');
}


/* ------------------------------------------------------------
   BUILD BOOKING FORM HTML
   Returns the HTML string for the full booking form.
   This form is embedded inside each tour detail page
   AND on the KL routes page.

   @param {string} context - label for this booking (tour/route name)
   @param {string} waKey   - WhatsApp URL key
   @returns {string} - HTML string
------------------------------------------------------------ */
function buildBookingFormHTML(context, waKey) {
  return `
    <form id="booking-form" onsubmit="event.preventDefault(); submitBooking('${context}','${waKey}');" novalidate>

      <!-- HONEYPOT FIELD (Anti-Bot) -->
      <input type="text" id="field-hp" name="website_url" style="display:none !important;" tabindex="-1" autocomplete="off"/>

      <!-- Row 1: Name + Phone -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">

      <!-- Row 1: Name + Phone -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
        <div class="form-field">
          <label class="form-label">👤 Full Name *</label>
          <input id="field-name" type="text" class="form-input" placeholder="e.g. Ahmad Fahmie" required/>
        </div>
        <div class="form-field">
          <label class="form-label">📞 Phone Number *</label>
          <input id="field-phone" type="tel" class="form-input" placeholder="e.g. 0136788869" required/>
        </div>
      </div>

      <!-- Row 2: Email (optional) -->
      <div class="form-field" style="margin-bottom:14px;">
        <label class="form-label">📧 Email (optional — for booking confirmation)</label>
        <input id="field-email" type="email" class="form-input" placeholder="e.g. customer@email.com"/>
      </div>

      <!-- Row 3: Pickup + Dropoff -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
        <div class="form-field">
          <label class="form-label">📍 Pickup Point *</label>
          <input id="field-pickup" type="text" class="form-input" placeholder="e.g. KL Sentral, Block A" required/>
        </div>
        <div class="form-field">
          <label class="form-label">🏁 Drop-off Point *</label>
          <input id="field-dropoff" type="text" class="form-input" placeholder="e.g. Hotel Hatyai" required/>
        </div>
      </div>

      <!-- Row 4: Date + Time + Passengers -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:14px;">
        <div class="form-field">
          <label class="form-label">📅 Travel Date *</label>
          <input id="field-date" type="date" class="form-input" required/>
        </div>
        <div class="form-field">
          <label class="form-label">🕐 Travel Time *</label>
          <input id="field-time" type="time" class="form-input" required/>
        </div>
        <div class="form-field">
          <label class="form-label">👥 Passengers *</label>
          <select id="field-pax" class="form-input" required>
            <option value="">Select...</option>
            <option>1 Passenger</option>
            <option>2 Passengers</option>
            <option>3 Passengers</option>
            <option>4 Passengers</option>
            <option>5 Passengers</option>
            <option>6 Passengers</option>
            <option>7–10 Passengers</option>
            <option>11–13 Passengers</option>
            <option>14+ Passengers</option>
          </select>
        </div>
      </div>

      <!-- Row 5: Van Type -->
      <div class="form-field" style="margin-bottom:14px;">
        <label class="form-label">🚐 Van Type Preference</label>
        <select id="field-van" class="form-input">
          <option value="">No preference / To be advised</option>
          <option>Small Van (4–6 pax with luggage)</option>
          <option>Large Van (7–13 pax with luggage)</option>
        </select>
      </div>

      <!-- Row 6: Special Requests -->
      <div class="form-field" style="margin-bottom:20px;">
        <label class="form-label">💬 Special Requests / Notes</label>
        <textarea id="field-special" class="form-input" rows="3"
          placeholder="Any special needs, pickup instructions, child seats, etc."></textarea>
      </div>

      <!-- Submit button -->
      <button id="booking-submit-btn" type="submit" class="btn btn-green"
        style="width:100%;justify-content:center;font-size:1.05rem;padding:16px;">
        📲 Send Booking via WhatsApp + Email Alert
      </button>

      <!-- Message box — shown after submit (success/error) -->
      <div id="form-message" style="display:none;"></div>

      <!-- Small note for the customer -->
      <p style="text-align:center;color:var(--muted);font-size:.78rem;margin-top:12px;">
        Clicking the button will open WhatsApp with your details pre-filled
        AND send an email alert to our team. 📧📲
      </p>

    </form>`;
}


/* ------------------------------------------------------------
   RENDER — STATES LIST (All Destinations page)
   Builds the full list of Malaysian states.
   Data comes from CONFIG.destinations in config.js.
------------------------------------------------------------ */
function renderStatesList() {
  const container = document.getElementById('states-list');
  if (!container) return;

  container.innerHTML = CONFIG.destinations.map(function(d) {
    const clickAction = d.page
      ? `showPage('${d.page}')`
      : `window.open('https://wasap.my/${CONFIG.whatsapp.primary}/${d.waKey}','_blank')`;

    return `
      <div class="state-card" onclick="${clickAction}">
        <div class="state-flag">${d.icon}</div>
        <div class="state-info">
          <div class="state-name">${d.name}</div>
          <div class="state-route">${d.type}</div>
        </div>
        <div class="state-arrow">→</div>
      </div>`;
  }).join('');
}


/* ============================================================
   INIT — RUN ALL RENDERERS ON PAGE LOAD
   This function is called once when the website first loads.
   It builds all dynamic content from config.js.
   ============================================================ */
function initApp() {
  /* Set today's date as the default in search widget */
  const dateInput = document.getElementById('travel-date');
  if (dateInput) dateInput.valueAsDate = new Date();

  /* Render all dynamic sections from config data */
  renderDestinations();
  renderFeatures();
  renderSteps();
  renderTourCards('tour-cards-home', 2);   /* homepage: show 2 tours max */
  renderTourCards('tour-cards-page', 0);   /* tours page: show all tours  */
  renderAirportRoutes();
  renderStatesList();
  renderTourDetailPages();                 /* creates a page per tour */

  /* Initialize EmailJS with the public key from config */
  initEmailJS();

  /* Set up scroll animation for cards */
  initScrollAnimations();
}


/* ------------------------------------------------------------
   SCROLL ANIMATIONS
   Fades in cards as they come into view while scrolling.
------------------------------------------------------------ */
function initScrollAnimations() {
  /* IntersectionObserver watches elements as they enter viewport */
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.style.opacity  = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  /* Apply initial hidden state and observe each card */
  document.querySelectorAll('.dest-card, .feature-card, .tour-card, .state-card, .booking-card').forEach(function(el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .45s ease, transform .45s ease';
    observer.observe(el);
  });
}

/* Run everything when the page finishes loading */
document.addEventListener('DOMContentLoaded', initApp);
/* ============================================================
   END OF router.js
   ============================================================ */
