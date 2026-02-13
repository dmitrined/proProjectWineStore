/**
 * Назначение файла: Общие константы навигации для всего приложения.
 * Используется в Header, MobileMenu и Footer.
 */

export const getNavigationData = (t: (key: string) => string) => {
    const navigationItems = [
        { label: t("nav_loyalty"), path: "/loyalty" },
    ];

    const shopCategories = [
        { label: t("nav_red_wines"), path: "/shop?category=red" },
        { label: t("nav_white_wines"), path: "/shop?category=white" },
        { label: t("wine_type_rose"), path: "/shop?category=rose" },
        { label: t("wine_type_sparkling"), path: "/shop?category=sparkling" },
    ];

    const eventCategories = [
        { label: t("events_all_events"), path: "/events" },
        { label: t("event_kellerblicke"), path: "/events/kellerblicke" },
        { label: t("event_weinfeste"), path: "/events/weinfeste" },
        { label: t("event_weinproben"), path: "/events/weinproben" },
        { label: t("event_weintreff"), path: "/events/weintreff" },
        { label: t("event_afterwork"), path: "/events/afterwork" },
        { label: t("event_wein_weiter"), path: "/events/weinweiter" },
        { label: t("event_wein_raetsel_tour"), path: "/events/weinraetseltour" },
    ];

    const aboutCategories = [
        { label: t("about_we_about_us"), path: "/aboutUs/whoWeAre" },
        { label: t("about_team"), path: "/aboutUs/ourTeam" },
        { label: t("about_next_generation"), path: "/aboutUs/nextGeneration" },
    ];

    const contactCategories = [
        { label: t("contact_info_hours"), path: "/#" },
        { label: t("contact_directions"), path: "/#" },
        { label: t("contact_jobs"), path: "/#" },
    ];

    return {
        navigationItems,
        shopCategories,
        eventCategories,
        aboutCategories,
        contactCategories
    };
};
