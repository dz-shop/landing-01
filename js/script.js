const form = document.getElementById('orderForm')
const submitButton = form.querySelector('button[type="submit"]')

trackViewContent()

form.addEventListener('submit', function (e) {
  //posthog.capture('my_custom_event', { property: 'value' })
  e.preventDefault()

  // Désactiver le bouton pour éviter plusieurs clics
  submitButton.disabled = true
  submitButton.innerText = 'ارسال...'

  const formData = new FormData(form)

  fetch(
    'https://script.google.com/macros/s/AKfycbxuxogdcCmIqKmPrse2v_CDfahmQtPF7r-z3oglWE2JoeBYGvQY3dPlqSGZdkhF_NEFHA/exec',
    {
      // <-- Remplace TON_DEPLOY_ID
      method: 'POST',
      body: formData
    }
  )
    .then(response => response.text())
    .then(text => {
      // Réactiver le bouton
      submitButton.disabled = false
      submitButton.innerText = 'اطلب الان'

      if (text.toLowerCase().includes('success')) {
        //document.getElementById('message').style.display = 'block'
        document.getElementById('error').style.display = 'none'
        form.reset()
        trackPurchase()

        // Redirection après 500ms pour laisser le pixel envoyer l'event
        setTimeout(() => {
          window.location.href = 'thankyou.html'
        }, 500)
      } else {
        //document.getElementById('message').style.display = 'none'
        document.getElementById('error').style.display = 'block'
        //console.log('Erreur serveur :', text)
      }
    })
    .catch(err => {
      // Réactiver le bouton en cas d'erreur
      submitButton.disabled = false
      submitButton.innerText = 'اطلب الان'

      //document.getElementById('message').style.display = 'none'
      document.getElementById('error').style.display = 'block'
      console.error(err)
    })
})

;(function () {
  const DURATION = 24 * 60 * 60 // 24 heures en secondes
  const STORAGE_KEY = 'offerCountdownEnd'

  // Si pas encore stocké → on crée un nouveau countdown
  let endTime = localStorage.getItem(STORAGE_KEY)
  if (!endTime) {
    endTime = Date.now() + DURATION * 1000
    localStorage.setItem(STORAGE_KEY, endTime)
  }

  function updateCountdown () {
    const now = Date.now()
    const timeLeft = Math.floor((endTime - now) / 1000)

    const countdownBoxes = document.querySelectorAll('.countdown-box')
    if (timeLeft <= 0) {
      localStorage.removeItem(STORAGE_KEY)
      countdownBoxes.forEach(box => {
        box.innerHTML = 'انتهى العرض'
      })
      return
    }

    const hours = Math.floor(timeLeft / (60 * 60))
    const minutes = Math.floor((timeLeft % 3600) / 60)
    const seconds = timeLeft % 60

    countdownBoxes.forEach(box => {
      const hEl = box.querySelector('.hours')
      const mEl = box.querySelector('.minutes')
      const sEl = box.querySelector('.seconds')

      if (hEl) hEl.textContent = String(hours).padStart(2, '0')
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0')
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0')
    })
  }

  updateCountdown()
  setInterval(updateCountdown, 1000)
})()

function trackViewContent () {
  const contentId = form.querySelector('input[name="content_id"]').value
  const contentName = form.querySelector('input[name="content_name"]').value
  const price = form.querySelector('input[name="price"]').value
  const currency = form.querySelector('input[name="currency"]').value

  /* ttq.track('ViewContent', {
    contents: [
      {
        content_id: contentId, // string. ID of the product. Example: "1077218".
        content_type: 'product', // string. Either product or product_group.
        content_name: contentName // string. The name of the page or product. Example: "shirt".
      }
    ],
    value: price, // number. Value of the order or items sold. Example: 100.
    currency: currency // string. The 4217 currency code. Example: "USD".
  }) */
}

function trackPurchase () {
  const contentId = form.querySelector('input[name="content_id"]').value
  const contentName = form.querySelector('input[name="content_name"]').value
  const price = form.querySelector('input[name="price"]').value
  const currency = form.querySelector('input[name="currency"]').value

  /* ttq.track('Purchase', {
    contents: [
      {
        content_id: contentId, // string. ID of the product. Example: "1077218".
        content_type: 'product', // string. Either product or product_group.
        content_name: contentName // string. The name of the page or product. Example: "shirt".
      }
    ],
    value: price, // number. Value of the order or items sold. Example: 100.
    currency: currency // string. The 4217 currency code. Example: "USD".
  })

  posthog.capture('Purchase', {
    content_id: contentId,
    content_name: contentName,
    value: parseFloat(price),
    currency: currency
  }); */
}


document.addEventListener("DOMContentLoaded", function () {
  const btns = document.querySelectorAll(".scrollToOrder");
  const orderSection = document.getElementById("order-section");

  if (btns.length && orderSection) {
    btns.forEach(btn => {
      btn.addEventListener("click", function () {
        orderSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  }
});
