============================================================
  JOMSHUTTLE WEBSITE — SETUP & EDITING GUIDE
  For: Website Owner (Non-Developer Friendly)
============================================================

YOUR WEBSITE FILE STRUCTURE:
  jomshuttle/
  ├── index.html          ← Main page (don't edit this much)
  ├── css/
  │   └── style.css       ← Colours & design (edit for look)
  └── js/
      ├── config.js       ← ⭐ YOUR MAIN EDIT FILE (prices, tours, text)
      ├── booking.js      ← WhatsApp + Email logic
      └── router.js       ← Page navigation (don't edit)


============================================================
  STEP 1 — SET UP EMAILJS (Free Email Notifications)
============================================================

EmailJS lets your website send emails WITHOUT a server.
It's FREE for up to 200 emails/month.

1. Go to: https://www.emailjs.com
2. Click "Sign Up" — use your Gmail (my.hnf.store@gmail.com)
3. After logging in, click "Email Services" → "Add New Service"
4. Choose "Gmail" → Connect your Gmail account → Save
   → Copy the "Service ID" (looks like: service_abc123)

5. Click "Email Templates" → "Create New Template"
6. Set the template like this:

   Subject:
   New JomShuttle Booking — {{customer_name}}

   Body (copy and paste this exactly):
   ----------------------------------------
   New Booking Alert! 🚐

   Booking Type : {{booking_type}}
   Name         : {{customer_name}}
   Phone        : {{customer_phone}}
   Email        : {{customer_email}}

   Pickup Point : {{pickup_point}}
   Drop-off     : {{dropoff_point}}
   Travel Date  : {{travel_date}}
   Travel Time  : {{travel_time}}
   Passengers   : {{passengers}}
   Van Type     : {{van_type}}

   Special Request:
   {{special_request}}

   Sent to: {{to_emails}}
   ----------------------------------------

   Set "To Email" field to: {{to_email}}
   → Save the template
   → Copy the "Template ID" (looks like: template_xyz456)

7. Click "Account" in the top right
   → Copy your "Public Key" (looks like: user_ABCdef123)

8. Open the file: js/config.js
   Find this section:

     emailJS: {
       emailServiceID:  "YOUR_SERVICE_ID",
       emailTemplateID: "YOUR_TEMPLATE_ID",
       emailPublicKey:  "YOUR_PUBLIC_KEY",
     },

   Replace the placeholder text with your actual values:

     emailJS: {
       emailServiceID:  "service_abc123",   ← your real value
       emailTemplateID: "template_xyz456",  ← your real value
       emailPublicKey:  "user_ABCdef123",   ← your real value
     },

9. Save config.js — done! Emails will now fire on every booking.


============================================================
  STEP 2 — UPLOAD TO YOUR HOSTING (cPanel)
============================================================

1. Log in to your cPanel (your hosting welcome email has the link)
2. Click "File Manager"
3. Open the "public_html" folder
4. Upload the ENTIRE "jomshuttle" folder contents:
     - index.html
     - css/ folder (with style.css inside)
     - js/ folder (with config.js, booking.js, router.js inside)

   IMPORTANT: Make sure index.html is DIRECTLY inside public_html
   not inside a subfolder like public_html/jomshuttle/index.html

5. Your site is live at your domain!


============================================================
  STEP 3 — HOW TO EDIT COMMON THINGS
============================================================

ALL edits below are done in: js/config.js
Open it with Notepad (Windows) or TextEdit (Mac)

---- Change Your Phone Number ----
Find: phone: "60136788869"
Change the number (keep country code, no spaces, no +)
Also update the whatsapp section below it.

---- Change Prices ----
For airport routes, find the airportRoutes section:
  { title: "Large Van...", price: "RM250", ... }
Change "RM250" to whatever you want.

For tours, find the tourPackages section:
  { price: "RM580", ... }
Change the price value.

---- Change Hero Headline ----
Find the hero section:
  headline: "Book Now & Let Us",
  highlight: "Drive You There!",
Change the text inside the quotes.

---- Change Features (Why Choose Us) ----
Find the features array and edit the title/desc of any item.

---- Change Notification Emails ----
Find:
  notificationEmails: [
    "my.hnf.store@gmail.com",
    "fahmie1997@yahoo.com",
  ],
Add or remove email addresses as needed.


============================================================
  STEP 4 — HOW TO ADD A NEW TOUR PACKAGE
============================================================

1. Open js/config.js
2. Scroll to the tourPackages section
3. Find the big comment block that says:
   "👇 ADD YOUR NEW TOUR PACKAGE HERE — COPY THE BLOCK BELOW"
4. Copy the example block shown in the comment
5. Paste it ABOVE the line that says: ], // ← end of tourPackages
6. Fill in all the details (id, title, price, itinerary, etc.)
7. Save config.js
8. Your new tour appears automatically on the Tours page
   AND gets its own full detail page — no other files to edit!

Example (Langkawi tour) is already shown in the comment.


============================================================
  STEP 5 — HOW TO ADD A REAL PHOTO TO GALLERY
============================================================

1. Upload your photo to the same folder as index.html
   (e.g. upload van-photo.jpg into public_html)

2. Open index.html, find the gallery section:
   <div class="gallery-item">🚐</div>

3. Replace the emoji version with:
   <div class="gallery-item">
     <img src="van-photo.jpg" style="width:100%;height:100%;object-fit:cover;"/>
   </div>


============================================================
  STEP 6 — HOW TO CHANGE COLOURS
============================================================

Open css/style.css
At the very top, find the :root section:

  :root {
    --blue:       #003580;   ← Main dark blue
    --blue-light: #006ce4;   ← Bright blue buttons
    --yellow:     #FFD700;   ← Yellow accents
    --orange:     #FF6B00;   ← Prices & badges
    ...
  }

Change any hex colour code (#003580 etc.) to whatever you want.
Use https://htmlcolorcodes.com to pick colours easily.


============================================================
  QUICK REFERENCE — FILE PURPOSE SUMMARY
============================================================

  index.html    → Page structure (skeleton) — edit rarely
  css/style.css → All design, colours, fonts — edit for look
  js/config.js  → ⭐ Your main content file — edit often
  js/booking.js → WhatsApp message + email sending — don't touch
  js/router.js  → Page navigation & rendering — don't touch

============================================================
  NEED HELP?
============================================================

For EmailJS help: https://www.emailjs.com/docs/
For hosting help: Call Exabytes Malaysia support line
For colour picker: https://htmlcolorcodes.com
For emoji picker: https://emojipedia.org

============================================================
