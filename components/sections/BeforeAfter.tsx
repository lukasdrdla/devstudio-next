'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoveHorizontal, MousePointer, X } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'

// Before HTML (old website) - FULL VERSION
const beforeHtml = `<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>STAVOMAL s.r.o.</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
        body { background: #f0f0f0; }
        .header { background: linear-gradient(to bottom, #1a3a5c, #0d2137); padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #f7941d; }
        .logo-area { display: flex; align-items: center; gap: 15px; }
        .logo-icon { width: 60px; height: 60px; background: #f7941d; display: flex; align-items: center; justify-content: center; }
        .logo-icon svg { width: 36px; height: 36px; fill: white; }
        .logo-text h1 { color: white; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; }
        .logo-text p { color: #f7941d; font-size: 12px; }
        .header-contact { text-align: right; color: white; }
        .header-contact p { font-size: 13px; margin: 3px 0; }
        .header-contact .phone { font-size: 20px; font-weight: bold; color: #f7941d; }
        nav { background: #2c2c2c; }
        nav ul { list-style: none; display: flex; justify-content: center; }
        nav li { border-right: 1px solid #444; }
        nav a { display: block; padding: 15px 25px; color: white; text-decoration: none; text-transform: uppercase; font-size: 13px; font-weight: bold; }
        nav a:hover { background: #f7941d; }
        .slider { height: 400px; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80'); background-size: cover; background-position: center; display: flex; align-items: center; justify-content: center; text-align: center; color: white; }
        .slider-content h2 { font-size: 42px; text-transform: uppercase; text-shadow: 3px 3px 6px rgba(0,0,0,0.5); margin-bottom: 15px; }
        .slider-content p { font-size: 18px; margin-bottom: 25px; }
        .btn-orange { display: inline-block; background: #f7941d; color: white; padding: 15px 40px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 14px; }
        .info-strip { background: #f7941d; padding: 20px; display: flex; justify-content: space-around; flex-wrap: wrap; }
        .info-item { display: flex; align-items: center; gap: 12px; color: white; }
        .info-item svg { width: 32px; height: 32px; fill: white; }
        .info-item p { font-size: 14px; font-weight: bold; }
        .main { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }
        .section-title { text-align: center; margin-bottom: 30px; }
        .section-title h2 { font-size: 28px; color: #1a3a5c; text-transform: uppercase; margin-bottom: 10px; }
        .section-title .underline { width: 80px; height: 4px; background: #f7941d; margin: 0 auto; }
        .about-section { display: flex; gap: 30px; margin-bottom: 50px; background: white; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .about-image { width: 350px; height: 250px; flex-shrink: 0; overflow: hidden; }
        .about-image img { width: 100%; height: 100%; object-fit: cover; }
        .about-text h3 { color: #1a3a5c; font-size: 22px; margin-bottom: 15px; }
        .about-text p { color: #555; line-height: 1.7; font-size: 14px; margin-bottom: 15px; }
        .about-text ul { margin-left: 20px; color: #555; }
        .about-text li { margin: 8px 0; font-size: 14px; }
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 50px; }
        .service-card { background: white; padding: 25px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-top: 4px solid #f7941d; }
        .service-icon { width: 70px; height: 70px; background: #1a3a5c; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; }
        .service-icon svg { width: 32px; height: 32px; fill: white; }
        .service-card h3 { color: #1a3a5c; font-size: 16px; text-transform: uppercase; margin-bottom: 10px; }
        .service-card p { color: #666; font-size: 13px; line-height: 1.6; }
        .references { background: white; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 50px; }
        .ref-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .ref-item { aspect-ratio: 4/3; overflow: hidden; border: 3px solid #f7941d; }
        .ref-item img { width: 100%; height: 100%; object-fit: cover; }
        .why-us { background: #1a3a5c; padding: 40px; color: white; margin-bottom: 50px; }
        .why-us h2 { text-align: center; margin-bottom: 30px; font-size: 26px; text-transform: uppercase; }
        .why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .why-item { display: flex; align-items: flex-start; gap: 15px; }
        .check { width: 30px; height: 30px; background: #f7941d; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .check svg { width: 16px; height: 16px; fill: white; }
        .why-item p { font-size: 14px; line-height: 1.5; }
        .contact-section { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .contact-info { background: white; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .contact-info h3 { color: #1a3a5c; font-size: 20px; margin-bottom: 20px; text-transform: uppercase; }
        .contact-row { display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; }
        .contact-icon { width: 40px; height: 40px; background: #f7941d; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .contact-icon svg { width: 20px; height: 20px; fill: white; }
        .contact-row p { font-size: 14px; color: #555; line-height: 1.5; }
        .contact-row strong { color: #1a3a5c; }
        .contact-form { background: white; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .contact-form h3 { color: #1a3a5c; font-size: 20px; margin-bottom: 20px; text-transform: uppercase; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; font-size: 13px; color: #555; margin-bottom: 5px; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; font-size: 14px; }
        .form-group textarea { height: 100px; resize: none; }
        footer { background: #1a3a5c; color: white; padding: 30px 20px; text-align: center; }
        footer p { font-size: 13px; margin: 5px 0; }
        .footer-links { margin-top: 15px; }
        .footer-links a { color: #f7941d; text-decoration: none; margin: 0 10px; font-size: 13px; }
        .floating-phone { position: fixed; bottom: 20px; right: 20px; background: #f7941d; color: white; padding: 15px 20px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 100; display: flex; align-items: center; gap: 10px; }
        .floating-phone svg { width: 20px; height: 20px; fill: white; }
    </style>
</head>
<body>
    <header class="header">
        <div class="logo-area">
            <div class="logo-icon"><svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z"/></svg></div>
            <div class="logo-text"><h1>StavoMal</h1><p>stavební firma s.r.o.</p></div>
        </div>
        <div class="header-contact">
            <p>info@stavomal.cz</p>
            <p class="phone">+420 777 888 999</p>
            <p>Po-Pá: 7:00 - 17:00</p>
        </div>
    </header>
    <nav><ul>
        <li><a href="#">Úvod</a></li>
        <li><a href="#">O nás</a></li>
        <li><a href="#">Služby</a></li>
        <li><a href="#">Reference</a></li>
        <li><a href="#">Ceník</a></li>
        <li><a href="#">Kontakt</a></li>
    </ul></nav>
    <div class="slider">
        <div class="slider-content">
            <h2>Stavíme vaše sny</h2>
            <p>Rodinné domy, rekonstrukce, průmyslové stavby - vše na klíč!</p>
            <a href="#" class="btn-orange">Nezávazná poptávka</a>
        </div>
    </div>
    <div class="info-strip">
        <div class="info-item"><svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z"/></svg><p>500+ postavených domů</p></div>
        <div class="info-item"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg><p>25 let zkušeností</p></div>
        <div class="info-item"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><p>100% spokojených klientů</p></div>
        <div class="info-item"><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg><p>Záruka 5 let</p></div>
    </div>
    <main class="main">
        <div class="section-title"><h2>O naší firmě</h2><div class="underline"></div></div>
        <div class="about-section">
            <div class="about-image"><img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80" alt="Stavba"></div>
            <div class="about-text">
                <h3>Jsme rodinná stavební firma s tradicí</h3>
                <p>Firma StavoMal s.r.o. působí na trhu již od roku 1998. Za tuto dobu jsme realizovali stovky projektů po celé Moravě. Specializujeme se na výstavbu rodinných domů, rekonstrukce a průmyslové stavby.</p>
                <p>Proč si vybrat právě nás?</p>
                <ul>
                    <li>Více než 25 let zkušeností</li>
                    <li>Vlastní projekční kancelář</li>
                    <li>Kompletní servis od projektu po kolaudaci</li>
                    <li>Férové ceny bez skrytých poplatků</li>
                </ul>
            </div>
        </div>
        <div class="section-title"><h2>Naše služby</h2><div class="underline"></div></div>
        <div class="services-grid">
            <div class="service-card">
                <div class="service-icon"><svg viewBox="0 0 24 24"><path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z"/></svg></div>
                <h3>Rodinné domy</h3>
                <p>Výstavba rodinných domů na klíč podle vašich představ. Od projektu až po předání klíčů.</p>
            </div>
            <div class="service-card">
                <div class="service-icon"><svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg></div>
                <h3>Rekonstrukce</h3>
                <p>Kompletní rekonstrukce bytů, domů i komerčních prostor. Modernizace a zateplování.</p>
            </div>
            <div class="service-card">
                <div class="service-icon"><svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg></div>
                <h3>Průmyslové stavby</h3>
                <p>Haly, sklady, výrobní prostory. Realizace průmyslových objektů včetně inženýrských sítí.</p>
            </div>
            <div class="service-card">
                <div class="service-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/></svg></div>
                <h3>Projekce</h3>
                <p>Vlastní projekční kancelář. Zpracování projektové dokumentace a vyřízení povolení.</p>
            </div>
            <div class="service-card">
                <div class="service-icon"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg></div>
                <h3>Hrubé stavby</h3>
                <p>Základy, zdivo, stropy, střechy. Kvalitní hrubá stavba je základ každého domu.</p>
            </div>
            <div class="service-card">
                <div class="service-icon"><svg viewBox="0 0 24 24"><path d="M22 11V3h-7v3H9V3H2v8h7V8h2v10h4v3h7v-8h-7v3h-2V8h2v3z"/></svg></div>
                <h3>Dokončovací práce</h3>
                <p>Omítky, podlahy, obklady, instalace. Kompletní dokončení interiéru i exteriéru.</p>
            </div>
        </div>
        <div class="section-title"><h2>Naše reference</h2><div class="underline"></div></div>
        <div class="references">
            <div class="ref-grid">
                <div class="ref-item"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80" alt="Reference 1"></div>
                <div class="ref-item"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80" alt="Reference 2"></div>
                <div class="ref-item"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" alt="Reference 3"></div>
                <div class="ref-item"><img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80" alt="Reference 4"></div>
                <div class="ref-item"><img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80" alt="Reference 5"></div>
                <div class="ref-item"><img src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&q=80" alt="Reference 6"></div>
                <div class="ref-item"><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80" alt="Reference 7"></div>
                <div class="ref-item"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80" alt="Reference 8"></div>
            </div>
        </div>
        <div class="why-us">
            <h2>Proč si vybrat naši firmu?</h2>
            <div class="why-grid">
                <div class="why-item"><div class="check"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><p><strong>25 let na trhu</strong> - Jsme stabilní firma s dlouholetou tradicí a stovkami spokojených zákazníků.</p></div>
                <div class="why-item"><div class="check"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><p><strong>Vlastní zaměstnanci</strong> - Nepracujeme s pochybnými subdodavateli. Máme vlastní kvalifikované řemeslníky.</p></div>
                <div class="why-item"><div class="check"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><p><strong>Fixní cena</strong> - Cena v rozpočtu je konečná. Žádné skryté poplatky ani dodatečné náklady.</p></div>
                <div class="why-item"><div class="check"><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg></div><p><strong>Záruka 5 let</strong> - Na všechny naše práce poskytujeme záruku 5 let. Servis i po záruce.</p></div>
            </div>
        </div>
        <div class="section-title"><h2>Kontaktujte nás</h2><div class="underline"></div></div>
        <div class="contact-section">
            <div class="contact-info">
                <h3>Kontaktní údaje</h3>
                <div class="contact-row"><div class="contact-icon"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div><p><strong>Adresa:</strong><br>Průmyslová 123<br>702 00 Ostrava</p></div>
                <div class="contact-row"><div class="contact-icon"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg></div><p><strong>Telefon:</strong><br>+420 777 888 999</p></div>
                <div class="contact-row"><div class="contact-icon"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></div><p><strong>Email:</strong><br>info@stavomal.cz</p></div>
            </div>
            <div class="contact-form">
                <h3>Poptávkový formulář</h3>
                <div class="form-group"><label>Jméno a příjmení *</label><input type="text" placeholder="Vaše jméno"></div>
                <div class="form-group"><label>Email *</label><input type="email" placeholder="vas@email.cz"></div>
                <div class="form-group"><label>Telefon</label><input type="tel" placeholder="+420 xxx xxx xxx"></div>
                <div class="form-group"><label>Zpráva *</label><textarea placeholder="Popište váš projekt..."></textarea></div>
                <button class="btn-orange">Odeslat poptávku</button>
            </div>
        </div>
    </main>
    <footer>
        <p><strong>StavoMal s.r.o.</strong> | IČO: 12345678 | DIČ: CZ12345678</p>
        <p>Průmyslová 123, 702 00 Ostrava | Tel: +420 777 888 999</p>
        <div class="footer-links"><a href="#">Facebook</a><a href="#">Instagram</a><a href="#">Reference</a><a href="#">Kariéra</a></div>
        <p style="margin-top: 15px; font-size: 12px; color: #999;">© 2024 StavoMal s.r.o. Všechna práva vyhrazena.</p>
    </footer>
    <div class="floating-phone"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>+420 777 888 999</div>
</body>
</html>`

// After HTML (modern website) - FULL VERSION
const afterHtml = `<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MALODOM</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root { --color-bg: #FAFAF8; --color-cream: #F5F3EF; --color-sage: #9CAF93; --color-sage-light: #E8EDE6; --color-sage-dark: #7A9171; --color-dark: #1C1C1C; --color-text: #2D2D2D; --color-muted: #6B6B6B; --color-light-gray: #E5E5E5; --font-display: 'Playfair Display', Georgia, serif; --font-body: 'DM Sans', system-ui, sans-serif; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: var(--font-body); background: var(--color-bg); color: var(--color-text); line-height: 1.6; }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; padding: 1.25rem 4rem; display: flex; justify-content: space-between; align-items: center; background: transparent; transition: all 0.3s ease; }
        nav.scrolled { background: rgba(250, 250, 248, 0.95); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,0,0,0.05); }
        .logo { display: flex; align-items: center; gap: 0.5rem; }
        .logo-text { font-size: 1.1rem; font-weight: 600; letter-spacing: 0.1em; color: white; transition: color 0.3s ease; }
        nav.scrolled .logo-text { color: var(--color-dark); }
        .nav-center { display: flex; gap: 2.5rem; list-style: none; }
        .nav-center a { text-decoration: none; color: rgba(255,255,255,0.8); font-size: 0.9rem; font-weight: 500; transition: color 0.3s ease; }
        .nav-center a:hover { color: white; }
        nav.scrolled .nav-center a { color: var(--color-muted); }
        nav.scrolled .nav-center a:hover { color: var(--color-dark); }
        .nav-right { display: flex; align-items: center; gap: 1.5rem; }
        .nav-phone { font-size: 0.9rem; color: rgba(255,255,255,0.8); display: flex; align-items: center; gap: 0.5rem; transition: color 0.3s ease; }
        nav.scrolled .nav-phone { color: var(--color-muted); }
        .btn-primary { padding: 0.75rem 1.5rem; background: var(--color-sage); color: white; text-decoration: none; font-size: 0.85rem; font-weight: 500; border-radius: 4px; }
        .btn-primary:hover { background: var(--color-sage-dark); }
        .hero { min-height: 100vh; position: relative; display: flex; align-items: center; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-bg img { width: 100%; height: 100%; object-fit: cover; }
        .hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%); }
        .hero-content { position: relative; z-index: 1; max-width: 650px; padding: 0 4rem; color: white; }
        .hero-tag { display: inline-block; padding: 0.5rem 1rem; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); color: white; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; border-radius: 2px; margin-bottom: 1.5rem; border: 1px solid rgba(255,255,255,0.2); }
        .hero-title { font-family: var(--font-display); font-size: clamp(3rem, 5vw, 4.5rem); font-weight: 400; line-height: 1.1; margin-bottom: 1.5rem; }
        .hero-title em { font-style: italic; color: var(--color-sage); }
        .hero-desc { font-size: 1.15rem; color: rgba(255,255,255,0.85); line-height: 1.8; margin-bottom: 2.5rem; max-width: 500px; }
        .hero-buttons { display: flex; gap: 1rem; }
        .btn-white { display: inline-flex; align-items: center; gap: 0.75rem; padding: 1rem 2rem; background: white; color: var(--color-dark); text-decoration: none; font-size: 0.9rem; font-weight: 500; border-radius: 4px; }
        .btn-white:hover { background: var(--color-sage); color: white; }
        .btn-outline { padding: 1rem 2rem; background: transparent; color: white; text-decoration: none; font-size: 0.9rem; font-weight: 500; border: 1px solid rgba(255,255,255,0.4); border-radius: 4px; }
        .hero-stats { position: absolute; bottom: 4rem; right: 4rem; z-index: 1; display: flex; gap: 3rem; }
        .hero-stat { text-align: center; color: white; }
        .hero-stat-number { font-family: var(--font-display); font-size: 3rem; font-weight: 400; line-height: 1; }
        .hero-stat-label { font-size: 0.85rem; opacity: 0.8; margin-top: 0.5rem; }
        .stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; padding: 4rem; background: white; border-bottom: 1px solid var(--color-light-gray); }
        .stat-item { text-align: center; }
        .stat-number { font-family: var(--font-display); font-size: 3rem; font-weight: 400; color: var(--color-dark); line-height: 1; }
        .stat-label { font-size: 0.9rem; color: var(--color-muted); margin-top: 0.5rem; }
        .intro { padding: 6rem 4rem; display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
        .intro-content { max-width: 500px; }
        .section-tag { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-sage); margin-bottom: 1rem; }
        .section-title { font-family: var(--font-display); font-size: 2.5rem; font-weight: 400; color: var(--color-dark); margin-bottom: 1.5rem; line-height: 1.2; }
        .intro-text { font-size: 1rem; color: var(--color-muted); line-height: 1.9; margin-bottom: 2rem; }
        .btn-dark { display: inline-flex; align-items: center; gap: 0.75rem; padding: 1rem 2rem; background: var(--color-dark); color: white; text-decoration: none; font-size: 0.9rem; font-weight: 500; border-radius: 4px; }
        .intro-images { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .intro-img { border-radius: 8px; overflow: hidden; }
        .intro-img:first-child { grid-row: span 2; }
        .intro-img img { width: 100%; height: 100%; object-fit: cover; }
        .floorplans { padding: 6rem 4rem; background: var(--color-cream); }
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; }
        .see-all { display: flex; align-items: center; gap: 0.75rem; color: var(--color-muted); text-decoration: none; font-size: 0.9rem; font-weight: 500; }
        .see-all-count { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; background: var(--color-sage); color: white; border-radius: 4px; font-size: 0.8rem; }
        .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .plan-card { background: white; border-radius: 8px; overflow: hidden; transition: all 0.3s ease; }
        .plan-card:hover { box-shadow: 0 20px 50px rgba(0,0,0,0.08); transform: translateY(-4px); }
        .plan-image { aspect-ratio: 4/3; overflow: hidden; position: relative; }
        .plan-image img { width: 100%; height: 100%; object-fit: cover; }
        .plan-badge { position: absolute; top: 1rem; right: 1rem; padding: 0.35rem 0.75rem; background: white; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 2px; }
        .plan-info { padding: 1.5rem; }
        .plan-name { font-family: var(--font-display); font-size: 1.25rem; color: var(--color-dark); margin-bottom: 1rem; }
        .plan-specs { display: flex; gap: 1.5rem; }
        .plan-spec { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--color-muted); }
        .process { padding: 6rem 4rem; }
        .process-header { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }
        .process-intro { font-size: 1rem; color: var(--color-muted); line-height: 1.8; }
        .process-steps { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1rem; }
        .step { text-align: center; cursor: pointer; }
        .step-icon { width: 60px; height: 60px; margin: 0 auto 1rem; border: 2px solid var(--color-light-gray); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .step-icon svg { width: 24px; height: 24px; color: var(--color-muted); }
        .step.active .step-icon { border-color: var(--color-sage); background: var(--color-sage); }
        .step.active .step-icon svg { color: white; }
        .step-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-muted); }
        .step-name { font-size: 0.8rem; font-weight: 500; color: var(--color-dark); margin-top: 0.25rem; }
        .projects { padding: 6rem 4rem; background: var(--color-dark); }
        .projects .section-tag { color: var(--color-sage); }
        .projects .section-title { color: white; }
        .projects .see-all { color: rgba(255,255,255,0.6); }
        .projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
        .project-card { position: relative; border-radius: 8px; overflow: hidden; }
        .project-card:first-child { grid-row: span 2; }
        .project-img { width: 100%; height: 100%; min-height: 300px; overflow: hidden; }
        .project-img img { width: 100%; height: 100%; object-fit: cover; }
        .project-badge { position: absolute; top: 1rem; left: 1rem; padding: 0.4rem 0.8rem; background: var(--color-sage); color: white; font-size: 0.7rem; font-weight: 500; text-transform: uppercase; border-radius: 2px; }
        .project-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem; background: linear-gradient(transparent, rgba(0,0,0,0.8)); color: white; }
        .project-name { font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 0.25rem; }
        .project-location { font-size: 0.85rem; opacity: 0.8; }
        .project-specs { display: flex; gap: 1rem; margin-top: 0.75rem; font-size: 0.8rem; opacity: 0.9; }
        .contact { padding: 6rem 4rem; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
        .contact-content .section-title { margin-bottom: 2rem; }
        .contact-text { color: var(--color-muted); margin-bottom: 2rem; line-height: 1.8; }
        .contact-details { display: flex; flex-direction: column; gap: 1rem; }
        .contact-item { display: flex; align-items: center; gap: 1rem; }
        .contact-icon { width: 44px; height: 44px; background: var(--color-sage-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .contact-icon svg { width: 20px; height: 20px; color: var(--color-sage-dark); }
        .contact-item span { font-size: 0.95rem; color: var(--color-dark); }
        .contact-form-wrap { background: var(--color-cream); padding: 3rem; border-radius: 8px; }
        .contact-form-wrap h3 { font-family: var(--font-display); font-size: 1.5rem; color: var(--color-dark); margin-bottom: 2rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.85rem; color: var(--color-muted); margin-bottom: 0.5rem; }
        .form-group input, .form-group textarea { width: 100%; padding: 0.9rem 1rem; border: 1px solid var(--color-light-gray); border-radius: 4px; font-size: 0.95rem; font-family: var(--font-body); background: white; }
        .form-group textarea { height: 120px; resize: none; }
        .btn-submit { width: 100%; padding: 1rem; background: var(--color-dark); color: white; border: none; border-radius: 4px; font-size: 0.95rem; font-weight: 500; cursor: pointer; }
        footer { background: #0F0F0F; color: white; padding: 4rem; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; margin-bottom: 3rem; }
        .footer-brand p { color: rgba(255,255,255,0.6); font-size: 0.9rem; line-height: 1.7; margin-top: 1rem; }
        .footer-col h4 { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.5rem; color: rgba(255,255,255,0.9); }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 0.75rem; }
        .footer-col a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 0.9rem; }
        .footer-col a:hover { color: white; }
        .footer-bottom { padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; }
        .footer-bottom p { color: rgba(255,255,255,0.4); font-size: 0.85rem; }
        .footer-social { display: flex; gap: 1rem; }
        .footer-social a { width: 36px; height: 36px; border: 1px solid rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6); }
    </style>
</head>
<body>
    <nav id="navbar">
        <div class="logo"><span class="logo-text">MALODOM</span></div>
        <ul class="nav-center">
            <li><a href="#">Jak to funguje</a></li>
            <li><a href="#">Katalog domů</a></li>
            <li><a href="#">Realizace</a></li>
            <li><a href="#">O nás</a></li>
        </ul>
        <div class="nav-right">
            <span class="nav-phone"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>+420 777 888 999</span>
            <a href="#" class="btn-primary">Nezávazná konzultace</a>
        </div>
    </nav>
    <section class="hero">
        <div class="hero-bg"><img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=85" alt="Moderní rodinný dům"></div>
        <div class="hero-content">
            <span class="hero-tag">Rodinné domy na klíč</span>
            <h1 class="hero-title">Postavíme váš <em>vysněný</em> domov</h1>
            <p class="hero-desc">Od prvního návrhu po předání klíčů. Transparentní proces, fixní cena a 25 let zkušeností. Specializujeme se na moderní energeticky úsporné domy.</p>
            <div class="hero-buttons">
                <a href="#" class="btn-white"><span>Začít plánovat</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
                <a href="#" class="btn-outline">Prohlédnout realizace</a>
            </div>
        </div>
        <div class="hero-stats">
            <div class="hero-stat"><div class="hero-stat-number">500+</div><div class="hero-stat-label">dokončených domů</div></div>
            <div class="hero-stat"><div class="hero-stat-number">25</div><div class="hero-stat-label">let zkušeností</div></div>
            <div class="hero-stat"><div class="hero-stat-number">98%</div><div class="hero-stat-label">spokojených klientů</div></div>
        </div>
    </section>
    <section class="stats-bar">
        <div class="stat-item"><div class="stat-number">25</div><div class="stat-label">let na trhu</div></div>
        <div class="stat-item"><div class="stat-number">500+</div><div class="stat-label">dokončených projektů</div></div>
        <div class="stat-item"><div class="stat-number">98%</div><div class="stat-label">spokojených klientů</div></div>
        <div class="stat-item"><div class="stat-number">5 let</div><div class="stat-label">záruka na stavbu</div></div>
    </section>
    <section class="intro">
        <div class="intro-content">
            <div class="section-tag">Proč Malodom</div>
            <h2 class="section-title">Stavíme s transparentností a péčí o detail</h2>
            <p class="intro-text">Nabízíme kompletní transparentnost v celém procesu. Od prvního setkání vás informujeme o všech nákladech a garantujeme finální cenu. Náš tým vlastních řemeslníků zajišťuje kvalitu v každém detailu.</p>
            <p class="intro-text">Specializujeme se na energeticky úsporné domy s nízkonákladovým provozem.</p>
            <a href="#" class="btn-dark"><span>Více o nás</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
        </div>
        <div class="intro-images">
            <div class="intro-img"><img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80" alt="Dům"></div>
            <div class="intro-img"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80" alt="Interiér"></div>
            <div class="intro-img"><img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80" alt="Detail"></div>
        </div>
    </section>
    <section class="floorplans">
        <div class="section-header">
            <div><div class="section-tag">Vyberte si projekt</div><h2 class="section-title">Katalog typových domů</h2></div>
            <a href="#" class="see-all">Zobrazit vše<span class="see-all-count">30</span></a>
        </div>
        <div class="plans-grid">
            <div class="plan-card">
                <div class="plan-image"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80" alt="Dům 1"></div>
                <div class="plan-info"><h3 class="plan-name">MALODOM 4+kk 120m²</h3><div class="plan-specs"><span class="plan-spec">120 m²</span><span class="plan-spec">4 pokoje</span><span class="plan-spec">2 koupelny</span></div></div>
            </div>
            <div class="plan-card">
                <div class="plan-image"><span class="plan-badge">Populární</span><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Dům 2"></div>
                <div class="plan-info"><h3 class="plan-name">MALODOM 5+kk 145m²</h3><div class="plan-specs"><span class="plan-spec">145 m²</span><span class="plan-spec">5 pokojů</span><span class="plan-spec">2 koupelny</span></div></div>
            </div>
            <div class="plan-card">
                <div class="plan-image"><span class="plan-badge">Novinka</span><img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80" alt="Dům 3"></div>
                <div class="plan-info"><h3 class="plan-name">MALODOM 3+kk 95m²</h3><div class="plan-specs"><span class="plan-spec">95 m²</span><span class="plan-spec">3 pokoje</span><span class="plan-spec">1 koupelna</span></div></div>
            </div>
        </div>
    </section>
    <section class="process">
        <div class="process-header">
            <div><div class="section-tag">Jak to funguje</div><h2 class="section-title">Proces stavby</h2></div>
            <p class="process-intro">Klienti k nám přicházejí ve všech fázích svého projektu. Vyberte si fázi, kde se právě nacházíte.</p>
        </div>
        <div class="process-steps">
            <div class="step active"><div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div><div class="step-label">Krok 1</div><div class="step-name">Konzultace</div></div>
            <div class="step"><div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></div><div class="step-label">Krok 2</div><div class="step-name">Návrh</div></div>
            <div class="step"><div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg></div><div class="step-label">Krok 3</div><div class="step-name">Smlouva</div></div>
            <div class="step"><div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div><div class="step-label">Krok 4</div><div class="step-name">Povolení</div></div>
            <div class="step"><div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></div><div class="step-label">Krok 5</div><div class="step-name">Stavba</div></div>
            <div class="step"><div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg></div><div class="step-label">Krok 6</div><div class="step-name">Dokončení</div></div>
            <div class="step"><div class="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777z"/></svg></div><div class="step-label">Krok 7</div><div class="step-name">Předání</div></div>
        </div>
    </section>
    <section class="projects">
        <div class="section-header">
            <div><div class="section-tag">Naše práce</div><h2 class="section-title">Realizované projekty</h2></div>
            <a href="#" class="see-all">Zobrazit vše<span class="see-all-count">48</span></a>
        </div>
        <div class="projects-grid">
            <div class="project-card">
                <div class="project-img"><img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80" alt="Projekt 1"></div>
                <span class="project-badge">Doporučujeme</span>
                <div class="project-info"><h4 class="project-name">Rodinný dům Štramberk</h4><p class="project-location">Štramberk, Moravskoslezský kraj</p><div class="project-specs"><span>145 m²</span><span>•</span><span>5+kk</span></div></div>
            </div>
            <div class="project-card">
                <div class="project-img"><img src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80" alt="Projekt 2"></div>
                <div class="project-info"><h4 class="project-name">Moderní bungalov</h4><p class="project-location">Frýdek-Místek</p></div>
            </div>
            <div class="project-card">
                <div class="project-img"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" alt="Projekt 3"></div>
                <div class="project-info"><h4 class="project-name">Pasivní dům</h4><p class="project-location">Ostrava-Poruba</p></div>
            </div>
        </div>
    </section>
    <section class="contact">
        <div class="contact-content">
            <div class="section-tag">Kontakt</div>
            <h2 class="section-title">Začněme plánovat váš nový domov</h2>
            <p class="contact-text">Máte dotaz nebo chcete nezávaznou konzultaci? Napište nám nebo zavolejte. Odpovíme do 24 hodin.</p>
            <div class="contact-details">
                <div class="contact-item"><div class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span>Průmyslová 123, 702 00 Ostrava</span></div>
                <div class="contact-item"><div class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></div><span>+420 777 888 999</span></div>
                <div class="contact-item"><div class="contact-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg></div><span>info@malodom.cz</span></div>
            </div>
        </div>
        <div class="contact-form-wrap">
            <h3>Nezávazná poptávka</h3>
            <form>
                <div class="form-row"><div class="form-group"><label>Jméno</label><input type="text" placeholder="Vaše jméno"></div><div class="form-group"><label>Telefon</label><input type="tel" placeholder="+420"></div></div>
                <div class="form-group"><label>Email</label><input type="email" placeholder="vas@email.cz"></div>
                <div class="form-group"><label>Zpráva</label><textarea placeholder="Popište váš projekt..."></textarea></div>
                <button type="submit" class="btn-submit">Odeslat poptávku</button>
            </form>
        </div>
    </section>
    <footer>
        <div class="footer-grid">
            <div class="footer-brand"><div class="logo"><span class="logo-text" style="color: white;">MALODOM</span></div><p>Stavíme moderní rodinné domy s důrazem na kvalitu, energetickou úspornost a spokojenost klientů.</p></div>
            <div class="footer-col"><h4>Nabídka</h4><ul><li><a href="#">Typové domy</a></li><li><a href="#">Individuální projekty</a></li><li><a href="#">Rekonstrukce</a></li><li><a href="#">Ceník</a></li></ul></div>
            <div class="footer-col"><h4>Firma</h4><ul><li><a href="#">O nás</a></li><li><a href="#">Realizace</a></li><li><a href="#">Blog</a></li><li><a href="#">Kariéra</a></li></ul></div>
            <div class="footer-col"><h4>Kontakt</h4><ul><li><a href="#">+420 777 888 999</a></li><li><a href="#">info@malodom.cz</a></li><li><a href="#">Ostrava</a></li></ul></div>
        </div>
        <div class="footer-bottom">
            <p>© 2024 MALODOM s.r.o. Všechna práva vyhrazena.</p>
            <div class="footer-social"><a href="#">FB</a><a href="#">IG</a><a href="#">LI</a></div>
        </div>
    </footer>
    <script>
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    </script>
</body>
</html>`

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const browserRef = useRef<HTMLDivElement>(null)
  const beforeIframeRef = useRef<HTMLIFrameElement>(null)
  const afterIframeRef = useRef<HTMLIFrameElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percentage = (x / rect.width) * 100
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  // Handle closing interactive mode
  const closeInteractive = useCallback(() => {
    setIsInteractive(false)
    // Reset slider to center
    setSliderPosition(50)
    // Reset iframe scrolls to top (hero section of embedded websites)
    try {
      if (beforeIframeRef.current?.contentWindow) {
        beforeIframeRef.current.contentWindow.scrollTo({ top: 0, behavior: 'smooth' })
      }
      if (afterIframeRef.current?.contentWindow) {
        afterIframeRef.current.contentWindow.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (e) {
      // Ignore cross-origin errors
    }
  }, [])

  // Disable body scroll and center element when interactive
  useEffect(() => {
    if (isInteractive) {
      // First scroll to center, then disable scroll
      if (browserRef.current) {
        browserRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      // Small delay to let scroll complete before locking
      setTimeout(() => {
        document.body.style.overflow = 'hidden'
      }, 300)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isInteractive])

  return (
    <>
      {/* Dark backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${isInteractive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeInteractive}
      />

      {/* Close button - only visible when interactive */}
      {isInteractive && (
        <button
          onClick={closeInteractive}
          className="fixed top-4 right-4 lg:top-6 lg:right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-[60]"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      )}

      <section className="py-32 px-6 lg:px-12 mx-4 lg:mx-8 bg-white rounded-[40px]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Transformace</SectionLabel>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight mb-6">
              Před a po
            </h2>
            <p className="text-lg text-muted max-w-[500px] mb-16">
              Podívejte se, jak měníme zastaralé weby v moderní digitální zážitky.
            </p>
          </motion.div>

          {/* Browser Mockup Container */}
          <div
            ref={browserRef}
            className={`bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-300 ${isInteractive ? 'relative z-50 scale-[1.02] shadow-[0_25px_80px_rgba(0,0,0,0.5)]' : ''}`}
          >
            {/* Browser Chrome */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-lg px-4 py-1.5 text-xs text-gray-500 border border-gray-200 w-64 text-center">
                  www.stavomal.cz → www.malodom.cz
                </div>
              </div>
              <div className="w-16" />
            </div>

            {/* Comparison slider */}
            <div
              ref={containerRef}
              className="relative cursor-ew-resize select-none"
              onMouseDown={(e) => {
                if ((e.target as HTMLElement).closest('[data-click-overlay]')) return
                handleMouseDown()
              }}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {/* Before - Old website (iframe) */}
              <div className="relative h-[500px] lg:h-[600px]">
                <iframe
                  ref={beforeIframeRef}
                  srcDoc={beforeHtml}
                  className="w-full h-full border-0"
                  title="Before website"
                  sandbox="allow-same-origin allow-scripts"
                  style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
                />
              </div>

              {/* After - Modern website (iframe) - clipped */}
              <div
                className="absolute inset-0 overflow-hidden border-r-[3px] border-white"
                style={{ width: `${sliderPosition}%` }}
              >
                <div
                  className="h-full"
                  style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100vw' }}
                >
                  <iframe
                    ref={afterIframeRef}
                    srcDoc={afterHtml}
                    className="w-full h-full border-0"
                    title="After website"
                    sandbox="allow-same-origin allow-scripts"
                    style={{ pointerEvents: isInteractive ? 'auto' : 'none' }}
                  />
                </div>
              </div>

              {/* Click to interact overlay */}
              {!isInteractive && !isDragging && (
                <div
                  data-click-overlay
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors cursor-pointer group"
                  onClick={() => setIsInteractive(true)}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium text-gray-700">
                    <MousePointer className="w-4 h-4" />
                    Klikněte pro interakci
                  </div>
                </div>
              )}

              {/* Overlay during drag */}
              {isDragging && <div className="absolute inset-0 z-10" />}

              {/* Handle */}
              <div
                className="absolute top-0 bottom-0 flex items-center justify-center pointer-events-none z-30"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] border border-gray-100 pointer-events-auto cursor-ew-resize">
                  <MoveHorizontal className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="flex justify-between mt-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted">
              <span className="w-3 h-3 rounded-full bg-orange-500" />
              Původní web
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted">
              <span className="w-3 h-3 rounded-full bg-accent-green" />
              Moderní redesign
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
