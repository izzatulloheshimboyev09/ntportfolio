# Ultra-Premium Portfolio & Admin Panel (Izzatulloh Eshimboyev)

Zamonaviy, minimalistik, kiberpank va neon dark-mode uslubidagi shaxsiy dasturchi portfoliosi hamda real-time boshqaruvga ega Admin Panel.

## 🚀 Texnologiyalar
- **Frontend kutubxonasi:** React 18+ (Vite bilan)
- **CSS arxitekturasi:** Tailwind CSS 3
- **Fontlar:** `JetBrains Mono` (kod va terminal qismlari uchun), `Inter` (matnlar uchun)
- **Dizayn effekti:** Glassmorphism (backdrop-blur), Cyberpunk Neon Glow (`#06b6d4`, `#10b981`, `#8b5cf6`)
- **State & Kesh:** React Context API + `localStorage` (real-time ikki tomonlama sinxronizatsiya)

---

## 🔐 Admin Panelga Kirish Ma'lumotlari

Admin boshqaruv paneliga saytning yuqori o'ng burchagidagi qulf tugmasi yoki sahifa pastki qismidagi **"Admin Login"** havolasi orqali kiriladi:

- **Login:** `admin`
- **Parol:** `admin123`
*(Modal oynasida qulaylik uchun **"To'ldirish"** (Sparkles) tugmasi mavjud bo'lib, hisob ma'lumotlarini bitta bosishda avtomatik kiritadi)*

---

## ⚡ Asosiy Imkoniyatlar

1. **Portfolio Bosh Sahifasi:**
   - **Hero Section:** Ism (*Izzatulloh Eshimboyev*), yozilish effekti bilan almashib turuvchi kasb unvoni (*Front-end Developer*, *React Specialist*, *Tailwind Artisan*), faollik nishoni (*Loyihalar uchun ochiq*), dasturchilik darajasi (*Junior / Middle / Senior / Lead*), Resume yuklab olish va ijtimoiy tarmoqlar.
   - **Terminal Widget:** JetBrains Mono shriftidagi interaktiv konfiguratsiya terminali.
   - **Tajriba va Statistika (About & Stats):** Yillik tajriba, bajarilgan loyihalar soni, mamnun mijozlar va Karyera darajasi yo'nalishi (Junior -> Middle -> Senior -> Lead).
   - **Texnik Ko'nikmalar (Tech Stack):** Progress bar va foizlar bilan boyitilgan ko'nikmalar kartochkalari (Frontend, Styling, Core, Tools).
   - **Loyihalar Galereyasi (Projects Showcase):** Kategoriya filtrlari, tezkor qidiruv, rasm, ishlatilgan texnologiyalar, Live Demo va GitHub havolalari.
   - **Aloqa Bo'limi (Contact):** Foydalanuvchilar to'g'ridan-to'g'ri xabar qoldirishi mumkin bo'lgan forma (xabarlar bevosita Admin panelning Inbox qismiga kelib tushadi).

2. **Himoyalangan Admin Panel:**
   - **Profil Boshqaruvi:** Ism, kasb, dasturchilik darajasi (Junior, Middle, Senior, Lead), tajriba, bio va havolalarni o'zgartirish. Har bir o'zgarish saqlanganda darhol asosiy portfolioda yangilanadi.
   - **Loyihalar Boshqaruvi (To'liq CRUD):**
     - Yangi loyiha qo'shish (nomi, rasm havolasi, texnologiyalar, toifa, demo va GitHub linklari).
     - Mavjud loyihani tahrirlash (modal oyna orqali).
     - Loyihani o'chirish (tasdiqlash bilan).
   - **Ko'nikmalar Boshqaruvi:** Yangi texnologiyalar qo'shish, foizini slayder orqali belgilash, o'chirish.
   - **Xabarlar Qutisi (Inbox):** Kontakt formadan kelgan barcha taklif va xabarlarni o'qish, o'qilgan deb belgilash va o'chirish.
   - **Dastlabki Holatga Qaytarish (Reset to Defaults):** Tizimni istalgan vaqtda boshlang'ich namunaviy ma'lumotlarga tiklash.

---

## 🛠 Loyihani Ishga Tushirish

```bash
# Paketlarni o'rnatish
npm install

# Mahalliy serverni ishga tushirish
npm run dev

# Ishlab chiqarishga yig'ish (Build)
npm run build
```
