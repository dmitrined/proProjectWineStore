"use client";
/**
 * Назначение файла: Система международной локализации (i18n).
 * Зависимости: React Context.
 * Особенности: Client Component, поддержка DE (немецкий) и EN (английский), сохранение выбора в localStorage.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Доступные языки
type Language = 'de' | 'en';

/**
 * Интерфейс словаря переводов.
 */
interface Translations {
    [key: string]: {
        de: string;
        en: string;
    };
}

// Словарь строк для всех разделов интерфейса
const translations: Translations = {
    // Header & Nav (Навигация и верхняя панель)
    nav_catalog: { de: "Katalog", en: "Catalog" },
    nav_red_wines: { de: "Rotwein", en: "Red Wine" },
    nav_white_wines: { de: "Weißwein", en: "White Wine" },
    nav_shop: { de: "Shop", en: "Shop" },
    nav_our_vineyards: { de: "Unsere Weinberge", en: "Our Vineyards" },
    nav_contact: { de: "Kontakt", en: "Contact" },
    nav_events: { de: "Events", en: "Events" },
    nav_about_us: { de: "Über uns", en: "About Us" },
    about_we_about_us: { de: "Wir über uns", en: "Who We Are" },
    about_team: { de: "Unser Team", en: "Our Team" },
    about_impressions: { de: "Impressionen", en: "Impressions" },
    about_next_generation: { de: "next Generation", en: "Next Generation" },
    about_awards: { de: "Ausgezeichnet", en: "Awards" },
    about_worth_reading: { de: "Lesenswert", en: "Worth Reading" },
    about_partners: { de: "Unsere Partner", en: "Our Partners" },
    about_business_vfb: { de: "Businesspartner VfB Stuttgart", en: "Business Partner VfB Stuttgart" },
    contact_info_hours: { de: "Kontakte & Öffnungszeiten", en: "Contacts & Opening Hours" },
    contact_directions: { de: "Anfahrt", en: "Directions" },
    contact_jobs: { de: "Jobs", en: "Jobs" },
    nav_all_wines: { de: "Alle Weine", en: "All Wines" },
    nav_all_events: { de: "Alle Events", en: "All Events" },
    nav_loyalty: { de: "Loyalität", en: "Loyalty" },
    nav_shop_federle: { de: "Federle", en: "Federle" },
    nav_shop_vfb: { de: "Edition VfB Stuttgart", en: "Edition VfB Stuttgart" },
    nav_shop_packages: { de: "Weinpakete", en: "Wine Packages" },
    nav_shop_alles_gewoehnlich: { de: "Alles außer gewöhnlich", en: "Anything but ordinary" },
    nav_shop_vouchers: { de: "Gutscheine", en: "Vouchers" },
    nav_shop_presents: { de: "Weingeschenke, Geschenksets", en: "Wine Gifts & Gift Sets" },
    nav_profile: { de: "Profil", en: "Profile" },
    nav_dashboard: { de: "Dashboard", en: "Dashboard" },
    nav_logout: { de: "Abmelden", en: "Logout" },
    promo_shipping: { de: "Premium Versand in ganz Europa", en: "Premium Shipping across Europe" },
    search_placeholder: { de: "FINDE DEINEN WEIN...", en: "FIND A BOTTLE..." },
    search_input_placeholder: { de: "Suche nach Name...", en: "Search by name..." },
    collections: { de: "Kollektionen", en: "Collections" },
    support_info: { de: "Support & Info", en: "Support & Info" },
    shipping_info: { de: "Versandinformationen", en: "Shipping Information" },
    gift_cards: { de: "Geschenkkarten", en: "Gift Cards" },
    find_us: { de: "Finde uns", en: "Find Us" },
    bottom_nav_home: { de: "Home", en: "Home" },
    bottom_nav_shop: { de: "Shop", en: "Shop" },
    bottom_nav_events: { de: "Events", en: "Events" },
    bottom_nav_cart: { de: "Warenkorb", en: "Cart" },
    bottom_nav_profile: { de: "Konto", en: "Account" },
    select_language: { de: "Sprache wählen", en: "Select Language" },
    bottom_nav_more: { de: "Mehr", en: "More" },
    bottom_nav_mycode: { de: "MyCode", en: "MyCode" },




    // Home Page (Главная страница)
    hero_title_1: { de: "Tradition", en: "Tradition" },
    hero_title_2: { de: "Neu definiert.", en: "Redefined." },
    hero_subtitle: { de: "Erleben Sie die Exzellenz der Fellbacher Weingärtner. Eine kuratierte Kollektion preisgekrönter Weine, geliefert mit Leidenschaft und Präzision.", en: "Experience the excellence of Fellbacher Weingärtner. A curated collection of award-winning wines, delivered with passion and precision." },
    hero_cta: { de: "Kollektion Entdecken", en: "Explore Collection" },
    hero_secondary_cta: { de: "Über Uns", en: "About Us" },

    // Cart (Корзина)
    cart_title: { de: "Warenkorb", en: "Shopping Cart" },
    cart_empty: { de: "Ihr Warenkorb ist leer", en: "Your cart is empty" },
    cart_total: { de: "Gesamt", en: "Total" },
    cart_checkout: { de: "Zur Kasse", en: "Checkout" },
    add_to_cart: { de: "In den Warenkorb", en: "Add to Cart" },
    added_to_cart: { de: "Hinzugefügt", en: "Added" },
    featured_title: { de: "Exklusive Auswahl", en: "Featured Selection" },
    featured_subtitle: { de: "Die Wahl unserer Sommeliers für diese Saison. Handverlesen, hoch bewertet und außergewöhnlich verarbeitet.", en: "Our sommelier's choice for this season. Hand-picked, highly rated, and exceptionally crafted." },
    view_all: { de: "Alle Weine anzeigen", en: "View All Wines" },
    feature_quality_title: { de: "Premium Qualität", en: "Premium Quality" },
    feature_quality_desc: { de: "Preisgekrönte Weine mit einer Durchschnittsbewertung von 4,5+ Sternen.", en: "Award-winning wines with an average rating of 4.5+ stars." },
    feature_curation_title: { de: "Experten-Kuration", en: "Expert Curation" },
    feature_curation_desc: { de: "Jede Flasche wird von unseren Kellermeistern auf Echtheit geprüft.", en: "Every bottle is verified by our master cellarmen for authenticity." },
    feature_delivery_title: { de: "Schnelle Lieferung", en: "Fast Delivery" },
    feature_delivery_desc: { de: "Sichere Verpackung und schneller Transport in ganz Europa.", en: "Secure packaging and rapid transit across Europe." },
    type_red: { de: "Edle Rotweine", en: "Fine Red Wines" },
    type_white: { de: "Frische Weißweine", en: "Crisp White Wines" },
    type_rose: { de: "Fruchtige Roséweine", en: "Fruity Rosé Wines" },
    type_sparkling: { de: "Prickelnder Sekt", en: "Sparkling Sekt" },
    type_alcohol_free: { de: "Alkoholfreier Genuss", en: "Alcohol-Free Pleasure" },

    // Catalog Page (Каталог)
    catalog_title: { de: "Der Katalog", en: "The Catalog" },
    catalog_subtitle: { de: "Entdecken Sie unsere kuratierte Auswahl an Fellbacher Weinen. Von kräftigen Rotweinen bis hin zu spritzigen Weißweinen.", en: "Explore our curated selection of Fellbacher wines. From bold reds to crisp whites, find the perfect bottle for every occasion." },
    sort_price_low: { de: "Preis: Günstig zuerst", en: "Price: Low-High" },
    sort_price_high: { de: "Preis: Teuer zuerst", en: "Price: High-Low" },
    sort_newest: { de: "Neueste zuerst", en: "Newest First" },
    showing_wines: { de: "Ergebnisse: {count}", en: "Results: {count}" },
    no_wines_found: { de: "Keine Weine gefunden", en: "No wines found" },
    adjust_filters: { de: "Versuchen Sie, Ihre Filter или Suchbegriffe anzupassen.", en: "Try adjusting your filters or search terms." },
    clear_filters: { de: "Alle Filter löschen", en: "Clear all filters" },
    filter_clear_all: { de: "Alle Filter löschen", en: "Clear all filters" },

    // Filters & Sorting (Фильтры и сортировка)
    filter_category: { de: "Kategorie", en: "Category" },
    filter_grape: { de: "Rebsorte", en: "Grape Variety" },
    filter_tag: { de: "Schlagwort", en: "Tag" },
    filter_year: { de: "Jahrgang", en: "Vintage" },
    filter_price: { de: "Preis", en: "Price" },
    product_type: { de: "Typ", en: "Type" },
    product_sku: { de: "Art.-Nr.", en: "SKU" },
    product_tax_inc: { de: "Enthält 19% MwSt.", en: "Includes 19% VAT" },
    product_shipping_extra: { de: "zzgl. Versand", en: "plus shipping" },
    product_delivery_time: { de: "Lieferzeit: ca. 4-5 Werktage", en: "Delivery: approx. 4-5 working days" },
    product_non_eu_disclaimer: { de: "Bei Lieferungen in Nicht-EU-Länder können zusätzliche Zölle, Steuern und Gebühren anfallen.", en: "For deliveries to non-EU countries, additional duties, taxes and fees may apply." },
    product_in_stock: { de: "Vorrätig", en: "In stock" },
    product_out_of_stock: { de: "Nicht vorrätig", en: "Out of stock" },
    product_ingredients: { de: "Zutaten und Nährwerte", en: "Ingredients and Nutritional Values" },
    product_description: { de: "Beschreibung", en: "Description" },
    product_additional_info: { de: "Zusätzliche Information", en: "Additional Information" },
    product_characteristics: { de: "Weinbeschreibung", en: "Wine Description" },
    product_contains_sulfites: { de: "Enthält Sulfite", en: "Contains sulfites" },
    product_ap_number: { de: "AP-Nummer", en: "AP number" },
    product_unit_price: { de: "/ 1 L", en: "/ 1 L" },
    sort_by: { de: "Sortieren nach", en: "Sort by" },
    sort_relevance: { de: "Relevanz", en: "Relevance" },
    sort_price_asc: { de: "Preis aufsteigend", en: "Price Ascending" },
    sort_price_desc: { de: "Preis absteigend", en: "Price Descending" },
    product_characteristic_grape: { de: "Rebsorte", en: "Grape Variety" },
    product_characteristic_flavor: { de: "Geschmack", en: "Flavor" },
    stats_sugar: { de: "Restzucker", en: "Residual Sugar" },
    stats_acidity: { de: "Säure", en: "Acidity" },
    product_characteristic_temp: { de: "Trinktemperatur", en: "Drinking Temperature" },
    product_characteristic_location: { de: "Lage / Herkunft", en: "Location / Origin" },
    product_characteristic_producer: { de: "Erzeuger", en: "Producer" },
    product_characteristic_quality: { de: "Qualitätsstufe", en: "Quality Level" },
    product_characteristic_soil: { de: "Bodenart", en: "Soil Type" },
    flavor_feinherb: { de: "Feinherb", en: "Off-dry" },
    flavor_fruchtig: { de: "Fruchtig", en: "Fruity" },
    flavor_trocken: { de: "Trocken", en: "Dry" },
    quality_edition_c: { de: "Edition >C<", en: "Edition >C<" },
    quality_edition_p: { de: "Edition >P<", en: "Edition >P<" },
    quality_edition_s: { de: "Edition >S<", en: "Edition >S<" },
    quality_literweine: { de: "Literweine", en: "Litre Wines" },
    premium_price: { de: "PREMIUM-PREIS", en: "PREMIUM PRICE" },
    // sort_newest already exists above
    filters_title: { de: "Filter", en: "Filters" },
    results_count: { de: "{count} Weine", en: "{count} Wines" },
    stock_instock: { de: "Verfügbar", en: "In Stock" },
    stock_outofstock: { de: "Ausverkauft", en: "Out of Stock" },

    // Detail Page (Детали вина)
    back_to_collection: { de: "Zurück zur Kollektion", en: "Back to collection" },
    experience_title: { de: "Das Erlebnis", en: "The Experience" },
    experience_desc: { de: "Dieser außergewöhnliche Jahrgang der Fellbacher Weingärtner repräsentiert den Gipfel unserer Handwerkskunst. Erwarten Sie ein ausgewogenes Profil, das das Terroir der Region Goldberg ehrt.", en: "This exceptional vintage from Fellbacher Weingärtner represents the pinnacle of our craftsmanship. Expect a balanced profile that honors the terroir of the Goldberg region." },
    stats_alcohol: { de: "Alkohol", en: "Alcohol" },

    // About Us Page (Wir über uns)
    about_hero_subtitle: { de: "Unsere Geschichte", en: "Our Story" },
    about_hero_title: { de: "Gemeinsam für Qualität", en: "United for Quality" },
    about_hero_desc: { de: "Die Fellbacher Weingärtner eG steht für Tradition, die seit 1858 gepflegt wird. Wir verbinden handwerkliche Perfektion mit moderner Kellertechnik.", en: "Fellbacher Weingärtner eG stands for tradition maintained since 1858. We combine artisanal perfection with modern cellar technology." },
    about_quote: { de: "Wein ist Poesie in Flaschen.", en: "Wine is bottled poetry." },
    about_history_title: { de: "Unsere Wurzeln", en: "Our Roots" },
    about_history_text: { de: "Gegründet im Jahr 1858, sind wir eine der ältesten Genossenschaften der Region. Unsere Mitglieder bewirtschaften mit Leidenschaft die Weinberge am Kappelberg.", en: "Founded in 1858, we are one of the oldest cooperatives in the region. Our members cultivate the vineyards on the Kappelberg with passion." },
    about_philosophy_title: { de: "Unsere Philosophie", en: "Our Philosophy" },
    about_philosophy_text: { de: "Qualität entsteht im Weinberg. Durch nachhaltigen Anbau und schonende Verarbeitung schaffen wir Weine mit Charakter und Tiefe.", en: "Quality originates in the vineyard. Through sustainable cultivation and gentle processing, we create wines with character and depth." },

    about_stats_members: { de: "Mitglieder", en: "Members" },
    about_stats_hectares: { de: "Rebfläche", en: "Vineyards" },
    about_stats_awards: { de: "Auszeichnungen", en: "Awards" },
    about_stats_tradition: { de: "Gegründet", en: "Founded" },

    about_values_title: { de: "Was uns antreibt", en: "What Drives Us" },
    about_values_subtitle: { de: "Drei Säulen unseres Erfolgs", en: "Three pillars of our success" },
    about_value_1_title: { de: "Gemeinschaft", en: "Community" },
    about_value_1_desc: { de: "Als Genossenschaft stehen wir füreinander ein. Jeder Winzer ist Teil einer großen Familie.", en: "As a cooperative, we stand up for each other. Every winemaker is part of a big family." },
    about_value_2_title: { de: "Qualität", en: "Quality" },
    about_value_2_desc: { de: "Keine Kompromisse. Von der Rebe bis ins Glas streben wir nach Höchstleistung.", en: "No compromises. From the vine to the glass, we strive for excellence." },
    about_value_3_title: { de: "Nachhaltigkeit", en: "Sustainability" },
    about_value_3_desc: { de: "Wir pflegen unsere Kulturlandschaft für kommende Generationen.", en: "We cultivate our cultural landscape for future generations." },
    quality_guarantee: { de: "AUTHENTISCHE FELLBACHER QUALITÄT GARANTIERT", en: "AUTHENTIC FELLBACHER QUALITY GUARANTEED" },

    // Auth (Авторизация)
    login_title: { de: "Willkommen zurück", en: "Welcome Back" },
    login_subtitle: { de: "Melden Sie sich an, um auf Ihr Konto zuzugreifen", en: "Sign in to access your account" },
    register_title: { de: "Konto erstellen", en: "Create Account" },
    register_subtitle: { de: "Werden Sie Teil unserer Wein-Community", en: "Join our wine community" },
    auth_email_placeholder: { de: "E-Mail-Adresse", en: "Email Address" },
    auth_password_placeholder: { de: "Passwort", en: "Password" },
    auth_confirm_password_placeholder: { de: "Passwort подтвердить", en: "Confirm Password" },
    auth_name_placeholder: { de: "Vollständiger Name", en: "Full Name" },
    login_button: { de: "Anmelden", en: "Sign In" },
    register_button: { de: "Registrieren", en: "Register" },
    auth_toggle_register: { de: "Noch kein Konto? Registrieren", en: "Don't have an account? Register" },
    auth_toggle_login: { de: "Bereits ein Konto? Anmelden", en: "Already have an account? Login" },
    password_strength: { de: "Passwortstärke", en: "Password Strength" },
    strength_weak: { de: "Schwach", en: "Weak" },
    strength_medium: { de: "Mittel", en: "Medium" },
    strength_strong: { de: "Stark", en: "Strong" },
    social_login_with: { de: "Oder weiter mit", en: "Or continue with" },
    passwords_not_matching: { de: "Passwörter stimmen nicht überein", en: "Passwords do not match" },

    // Our Team Page (Unser Team)
    team_hero_title: { de: "Unser Team", en: "Our Team" },
    team_hero_subtitle: { de: "Die Menschen hinter dem Wein", en: "The People Behind the Wine" },
    team_hero_desc: { de: "Lernen Sie die Experten kennen, die mit Leidenschaft und Hingabe für die Qualität unserer Weine sorgen.", en: "Meet the experts who ensure the quality of our wines with passion and dedication." },
    team_role_mng: { de: "Geschäftsführung", en: "Management" },
    team_role_winemaker: { de: "Kellermeister", en: "Winemaker" },
    team_role_sales: { de: "Vertrieb", en: "Sales" },
    team_role_marketing: { de: "Marketing", en: "Marketing" },
    team_contact_phone: { de: "Tel", en: "Phone" },
    team_contact_email: { de: "E-Mail", en: "Email" },
    team_photo_coming_soon: { de: "Foto folgt bald", en: "Photo coming soon" },

    // Next Generation Page (Следующее поколение)
    next_gen_hero_title: { de: "Junge Winzer Weine", en: "Young Winemaker Wines" },
    next_gen_hero_subtitle: { de: "Die Jungwinzerkooperation “next Generation” der Fellbacher Weingärtner eG", en: "The young winemaker cooperation “next generation” of Fellbacher Weingärtner eG" },

    next_gen_wer_title: { de: "Wer?", en: "Who?" },
    next_gen_wer_text: {
        de: "Die Jungwinzerkooperation next generation ist ein Zusammenschluss von jungen Mitgliedern der Fellbacher Weingärtner eG im Haupt- und Nebenerwerb. Schon 2007 gegründet, ist die Gruppe bereits in der dritten Generation unterwegs. Die jungen Wilden können auf einen großen Erfahrungsschatz verschiedener Berufsgruppen und Ausbildungswege, sowie dem Know How der eigenen Familienmitglieder zurückgreifen.",
        en: "The young winemaker cooperation next generation is an association of young members of the Fellbacher Weingärtner eG in full-time and part-time employment. Founded in 2007, the group is already in its third generation. The young savages can draw on a wealth of experience from various professional groups and training paths, as well as the know-how of their own family members."
    },

    next_gen_was_title: { de: "Was?", en: "What?" },
    next_gen_was_text: {
        de: "Für Mitglieder endet meist die aktive Weinherstellung an der Traubenannahme. Doch das war den Jungwinzern nicht genug. In regelmäßigen Treffen tauscht man sich über aktuelle Arbeiten im Weinberg aus, bringt sich aktiv bei der Weinbereitung nach der Lese mit ein und unterstützt das Team der Fellbacher Weingärtner bei der Vermarktung der Weine. Der ›Riesling next generation trocken‹ ist von Beginn an gesetzt und schließt eine Lücke im Sortiment der Genossenschaft mit einem leichtfüßigen, filigranen Riesling. Der Wein spricht mit seiner Frucht und Finesse besonders auch jüngere Weintrinker an. Um das Gelernte und Gehörte selbst auszuprobieren folgten und folgen auch Projekte wie ein Roséwein, die Herstellung eines Pétillant Naturel und auch ein Sekt nach klassischer Flaschengärung – echte junge Winzer Weine.",
        en: "For members, active winemaking usually ends at grape reception. But that wasn't enough for the young winemakers. In regular meetings, they exchange views on current work in the vineyard, actively participate in winemaking after the harvest, and support the Fellbacher Weingärtner team in marketing the wines. The 'Riesling next generation dry' has been set from the beginning and closes a gap in the cooperative's range with a light-footed, filigree Riesling. The wine appeals especially to younger wine drinkers with its fruit and finesse. To try out what they have learned and heard themselves, projects such as a rosé wine, the production of a Petillant Naturel, and also a sparkling wine according to classic bottle fermentation followed – real young winemaker wines."
    },

    next_gen_wo_title: { de: "Wo?", en: "Where?" },
    next_gen_wo_text: {
        de: "In Fellbach aufgewachsen und bei quasi jeder Weinlese dabei, war es für die jungen Mitglieder selbstverständlich auch in die Geschäfte der Genossenschaft hinein zu schnuppern und aktiv mitzuwirken. Die Leidenschaft zu Wein, die Verbundenheit zur Fellbacher Heimat und der Wille -Wein auch jüngerem Publikum zugänglich zu machen- zeichnet next generation aus. Damit setzen sie ein starkes Zeichen für moderne Weine aus der Region.",
        en: "Growing up in Fellbach and present at almost every grape harvest, it was natural for the young members to get a taste of the cooperative's business and actively participate. The passion for wine, the connection to the Fellbach homeland, and the will to make wine accessible to a younger audience characterize next generation. Thus, they set a strong sign for modern wines from the region."
    },

    // Dashboard (Личный кабинет)
    dashboard_title: { de: "Mein Konto", en: "My Account" },
    dashboard_welcome: { de: "Willkommen zurück", en: "Welcome back" },
    tab_orders: { de: "Bestellungen", en: "Orders" },
    tab_wishlist: { de: "Wunschliste", en: "Wishlist" },
    tab_profile: { de: "Profil", en: "Profile" },
    tab_cart: { de: "Warenkorb", en: "Cart" },
    no_orders: { de: "Keine Bestellungen gefunden", en: "No orders found" },
    order_id: { de: "Bestellung", en: "Order" },
    order_date: { de: "Datum", en: "Date" },
    order_total: { de: "Gesamt", en: "Total" },
    order_status: { de: "Status", en: "Status" },
    view_details: { de: "Details anzeigen", en: "View Details" },
    logout_confirm: { de: "Möchten Sie sich wirklich abmelden?", en: "Are you sure you want to logout?" },

    // Footer (Подвал)
    footer_shop: { de: "Shop", en: "Shop" },
    footer_help: { de: "Hilfe", en: "Help" },
    footer_company: { de: "Unternehmen", en: "Company" },
    footer_all_wines: { de: "Alle Weine", en: "All Wines" },
    footer_new_arrivals: { de: "Neuheiten", en: "New Arrivals" },
    footer_bestsellers: { de: "Bestseller", en: "Bestsellers" },
    footer_contact_us: { de: "Kontaktieren Sie uns", en: "Contact Us" },
    footer_shipping: { de: "Versand", en: "Shipping" },
    footer_returns: { de: "Rückgabe", en: "Returns" },
    footer_about_us: { de: "Über uns", en: "About Us" },
    footer_careers: { de: "Karriere", en: "Careers" },
    footer_privacy: { de: "Datenschutz", en: "Privacy Policy" },
    footer_desc: { de: "Ihr traditionsreiches Weingut aus Fellbach.", en: "Your tradition-rich winery from Fellbach." },
    footer_contact_title: { de: "KONTAKT", en: "CONTACT" },
    footer_address: { de: "Kappelbergstraße 48 – 70734 Fellbach", en: "Kappelbergstraße 48 – 70734 Fellbach" },
    footer_phone_label: { de: "Fon", en: "Phone" },
    footer_fax_label: { de: "Fax", en: "Fax" },
    footer_phone_value: { de: "0711 57 88 03-0", en: "+49 711 57 88 03-0" },
    footer_fax_value: { de: "0711 57 88 03 -40", en: "+49 711 57 88 03 -40" },
    footer_email: { de: "info@fellbacher-weine.de", en: "info@fellbacher-weine.de" },
    footer_directions: { de: "Zur ausführlichen Anfahrtsbeschreibung", en: "Get detailed directions" },
    footer_opening_hours_title: { de: "ÖFFNUNGSZEITEN", en: "OPENING HOURS" },
    footer_sales_tasting_label: { de: "Verkauf & Verkostung", en: "Wine Shop & Tasting" },
    footer_sales_tasting_hours: { de: "Mo – Sa 9.00 Uhr – 18.30 Uhr", en: "Mon – Sat 9:00 AM – 6:30 PM" },
    footer_office_label: { de: "Bürozeiten", en: "Office Hours" },
    footer_office_hours: { de: "Mo – Fr 8.00 Uhr – 17.00 Uhr", en: "Mon – Fri 8:00 AM – 5:00 PM" },

    // Loyalty System (Программа лояльности)
    loyalty_title: { de: "Genuss-Punkte Programm", en: "Rewards & Loyalty" },
    loyalty_subtitle: { de: "Sammeln Sie Punkte bei jedem Einkauf und sichern Sie sich exklusive Prämien.", en: "Collect points with every purchase and secure exclusive rewards." },
    loyalty_points_balance: { de: "Ihr Punktestand", en: "Your Points Balance" },
    loyalty_scan_qr: { de: "QR-Code scannen", en: "Scan QR Code" },
    loyalty_rewards: { de: "Verfügbare Prämien", en: "Available Rewards" },
    loyalty_tier_silver: { de: "Silber-Status", en: "Silver Status" },
    loyalty_tier_gold: { de: "Gold-Status", en: "Gold Status" },

    // Events Page (События)
    events_title: { de: "Veranstaltungen & Termine", en: "Events & Appointments" },
    events_subtitle: { de: "Erleben Sie die Welt der Fellbacher Weine hautnah.", en: "Experience the world of Fellbacher wines up close." },
    discover_and_experience: { de: "Entdecken & Erleben", en: "Discover & Experience" },
    events_register: { de: "Jetzt anmelden", en: "Register Now" },
    events_date: { de: "Datum", en: "Date" },
    events_location: { de: "Ort", en: "Location" },
    events_all_events: { de: "Alle Events", en: "All Events" },
    event_kellerblicke: { de: "Kellerblicke", en: "Cellar Views" },
    event_weinfeste: { de: "Weinfeste", en: "Wine Festivals" },
    event_weinproben: { de: "Weinproben", en: "Wine Tastings" },
    event_weintreff: { de: "Weintreff", en: "Wine Meetup" },
    event_afterwork: { de: "Afterwork", en: "Afterwork" },
    event_wein_weiter: { de: "Wein & Weiter", en: "Wine & More" },
    event_wein_raetsel_tour: { de: "Wein(Rätsel)Tour", en: "Wine Mystery Tour" },

    // Kellerblicke Event Page (Страница события Kellerblicke)
    kellerblicke_title: { de: "Kellerblicke", en: "Cellar Views" },
    kellerblicke_subtitle: { de: "Entdecken Sie die Welt der Fellbacher Weine", en: "Discover the World of Fellbacher Wines" },
    kellerblicke_description: { de: "Schauen Sie hinter die Kulissen der Weinmacher und machen Sie sich ein Bild von der Arbeit unseres Kellermeisters, der mit seinem Team und durch Sorgfalt und Liebe zum Detail ausgezeichnete Weine erzeugt. Jeden Samstag können Weinbegeisterte und die, die es werden möchten, an einer Kellerführung inklusive 3er Weinprobe teilnehmen.", en: "Look behind the scenes of the winemakers and get an impression of the work of our cellar master, who produces excellent wines with his team through care and attention to detail. Every Saturday, wine enthusiasts and those who want to become one can participate in a cellar tour including a 3-wine tasting." },
    kellerblicke_registration_note: { de: "Anmeldung bis Veranstaltungstag 13 Uhr möglich.", en: "Registration possible until 1 PM on the event day." },
    kellerblicke_duration: { de: "Dauer ca. 1 Std.", en: "Duration approx. 1 hour" },
    kellerblicke_price_per_person: { de: "12€ / Person", en: "12€ / Person" },
    kellerblicke_event_period: { de: "4. April 2026 bis 14. November 2026", en: "April 4, 2026 to November 14, 2026" },
    kellerblicke_every_saturday: { de: "Jeden Samstag", en: "Every Saturday" },
    kellerblicke_book_now: { de: "Jetzt buchen", en: "Book Now" },
    kellerblicke_contact_info: { de: "Kontakt & Anmeldung", en: "Contact & Registration" },
    kellerblicke_what_included: { de: "Was ist enthalten?", en: "What's Included?" },
    kellerblicke_included_tour: { de: "Kellerführung mit Kellermeister", en: "Cellar tour with cellar master" },
    kellerblicke_included_tasting: { de: "3er Weinprobe", en: "3-wine tasting" },
    kellerblicke_included_insights: { de: "Einblicke in die Weinproduktion", en: "Insights into wine production" },
    kellerblicke_included_qa: { de: "Fragen & Antworten", en: "Q&A Session" },
    kellerblicke_tour_desc: { de: "Persönliche Führung durch unseren Weinkeller", en: "Personal tour through our wine cellar" },
    kellerblicke_tasting_desc: { de: "Verkostung von drei ausgewählten Weinen", en: "Tasting of three selected wines" },
    kellerblicke_insights_desc: { de: "Blick hinter die Kulissen der Weinherstellung", en: "Behind-the-scenes look at wine production" },
    kellerblicke_qa_desc: { de: "Zeit für Ihre Fragen an den Kellermeister", en: "Time for your questions to the cellar master" },
    kellerblicke_contact_text: { de: "Melden Sie sich telefonisch atau per E-Mail an. Wir freuen uns auf Ihren Besuch!", en: "Register by phone or email. We look forward to your visit!" },
    kellerblicke_secure_spot: { de: "Sichern Sie sich Ihren Platz", en: "Secure your spot" },
    price_label: { de: "Preis", en: "Price" },
    period_label: { de: "Zeitraum", en: "Period" },
    registration_label: { de: "Anmeldung", en: "Registration" },
    registration_time: { de: "Bis 13:00 Uhr", en: "Until 1:00 PM" },
    registration_day: { de: "am Veranstaltungstag", en: "on the event day" },
    spots_available: { de: "Verfügbar", en: "Available" },
    spots_left: { de: "{count} Plätze frei", en: "{count} spots left" },
    category_wine_tasting: { de: "Weinprobe", en: "Wine Tasting" },
    category_experience: { de: "Erlebnis", en: "Experience" },
    category_culinary: { de: "Kulinarik", en: "Culinary" },
    category_cellar_tour: { de: "Kellerführung", en: "Cellar Tour" },
    by_arrangement: { de: "Nach Vereinbarung", en: "By Arrangement" },

    // Weinfeste Event Page (Страница события Weinfeste)
    weinfeste_title: { de: "Weinfeste", en: "Wine Festivals" },
    weinfeste_subtitle: { de: "Feiern Sie mit uns die Tradition", en: "Celebrate the tradition with us" },
    weinfeste_description: { de: "Unsere Weinfeste sind ein Highlight im Jahreskalender. Genießen Sie gesellige Stunden rund um die Fellbacher Kelter, begleitet von kulinarischen Köstlichkeiten, Live-Musik und natürlich unseren besten Tropfen. Ob im Frühling, Sommer oder Herbst – wir laden Sie herzlich ein, die Fellbacher Weinkultur zu erleben.", en: "Our wine festivals are a highlight in the annual calendar. Enjoy sociable hours around the Fellbacher Kelter, accompanied by culinary delights, live music, and of course our best wines. Whether in spring, summer, or autumn – we warmly invite you to experience the Fellbacher wine culture." },
    weinfeste_calendar_note: { de: "Termine werden saisonal bekanntgegeben.", en: "Dates are announced seasonally." },
    weinfeste_highlight_music: { de: "Live-Musik & Unterhaltung", en: "Live Music & Entertainment" },
    weinfeste_highlight_music_desc: { de: "Atmosphärische Begleitung für beste Stimmung", en: "Atmospheric accompaniment for the best mood" },
    weinfeste_highlight_food: { de: "Kulinarische Vielfalt", en: "Culinary Variety" },
    weinfeste_highlight_food_desc: { de: "Regionale Spezialitäten passend zum Wein", en: "Regional specialties matching the wine" },
    weinfeste_highlight_wines: { de: "Große Weinauswahl", en: "Great Wine Selection" },
    weinfeste_highlight_wines_desc: { de: "Verkostung des aktuellen Jahrgangs", en: "Tasting of the current vintage" },
    weinfeste_highlight_location: { de: "Einzigartiges Ambiente", en: "Unique Ambience" },
    weinfeste_highlight_location_desc: { de: "Rund um die historische Kelter", en: "Around the historic press house" },
    weinfeste_next_event: { de: "Nächstes Fest", en: "Next Festival" },
    weinfeste_location_label: { de: "Veranstaltungsort", en: "Venue" },
    weinfeste_entry: { de: "Eintritt", en: "Entry" },
    weinfeste_entry_free: { de: "Frei (teilweise Ticket erforderlich)", en: "Free (partially ticket required)" },
    weinfeste_contact_text: { de: "Haben Sie Fragen zu unseren Festen? Kontaktieren Sie uns!", en: "Do you have questions about our festivals? Contact us!" },

    // Weinproben Event Page (Страница события Weinproben)
    weinproben_title: { de: "Weinproben", en: "Wine Tastings" },
    weinproben_subtitle: { de: "Entdecken Sie die Vielfalt unserer Weine", en: "Discover the variety of our wines" },
    weinproben_description: { de: "Erleben Sie eine geführte Verkostung unserer besten Weine. Unsere Experten führen Sie durch die verschiedenen Aromen und Geschmacksrichtungen und erklären Ihnen die Besonderheiten der Fellbacher Lagen. Ideal für Gruppen, Firmenfeiern oder einfach einen gemütlichen Abend mit Freunden.", en: "Experience a guided tasting of our best wines. Our experts will guide you through the various aromas and flavors and explain the special features of the Fellbach vineyards. Ideal for groups, company parties, or simply a cozy evening with friends." },
    weinproben_highlight_variety: { de: "Vielfältige Auswahl", en: "Diverse Selection" },
    weinproben_highlight_variety_desc: { de: "Probieren Sie Rot-, Weiß- und Roséweine", en: "Taste red, white, and rosé wines" },
    weinproben_highlight_expert: { de: "Fachkundige Leitung", en: "Expert Guidance" },
    weinproben_highlight_expert_desc: { de: "Erfahren Sie alles über Anbau und Ausbau", en: "Learn everything about cultivation and aging" },
    weinproben_highlight_atmosphere: { de: "Gemütliche Atmosphäre", en: "Cozy Atmosphere" },
    weinproben_highlight_atmosphere_desc: { de: "In unserer Vinothek oder im Gewölbekeller", en: "In our vinotheque or vaulted cellar" },
    weinproben_highlight_snacks: { de: "Passende Snacks", en: "Matching Snacks" },
    weinproben_highlight_snacks_desc: { de: "Auf Wunsch servieren wir schwäbische Häppchen", en: "We serve Swabian bites upon request" },
    weinproben_price_label: { de: "Preis pro Person", en: "Price per Person" },
    weinproben_price_value: { de: "ab 25€", en: "from 25€" },
    weinproben_duration_label: { de: "Dauer", en: "Duration" },
    weinproben_duration_value: { de: "ca. 2 - 3 Stunden", en: "approx. 2 - 3 hours" },
    weinproben_group_size_label: { de: "Gruppengröße", en: "Group Size" },
    weinproben_group_size_value: { de: "ab 10 Personen", en: "from 10 people" },
    weinproben_contact_text: { de: "Planen Sie eine Weinprobe? Kontaktieren Sie uns für ein individuelles Angebot!", en: "Planning a wine tasting? Contact us for an individual offer!" },
    weinproben_book_button: { de: "Anfrage senden", en: "Send Request" },

    // Weintreff Event Page (Страница события Weintreff)
    weintreff_title: { de: "Weintreff", en: "Wine Meetup" },
    weintreff_subtitle: { de: "Der perfekte Ausklang zum Wochenende", en: "The perfect end to the weekend" },
    weintreff_description: { de: "An der Sonnenseite der Neuen Kelter mit perfektem Blick auf die Rebhänge des Kappelbergs laden wir jeden Sonn- und Feiertag sowie an ausgewählten Samstagen bei schönem Wetter zum Weinausschank und zum Verweilen ein. Wir verwöhnen Sie mit ausgezeichneten Weinen, Süßem zum Kaffee und Leckerem vom Grill.", en: "On the sunny side of the Neue Kelter with a perfect view of the Kappelberg vineyards, we invite you to enjoy wine and relax every Sunday and public holiday, as well as on selected Saturdays in good weather. We spoil you with excellent wines, sweets for coffee, and delicious food from the grill." },
    weintreff_highlight_social: { de: "Wein & Genuss", en: "Wine & Pleasure" },
    weintreff_highlight_social_desc: { de: "Ausgezeichnete Weine und Leckeres vom Grill", en: "Excellent wines and delicious food from the grill" },
    weintreff_highlight_selection: { de: "Süßes & Kaffee", en: "Sweets & Coffee" },
    weintreff_highlight_selection_desc: { de: "Kaffee und Kuchen am Nachmittag", en: "Coffee and cake in the afternoon" },
    weintreff_highlight_atmosphere: { de: "Traumblick", en: "Dream View" },
    weintreff_highlight_atmosphere_desc: { de: "Blick auf die Rebhänge des Kappelbergs", en: "View of the Kappelberg vineyards" },
    weintreff_schedule_label: { de: "Wann?", en: "When?" },
    weintreff_schedule_value: { de: "März - Nov 2026: Sonn-/Feiertage 12-19:30 Uhr", en: "Mar - Nov 2026: Sun/Holidays 12-7:30 PM" },
    weintreff_location_value: { de: "Neue Kelter (Sonnenseite)", en: "New Wine Press House (Sunny Side)" },
    weintreff_entry_label: { de: "Eintritt", en: "Entry" },
    weintreff_entry_value: { de: "Frei", en: "Free" },
    weintreff_contact_text: { de: "Kommen Sie einfach vorbei! Wir freuen uns auf Sie.", en: "Just drop by! We look forward to seeing you." },



    // Afterwork Event Page (Страница события Afterwork)
    afterwork_title: { de: "Afterwork", en: "Afterwork" },
    afterwork_subtitle: { de: "Der perfekte Einstieg ins Wochenende", en: "The perfect start to the weekend" },
    afterwork_description: { de: "An (fast) jedem ersten Donnerstag im Monat kann man ungezwungen Weine in unserer Vinothek genießen. Bei wechselnden Themen wird eine Auswahl präsentiert, durch die Sie sich mit Freunden oder Kollegen probieren können.", en: "On (almost) every first Thursday of the month, you can enjoy wines in a relaxed atmosphere in our Vinotheque. With changing themes, a selection is presented for you to taste with friends or colleagues." },
    afterwork_price_full: { de: "22€ / Person", en: "22€ / Person" },
    afterwork_price_full_desc: { de: "Inkl. ausgewählte Weine, Wasser und Knabbereien", en: "Incl. selected wines, water, and snacks" },
    afterwork_price_lite: { de: "15€ / Person", en: "15€ / Person" },
    afterwork_price_lite_desc: { de: "Alkoholfreie Alternativen, Wasser und Knabbereien", en: "Non-alcoholic alternatives, water, and snacks" },
    afterwork_time: { de: "19 - 21 Uhr", en: "7 PM - 9 PM" },
    afterwork_location: { de: "Vinothek in der Neuen Kelter", en: "Vinotheque in the New Wine Press House" },
    afterwork_no_registration: { de: "Eine Anmeldung ist nicht erforderlich.", en: "No registration required." },
    afterwork_food_note: { de: "Für einen Unkostenbeitrag wird auch eine Kleinigkeit zum Essen angeboten – genauere Infos hierzu finden Sie auf unserer Instagramseite", en: "For a small fee, snacks are also offered – find more info on our Instagram page" },
    afterwork_schedule_title: { de: "Termine & Themen 2026", en: "Dates & Themes 2026" },

    // Afterwork Schedule Themes
    theme_fasching: { de: "Faschingsvorglühen", en: "Carnival Warm-up" },
    theme_pinot: { de: "In Pinot Veritas", en: "In Pinot Veritas" },
    theme_jungwein: { de: "Jungwein Jubel", en: "Young Wine Jubilee" },
    theme_cuvee: { de: "Cuvée Confidential", en: "Cuvée Confidential" },
    theme_rose: { de: "Rosé you later feat. Tommy’s Crew", en: "Rosé you later feat. Tommy’s Crew" },
    theme_summer_break: { de: "Sommerpause", en: "Summer Break" },
    theme_autumn: { de: "Herbst Warm Up", en: "Autumn Warm Up" },
    theme_deluxe: { de: "Feierabend Deluxe", en: "Afterwork Deluxe" },
    theme_boss: { de: "Bosse beben – Hier steht der Chef hinter’m Tresen", en: "Bosses Quake – The Boss is Behind the Bar" },



    // Wein & Weiter Event Page
    weinweiter_title: { de: "Wein & Weiter", en: "Wine & More" },
    weinweiter_subtitle: { de: "Warum nur mitnehmen, wenn man auch bei uns genießen kann?", en: "Why just take away when you can enjoy with us?" },
    weinweiter_description: { de: "Schauen Sie doch einfach bei Ihrer Wanderung über den Kappelberg auf ein Glas Wein in der Neuen Kelter vorbei. In unserem Offenausschank können Sie aus einem Jahreszeiten entsprechenden Sortiment Ihren Lieblingswein glas- und flaschenweise wählen. Passend zum Wein bieten wir eine Auswahl an kleinen Snacks. Einfach während unserer Öffnungszeiten vorbei schauen und verwöhnen lassen!", en: "Just stop by for a glass of wine at the New Wine Press House during your hike over the Kappelberg. In our open bar, you can choose your favorite wine by the glass or bottle from a seasonal assortment. We offer a selection of small snacks to match the wine. Just drop by during our opening hours and let us spoil you!" },
    weinweiter_location_time: { de: "Ganzjährig in und vor der Neuen Kelter. Mo bis Sa 9:00 bis 18:30 Uhr.", en: "Year-round in and in front of the New Wine Press House. Mon to Sat 9:00 AM to 6:30 PM." },
    weinweiter_partner_title: { de: "Wir sind Partner von bwegtPlus", en: "We are a partner of bwegtPlus" },
    weinweiter_discount_desc: { de: "Bei uns erhalten Sie folgende Vergünstigung: 1 Euro Rabatt im Ausschank „Wein und Weiter“ (Mo-Sa 9:00-18:30 Uhr).", en: "With us you get the following discount: 1 Euro discount at the 'Wine & More' bar (Mon-Sat 9:00 AM - 6:30 PM)." },
    weinweiter_condition: { de: "Voraussetzung: Vorlage eines tagesaktuellen bwtarif-Tickets, D-Tickets oder D-Tickets JugendBW.", en: "Requirement: Presentation of a valid bwtarif ticket, D-Ticket, or D-Ticket JugendBW." },
    weinweiter_snacks_label: { de: "Passende Snacks", en: "Matching Snacks" },
    weinweiter_seasonal_wines: { de: "Saisonales Sortiment", en: "Seasonal Assortment" },
    weinweiter_open_bar: { de: "Offenausschank", en: "Open Bar" },


    // Wein(Rätsel)Tour Event Page
    weinraetsel_title: { de: "Wein(Rätsel)Tour mit Bollerwagen", en: "Wine (Puzzle) Tour with Handcart" },
    weinraetsel_subtitle: { de: "Das neue Highlight im Weinberg", en: "The new highlight in the vineyard" },
    weinraetsel_description: { de: "Wir packen je nach Gruppengröße einen Bollerwagen mit Wein, Wasser sowie einem leckeren Vesper und schon kann man einen Tag im Weinberg genießen. Wählt man eine von drei Routen und entlang der Tour können spannende Fragen beantwortet werden. Hat man das Lösungswort, gibt es noch eine Flasche Gewinnerwein zum Abschied von uns.", en: "Depending on the group size, we pack a handcart with wine, water, and a delicious snack, and you can enjoy a day in the vineyard. Choose one of three routes and answer exciting questions along the tour. If you find the solution word, you will get a bottle of winner wine as a farewell gift." },
    weinraetsel_variant_s_label: { de: "Variante S (bis 6 Personen)", en: "Variant S (up to 6 people)" },
    weinraetsel_variant_s_price: { de: "119,- Euro", en: "119.- Euro" },
    weinraetsel_variant_m_label: { de: "Variante M (bis 8 Personen)", en: "Variant M (up to 8 people)" },
    weinraetsel_variant_m_price: { de: "159,- Euro", en: "159.- Euro" },
    weinraetsel_variant_l_label: { de: "Variante L (bis 10 Personen)", en: "Variant L (up to 10 people)" },
    weinraetsel_variant_l_price: { de: "199,- Euro", en: "199.- Euro" },
    weinraetsel_routes_title: { de: "Unsere Touren im Überblick", en: "Our Tours at a Glance" },
    weinraetsel_route_blue: { de: "Blaue Tour", en: "Blue Tour" },
    weinraetsel_route_yellow: { de: "Gelbe Tour", en: "Yellow Tour" },
    weinraetsel_route_red: { de: "Rote Tour", en: "Red Tour" },
    weinraetsel_availability: { de: "Montag bis Samstag ab 9.00 Uhr. Rückgabe bis 18.00 Uhr.", en: "Monday to Saturday from 9:00 AM. Return by 6:00 PM." },
    weinraetsel_deposit: { de: "50,00 € Pfand", en: "50.00 € Deposit" },
    weinraetsel_booking_note: { de: "Bitte mindestens 3 Tage vorher buchen/absagen.", en: "Please book/cancel at least 3 days in advance." },
    weinraetsel_contact_phone: { de: "0711 / 57 88 03 – 0", en: "0711 / 57 88 03 – 0" },
    weinraetsel_contact_email: { de: "veranstaltungen@fellbacher-weine.de", en: "veranstaltungen@fellbacher-weine.de" },
    weinraetsel_winter_special: { de: "Im Winter auch als Glühwein(Rätsel)Tour verfügbar", en: "In winter also available as Mulled Wine (Puzzle) Tour" },
    weinraetsel_winter_desc: { de: "Wenn’s draußen kalt wird, wird’s bei uns gemütlich: Unser Winter-Bollerwagen ist prall gefüllt mit Glühwein, süßen Naschereien und weihnachtlichem Flair.", en: "When it gets cold outside, it gets cozy with us: Our winter handcart is filled with mulled wine, sweet treats, and Christmas flair." },

    // Booking Flow (Бронирование)
    booking_title: { de: "Degustation buchen", en: "Book a Tasting" },
    booking_step_1: { de: "Termin wählen", en: "Select Date" },
    booking_step_2: { de: "Personenanzahl", en: "Number of People" },
    booking_step_3: { de: "Bestätigung", en: "Confirmation" },
    booking_confirm: { de: "Buchung abschließen", en: "Complete Booking" },
    booking_success_title: { de: "Vielen Dank!", en: "Thank You!" },
    booking_success_desc: { de: "Ihre Buchung wurde erfolgreich entgegengenommen. Sie erhalten in Kürze eine Bestätigung per E-Mail.", en: "Your booking has been successfully received. You will receive a confirmation email shortly." },
    booking_back_to_events: { de: "Zurück zu den Events", en: "Back to Events" },
    booking_cancel: { de: "Abbrechen", en: "Cancel" },
    booking_next: { de: "Weiter", en: "Next" },
    booking_guests: { de: "Gäste", en: "Guests" },
    booking_total_amount: { de: "Gesamtbetrag", en: "Total Amount" },
    booking_payment_on_site: { de: "Zahlung vor Ort", en: "Payment on site" },
    booking_ticket: { de: "Ticket", en: "Ticket" },

    // Wine Types & UI (Типы вин и интерфейс)
    wine_type_rose: { de: "Roséwein", en: "Rosé Wine" },
    wine_type_sparkling: { de: "Prickelnde Weine", en: "Sparkling Wines" },
    wine_type_alcohol_free: { de: "Alkoholfreie Weine", en: "Alcohol Free Wines" },
    wine_type_all: { de: "Alle", en: "All" },
    image_not_available: { de: "Bild nicht verfügbar", en: "Image not available" },

    // Exclusive Selection (Эксклюзивная подборка)
    exclusive_selection_title: { de: "Exklusive Auswahl", en: "Exclusive Selection" },
    exclusive_selection_subtitle: { de: "Die Wahl unserer Sommeliers für diese Saison.", en: "Our sommelier's choice for this season." },
    exclusive_selection_desc: { de: "Handverlesen, hoch bewertet und außergewöhnlich verarbeitet.", en: "Hand-picked, highly-rated and exceptionally crafted." },
    view_collection: { de: "Kollektion ansehen", en: "View Collection" },

    // CTA & Labels (Кнопки и метки)
    more_info: { de: "Mehr erfahren", en: "Learn More" },
    all_appointments: { de: "Alle Termine", en: "All Appointments" },
    premium_event: { de: "Premium Event", en: "Premium Event" },
    fully_booked: { de: "Ausgebucht", en: "Fully Booked" },
    private_events_title: { de: "Private Veranstaltungen?", en: "Private Events?" },
    private_events_desc: { de: "Planen Sie eine Hochzeit, einen Geburtstag или ein Firmenevent? Nutzen Sie unsere exklusiven Räumlichkeiten und lassen Sie sich von uns beraten.", en: "Planning a wedding, birthday or corporate event? Use our exclusive premises and let us advise you." },
    request_quote: { de: "Unverbindlich anfragen", en: "Request a Quote" },
    events_per_year: { de: "Events / Jahr", en: "Events / Year" },
    passion: { de: "Leidenschaft", en: "Passion" },

    // Dashboard & Loyalty Extended
    status_delivered: { de: "Geliefert", en: "Delivered" },
    status_processing: { de: "In Bearbeitung", en: "Processing" },
    status_in_transit: { de: "Versandt", en: "In Transit" },
    recent_activities: { de: "Letzte Aktivitäten", en: "Recent Activities" },
    view_all_short: { de: "Alle anzeigen", en: "View All" },
    pts_until_goal: { de: "{points} PTS bis zum Ziel", en: "{points} PTS until goal" },
    status_benefits: { de: "Status-Vorteile", en: "Status Benefits" },
    program_details: { de: "Programmdetails", en: "Program Details" },
    ready_to_scan: { de: "Bereit zum Scannen", en: "Ready to Scan" },
    loyalty_scan_desc: { de: "Scannen Sie den Code im Laden, um Punkte zu sammeln.", en: "Scan the code in store to collect points." },
    redeem_points: { de: "Einlösen", en: "Redeem" },
    syncing: { de: "Synchronisierung...", en: "Syncing..." },
    api_error: { de: "Fehler beim Laden der Daten aus der Datenbank.", en: "Error loading data from the database." },
    api_empty: { de: "Momentan sind keine Produkte im Katalog verfügbar.", en: "There are currently no products available in the catalog." },

    // AI Sommelier
    ai_title: { de: "AI Sommelier", en: "AI Sommelier" },
    ai_subtitle: { de: "Ihr persönlicher Weinberater", en: "Your personal wine consultant" },
    ai_step_mood: { de: "Wie ist die Stimmung?", en: "What's the vibe?" },
    ai_step_food: { de: "Was gibt es zu essen?", en: "What's on the menu?" },
    ai_mood_romantic: { de: "Romantisch", en: "Romantic" },
    ai_mood_party: { de: "Party", en: "Party" },
    ai_mood_relax: { de: "Entspannung", en: "Relaxing" },
    ai_mood_gift: { de: "Geschenk", en: "Gift" },
    ai_mood_dinner: { de: "Abendessen", en: "Dinner" },
    ai_food_placeholder: { de: "z.B. Steak, Pasta, Käse...", en: "e.g. Steak, Pasta, Cheese..." },
    ai_food_meat: { de: "Fleisch", en: "Meat" },
    ai_food_fish: { de: "Fisch", en: "Fish" },
    ai_food_cheese: { de: "Käse", en: "Cheese" },
    ai_food_pasta: { de: "Pasta", en: "Pasta" },
    ai_food_dessert: { de: "Dessert", en: "Dessert" },
    ai_btn_find: { de: "Perfekten Wein finden", en: "Find Perfect Wine" },
    ai_btn_back: { de: "Zurück", en: "Back" },
    ai_thinking: { de: "Einen Moment, ich suche den perfekten Wein...", en: "One moment, finding the perfect wine..." },
    ai_result_intro: { de: "Exzellente Wahl! Zu diesem Anlass empfehle ich:", en: "Excellent choice! For this occasion I recommend:" },
    ai_restart: { de: "Neue Suche", en: "New Search" },
    ai_home_description: { de: "Unsicher bei der Weinauswahl? Lassen Sie sich von unserem AI-Sommelier basierend auf Stimmung und Essen zum perfekten Wein führen.", en: "Not sure which wine to choose? Let our AI Sommelier guide you to the perfect bottle based on your mood and meal." },
    ai_home_cta: { de: "Sommelier fragen", en: "Ask the Sommelier" },
};

// Интерфейс контекста языка
interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, params?: { [key: string]: string | number }) => string;
}

// Создание контекста с неопределенным начальным значением
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Провайдер языка для обертки всего приложения.
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Состояние текущего языка (по умолчанию немецкий)
    const [language, setLanguage] = useState<Language>('de');

    // Предварительная загрузка языка из localStorage при монтировании
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'de' || savedLang === 'en')) {
            setLanguage(savedLang);
            document.documentElement.lang = savedLang;
        }
    }, []);

    /**
     * Смена языка с сохранением в браузере.
     */
    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang; // Важно для SEO и доступности
    };

    /**
     * Функция перевода (Translation).
     * Поддерживает вставку динамических параметров через фигурные скобки, напр. {count}.
     */
    const t = (key: string, params?: { [key: string]: string | number }) => {
        const translation = translations[key];

        // Если ключ не найден, выводим сам ключ для отладки
        if (!translation) {
            // console.warn(`Translation key missing: ${key}`);
            return key;
        }

        let text = translation[language];

        // Обработка динамических параметров
        if (params) {
            Object.entries(params).forEach(([paramKey, value]) => {
                text = text.replace(`{${paramKey}}`, value.toString());
            });
        }
        return text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

/**
 * Хук для использования системы i18n в функциональных компонентах.
 */
export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation должен использоваться внутри LanguageProvider');
    }
    return context;
};
