document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm')
  const submitButton = form ? form.querySelector('button[type="submit"]') : null
  const offerSelect = document.getElementById('offer')
  const priceInput = document.getElementById('price')
  const offerLabelInput = document.getElementById('offer_label')
  const errorBox = document.getElementById('error')

  const offers = {
    '250g': {
      price: 900,
      label: '250غ بـ 900 دج'
    },
    '500g': {
      price: 1500,
      label: '500غ بـ 1500 دج'
    },
    '1kg_4x250g_gift': {
      price: 3600,
      label: '4 أكياس 250غ + 250غ هدية'
    },
    '1kg_2x500g_gift': {
      price: 3000,
      label: 'كيسين 500غ + 250غ هدية'
    }
  }

  function updateSelectedOffer () {
    if (!offerSelect || !priceInput || !offerLabelInput) return

    const selectedOffer = offers[offerSelect.value]

    if (selectedOffer) {
      priceInput.value = selectedOffer.price
      offerLabelInput.value = selectedOffer.label
    } else {
      priceInput.value = ''
      offerLabelInput.value = ''
    }
  }

  if (offerSelect) {
    offerSelect.addEventListener('change', function () {
      updateSelectedOffer()
      offerSelect.setCustomValidity('')
    })
  }

  trackViewContent()

  if (form && submitButton) {
    form.addEventListener('submit', function (e) {
      e.preventDefault()

      updateSelectedOffer()

      if (offerSelect && !offerSelect.value) {
        offerSelect.setCustomValidity('الرجاء اختيار العرض المناسب')
        offerSelect.reportValidity()
        return
      }

      if (offerSelect) {
        offerSelect.setCustomValidity('')
      }

      submitButton.disabled = true
      submitButton.innerText = 'جارٍ الإرسال...'

      if (errorBox) {
        errorBox.hidden = true
      }

      const formData = new FormData(form)

      fetch(
        'https://script.google.com/macros/s/AKfycby0MhYleqpspdLDvrSsQavkzWL23O62CNhfm1Jcq1viPkk9DEnKwTZzbIF2l_gj-GJiTg/exec',
        {
          method: 'POST',
          body: formData
        }
      )
        .then(response => response.text())
        .then(text => {
          submitButton.disabled = false
          submitButton.innerText = 'اطلب الآن'

          if (text.toLowerCase().includes('success')) {
            if (errorBox) {
              errorBox.hidden = true
            }

            trackPurchase()
            form.reset()

            setTimeout(function () {
              window.location.href = 'thankyou.html'
            }, 500)
          } else {
            if (errorBox) {
              errorBox.hidden = false
            }

            console.log('Erreur serveur :', text)
          }
        })
        .catch(err => {
          submitButton.disabled = false
          submitButton.innerText = 'اطلب الآن'

          if (errorBox) {
            errorBox.hidden = false
          }

          console.error(err)
        })
    })
  }

  // Countdown
  ;(function () {
    const DURATION = 24 * 60 * 60
    const STORAGE_KEY = 'offerCountdownEnd'

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

        countdownBoxes.forEach(function (box) {
          box.innerHTML = 'انتهى العرض'
        })

        return
      }

      const hours = Math.floor(timeLeft / 3600)
      const minutes = Math.floor((timeLeft % 3600) / 60)
      const seconds = timeLeft % 60

      countdownBoxes.forEach(function (box) {
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

  // Scroll to order section
  const btns = document.querySelectorAll('.scrollToOrder')
  const orderSection = document.getElementById('order-section')

  if (btns.length && orderSection) {
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        orderSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    })
  }

  function trackViewContent () {
    if (!form) return

    const contentId = form.querySelector('input[name="content_id"]')?.value || 'doum_powder'
    const contentName = form.querySelector('input[name="content_name"]')?.value || 'Poudre naturelle de doum'
    const currency = form.querySelector('input[name="currency"]')?.value || 'DZD'

    /*
    ttq.track('ViewContent', {
      contents: [
        {
          content_id: contentId,
          content_type: 'product',
          content_name: contentName
        }
      ],
      value: 0,
      currency: currency
    })
    */
  }

  function trackPurchase () {
    if (!form) return

    const contentId = form.querySelector('input[name="content_id"]')?.value || 'doum_powder'
    const contentName = form.querySelector('input[name="content_name"]')?.value || 'Poudre naturelle de doum'
    const price = form.querySelector('input[name="price"]')?.value || '0'
    const currency = form.querySelector('input[name="currency"]')?.value || 'DZD'
    const offerLabel = form.querySelector('input[name="offer_label"]')?.value || ''

    /*
    ttq.track('Purchase', {
      contents: [
        {
          content_id: contentId,
          content_type: 'product',
          content_name: contentName
        }
      ],
      value: parseFloat(price),
      currency: currency
    })
    */

    posthog.capture('Purchase', {
      content_id: contentId,
      content_name: contentName,
      offer: offerLabel,
      value: parseFloat(price),
      currency: currency
    })
  }
})