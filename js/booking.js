/* ------------------------------------------------------------
   STEP 6 — MAIN SUBMIT HANDLER
------------------------------------------------------------ */
async function submitBooking(context, waKey) {

  /* --- HONEYPOT BOT CHECK --- */
  /* If this hidden field is filled, silently kill the request */
  const honeypot = document.getElementById('field-hp');
  if (honeypot && honeypot.value !== '') {
    console.warn('Bot detected and blocked.');
    /* Show fake success to confuse the bot */
    showFormMessage('✅ Booking sent! Our team will confirm shortly.', 'success');
    document.getElementById('booking-form').reset();
    return; 
  }

  /* --- Collect all form field values --- */
  const data = {
    customerName:    document.getElementById('field-name').value,
    customerPhone:   document.getElementById('field-phone').value,
    customerEmail:   document.getElementById('field-email').value,
    pickupPoint:     document.getElementById('field-pickup').value,
    dropoffPoint:    document.getElementById('field-dropoff').value,
    travelDate:      document.getElementById('field-date').value,
    travelTime:      document.getElementById('field-time').value,
    passengers:      document.getElementById('field-pax').value,
    vanType:         document.getElementById('field-van') ? document.getElementById('field-van').value : '',
    specialRequest:  document.getElementById('field-special').value,
  };

  /* --- Validate the form --- */
  const error = validateBookingForm(data);
  if (error) {
    showFormMessage(error, 'error');
    return; /* Stop here if validation failed */
  }

  /* --- Show loading state on the button --- */
  const btn = document.getElementById('booking-submit-btn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '⏳ Sending...';
  btn.disabled = true;

  try {
    /* --- Send email notifications to all addresses --- */
    await sendEmailNotifications(data, context);

    /* --- Build and send WhatsApp message --- */
    const message = buildWhatsAppMessage(data, context);
    openWhatsApp(message, CONFIG.whatsapp.primary);

    /* --- Show success message --- */
    showFormMessage('✅ Booking sent! WhatsApp is opening. Our team will confirm shortly.', 'success');

    /* --- Reset the form after success --- */
    document.getElementById('booking-form').reset();

  } catch (err) {
    console.warn('Email notification failed:', err);
    const message = buildWhatsAppMessage(data, context);
    openWhatsApp(message, CONFIG.whatsapp.primary);
    showFormMessage('✅ WhatsApp is opening! (Email notification had an issue — please check EmailJS setup)', 'warning');
  }

  /* --- Restore the button --- */
  btn.innerHTML = originalText;
  btn.disabled = false;
}
