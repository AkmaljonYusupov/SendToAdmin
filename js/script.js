const lang = {
	uz: {
		nameLabel: 'Ism',
		surnameLabel: 'Familiya',
		phoneLabel: 'Telefon raqami',
		telegramUsernameLabel: 'Telegram foydalanuvchi nomi',
		messageLabel: 'Xabar',
		submitBtn: 'Yuborish',
		successPopup: 'Xabar muvaffiyatli yuborildi!',
		errorPopup: 'Xabar yuborishda xatolik yuz berdi!',
		errorValidation:
			"Iltimos, barcha maydonlarni to'ldirib, telefon raqami faqat raqamlar va + belgisidan, telegram username esa @ bilan boshlanishi kerak.",
	},
	ru: {
		nameLabel: 'Имя',
		surnameLabel: 'Фамилия',
		phoneLabel: 'Телефонный номер',
		telegramUsernameLabel: 'Имя пользователя Telegram',
		messageLabel: 'Сообщение',
		submitBtn: 'Отправить',
		successPopup: 'Сообщение успешно отправлено!',
		errorPopup: 'Ошибка при отправке сообщения!',
		errorValidation:
			'Пожалуйста, заполните все поля, номер телефона должен начинаться только с цифр и знака +, а имя пользователя Telegram должно начинаться с @.',
	},
	en: {
		nameLabel: 'Name',
		surnameLabel: 'Surname',
		phoneLabel: 'Phone number',
		telegramUsernameLabel: 'Telegram Username',
		messageLabel: 'Message',
		submitBtn: 'Send',
		successPopup: 'Message sent successfully!',
		errorPopup: 'Error sending message!',
		errorValidation:
			'Please fill in all fields, the phone number must only contain numbers and the + sign, and the telegram username must begin with @.',
	},
}

let currentLang = 'uz'

function switchLanguage(language) {
	currentLang = language
	const texts = lang[language]
	document.getElementById('nameLabel').textContent = texts.nameLabel
	document.getElementById('surnameLabel').textContent = texts.surnameLabel
	document.getElementById('phoneLabel').textContent = texts.phoneLabel
	document.getElementById('telegramUsernameLabel').textContent =
		texts.telegramUsernameLabel
	document.getElementById('messageLabel').textContent = texts.messageLabel
	document.getElementById('submitBtn').textContent = texts.submitBtn
	document.getElementById('popup').textContent = texts.successPopup
	document.getElementById('errorPopup').textContent = texts.errorPopup
}

// Telefon raqami faqat raqam va + belgisini qabul qilish va uzunlikni cheklash
document.getElementById('phone').addEventListener('input', function (event) {
	let phoneNumber = event.target.value
	// Faqat raqamlar va + belgisi ruxsat etiladi
	phoneNumber = phoneNumber.replace(/[^0-9+]/g, '')

	// Telefon raqamining uzunligini tekshirish (7 dan 15 gacha)
	if (phoneNumber.length >= 7 && phoneNumber.length <= 15) {
		event.target.value = phoneNumber
	} else {
		event.target.value = phoneNumber.slice(0, 15) // Maksimal 15 belgi
	}
})

// Xabar yuborish funktsiyasi
function sendMessage() {
	let name = document.getElementById('name').value
	let surname = document.getElementById('surname').value
	let phone = document.getElementById('phone').value
	let message = document.getElementById('message').value
	let telegramUsername = document.getElementById('telegramUsername').value

	// Telefon raqami + bilan boshlanishi kerakligini tekshirish
	if (!phone.startsWith('+') || !telegramUsername.startsWith('@')) {
		showError(lang[currentLang].errorValidation + ' ' + ' ')
		return
	}

	// Formni tekshirish
	if (
		name === '' ||
		surname === '' ||
		phone === '' ||
		telegramUsername === '' ||
		message === ''
	) {
		showError(lang[currentLang].errorValidation)
		return
	}

	// Formni yuborish jarayonini ko'rsatish
	document.getElementById('loading').style.display = 'block'

	// Telegram botga xabar yuborish
	const botToken = '8053066705:AAF8P700tHs7_mQonmukgCCcLn_3LI9rrsY' // O'zgartiring: Bot tokenini kiriting
	const chatId = '630353326' // O'zgartiring: Sizning chat ID (bot bilan bog'langan foydalanuvchi yoki guruh ID)
	const text = `
					<b>📧 sizga xabar keldi</b>\n
					<b>🌐 Til:</b> ${
						currentLang === 'uz'
							? "O'zbek"
							: currentLang === 'ru'
							? 'Русский'
							: 'English'
					}\n
					<b>🙎‍♂️ FISH:</b> ${name + '  ' + surname}\n						
					<b>📞 Telefon:</b> ${phone}\n
					<b>✈️ Telegram:</b> ${telegramUsername ? telegramUsername : 'Kiritilmagan'}\n
					<b>💬 Xabar:</b> ${message}\n
`

	const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
		text
	)}&parse_mode=HTML`

	fetch(url)
		.then(response => {
			document.getElementById('loading').style.display = 'none'
			if (response.ok) {
				showSuccess(lang[currentLang].successPopup)
			} else {
				showError(lang[currentLang].errorPopup)
			}
		})
		.catch(() => {
			document.getElementById('loading').style.display = 'none'
			showError(lang[currentLang].errorPopup)
		})
}

// Success popupni ko'rsatish
function showSuccess(message) {
	let popup = document.getElementById('popup')
	popup.textContent = message
	popup.style.display = 'block'
	setTimeout(() => {
		popup.style.display = 'none'
	}, 3000)
}

// Error popupni ko'rsatish
function showError(message) {
	let errorPopup = document.getElementById('errorPopup')
	errorPopup.textContent = message
	errorPopup.style.display = 'block'
	setTimeout(() => {
		errorPopup.style.display = 'none'
	}, 3000)
}
// Suzuvchi kursor yaratish
const cursor = document.createElement('div')
cursor.classList.add('smooth-cursor')
document.body.appendChild(cursor)

// Maus pozitsiyasini olish
let posX = 0,
	posY = 0
let mouseX = 0,
	mouseY = 0

// Mouse pozitsiyasini yangilash
document.addEventListener('mousemove', e => {
	mouseX = e.clientX
	mouseY = e.clientY
})

// Suzuvchi kursorni kechikib harakatlantirish
const updateCursor = () => {
	posX += (mouseX - posX) * 0.1 // Silliqlik darajasi
	posY += (mouseY - posY) * 0.1

	cursor.style.left = `${posX}px`
	cursor.style.top = `${posY}px`

	requestAnimationFrame(updateCursor)
}
updateCursor()

// Hover qilganda kattalashadigan effekt
document.querySelectorAll('input, textarea, button').forEach(element => {
	element.addEventListener('mouseenter', () => cursor.classList.add('hover'))
	element.addEventListener('mouseleave', () => cursor.classList.remove('hover'))
})

// Iz qoldiruvchi animatsiya
document.addEventListener('mousemove', e => {
	const trail = document.createElement('div')
	trail.classList.add('cursor-trail')
	document.body.appendChild(trail)

	trail.style.left = `${e.clientX}px`
	trail.style.top = `${e.clientY}px`

	// Izni animatsiya tugagach, o'chirib yuborish
	setTimeout(() => {
		trail.remove()
	}, 1000) // Izni 1 sekunddan so'ng o'chirish
})

// qor

const snowflakeSymbols = ['❄', '❅', '❆', '❄️', '❅', '❆', ' ✳', '☸'] // Qor shakllari

// Qorni yaratish funksiyasi
function createSnowflake() {
	const snowflake = document.createElement('div')
	snowflake.classList.add('snowflake')

	// Random qor shakli tanlash
	snowflake.innerText =
		snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)]

	// Tasodifiy o‘lcham va pozitsiya
	const size = Math.random() * 15 + 5 // 5px - 20px
	const duration = Math.random() * 10 + 5 // 5-15 soniya tushish vaqti
	const drift = Math.random() * 50 - 25 // Yon tomon shamol effekti
	const leftPosition = Math.random() * window.innerWidth

	// Stil berish
	snowflake.style.left = `${leftPosition}px`
	snowflake.style.fontSize = `${size}px`
	snowflake.style.animationDuration = `${duration}s`
	snowflake.style.setProperty('--drift', `${drift}px`)

	// Qor parchalarini bodyga qo‘shish
	document.body.appendChild(snowflake)

	// Yerga tushganda olib tashlash va yerda qor yaratish
	setTimeout(() => {
		snowflake.remove()
		createGroundSnow(leftPosition, size)
	}, duration * 1000)
}

// Yerda qor to‘planishi
function createGroundSnow(positionX, size) {
	const groundSnow = document.createElement('div')
	groundSnow.classList.add('ground-snow')

	// Stil berish
	groundSnow.style.width = `${size}px`
	groundSnow.style.height = `${size / 2}px`
	groundSnow.style.left = `${positionX}px`
	groundSnow.style.animation = 'melt 5s forwards'

	// Yerga joylashish
	document.body.appendChild(groundSnow)

	// Erish animatsiyasi tugaganda olib tashlash
	setTimeout(() => {
		groundSnow.remove()
	}, 5000)
}

// Qorni boshlash funksiyasi
function startSnowfall() {
	setInterval(createSnowflake, 100) // Har 50 ms da yangi qor
}

startSnowfall()
