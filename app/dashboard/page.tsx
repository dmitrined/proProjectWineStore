/**
 * НАЗНАЧЕНИЕ: Личный кабинет пользователя (Dashboard).
 * ЗАВИСИМОСТИ: AuthContext, OrdersContext, useWishlistStore, useCartStore, useWinesStore, i18n.
 * ОСОБЕННОСТИ: Клиентский компонент, табы (Profile, Wishlist, Cart, Orders), поддержка deep linking через URL.
 */

"use client";

import React, { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useOrders } from '@/lib/contexts/OrdersContext';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useTranslation } from '@/lib/i18n';
import { Wine } from '@/lib/types';
import WineCard from '@/components/wine/WineCard';
import { useWines } from '@/lib/hooks/useWines';
import { useCartStore } from '@/lib/store/useCartStore';
import {
    Package,
    Heart,
    User as UserIcon,
    LogOut,
    ChevronRight,
    Calendar,
    ShoppingCart
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function DashboardContent() {
    const { t } = useTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');
    const { user, logout, isLoggedIn } = useAuth();
    const { orders } = useOrders();
    const { data: wines = [], isLoading: isWinesLoading } = useWines();
    const wishlist = useWishlistStore(state => state.wishlist);
    // Фильтруем только вина (исключаем события) для отображения в wishlist
    const wishlistedWines = wines.filter((wine): wine is Wine =>
        wishlist.includes(wine.id) && 'grapeVariety' in wine
    );

    const items = useCartStore(state => state.items);
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    const cartWines = items.map((item: { id: string; quantity: number }) => {
        const wine = wines.find(w => w.id === item.id);
        return wine ? { ...wine, quantity: item.quantity } : null;
    }).filter((item): item is Wine & { quantity: number } => item !== null);

    const [activeTab, setActiveTab] = useState<'profile' | 'wishlist' | 'cart' | 'orders'>('profile');

    // Обработка глубоких ссылок через параметры поиска
    React.useEffect(() => {
        const validTabs = ['profile', 'wishlist', 'cart', 'orders'];
        if (tabParam && validTabs.includes(tabParam)) {
            setActiveTab(tabParam as 'profile' | 'wishlist' | 'cart' | 'orders');
        }
    }, [tabParam]);

    // Redirect if not logged in
    React.useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn, router]);

    if (!isLoggedIn || !user) return null;

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black text-wine-dark dark:text-white serif italic">
                            {t("dashboard_title")}
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
                            {t("dashboard_welcome")}, {user.name}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            router.push('/');
                        }}
                        className="flex items-center gap-2 text-zinc-500 hover:text-red-500 font-bold uppercase tracking-widest text-xs transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        {t("nav_logout")}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-12 border-b border-zinc-100 dark:border-zinc-800 pb-px overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-4 px-4 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === 'profile' ? 'text-wine-gold' : 'text-zinc-400 hover:text-zinc-600'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            {t("tab_profile")}
                        </div>
                        {activeTab === 'profile' && <div className="absolute bottom-0 left-0 w-full h-1 bg-wine-gold animate-in fade-in zoom-in" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('wishlist')}
                        className={`pb-4 px-4 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === 'wishlist' ? 'text-wine-gold' : 'text-zinc-400 hover:text-zinc-600'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            {t("tab_wishlist")}
                        </div>
                        {activeTab === 'wishlist' && <div className="absolute bottom-0 left-0 w-full h-1 bg-wine-gold animate-in fade-in zoom-in" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('cart')}
                        className={`pb-4 px-4 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === 'cart' ? 'text-wine-gold' : 'text-zinc-400 hover:text-zinc-600'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="w-4 h-4" />
                            {t("tab_cart")}
                        </div>
                        {activeTab === 'cart' && <div className="absolute bottom-0 left-0 w-full h-1 bg-wine-gold animate-in fade-in zoom-in" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`pb-4 px-4 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === 'orders' ? 'text-wine-gold' : 'text-zinc-400 hover:text-zinc-600'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            {t("tab_orders")}
                        </div>
                        {activeTab === 'orders' && <div className="absolute bottom-0 left-0 w-full h-1 bg-wine-gold animate-in fade-in zoom-in" />}
                    </button>
                </div>

                {/* Content */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'profile' && (
                        <div className="max-w-2xl">
                            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 p-8 md:p-12">
                                <div className="flex items-center gap-8 mb-12">
                                    <div className="w-24 h-24 bg-wine-dark text-wine-gold rounded-[2rem] flex items-center justify-center text-4xl font-black serif">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold dark:text-white serif">{t("recent_activities")}</h3>
                                        <p className="text-zinc-500 font-medium">{user.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("auth_name_placeholder")}</span>
                                        <input
                                            readOnly
                                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 px-6 py-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 font-bold text-zinc-600 dark:text-zinc-400"
                                            value={user.name}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{t("auth_email_placeholder")}</span>
                                        <input
                                            readOnly
                                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 px-6 py-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 font-bold text-zinc-600 dark:text-zinc-400"
                                            value={user.email}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'wishlist' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {wishlistedWines.length === 0 ? (
                                <div className="col-span-full text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-zinc-100 dark:border-zinc-800">
                                    <Heart className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                                    <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">{t("no_wines_found")}</p>
                                </div>
                            ) : (
                                wishlistedWines.map((wine: Wine) => (
                                    <WineCard key={wine.id} wine={wine} />
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'cart' && (
                        <div className="space-y-6">
                            {cartWines.length === 0 ? (
                                <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-zinc-100 dark:border-zinc-800">
                                    <ShoppingCart className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                                    <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">{t("cart_empty")}</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {cartWines.map((wine) => (
                                        <div key={wine.id} className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 p-4 flex items-center gap-4">
                                            <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-2 flex items-center justify-center shrink-0">
                                                <img src={wine.image} alt={wine.name} className="h-full object-contain" />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="font-bold text-wine-dark dark:text-white leading-tight">{wine.name}</h4>
                                                <p className="text-xs text-zinc-500 italic mb-2">{t('wine_type_' + wine.type)}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-black text-wine-gold">{wine.price.toFixed(2)} €</span>
                                                    <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-1.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                                        <button
                                                            onClick={() => updateQuantity(wine.id, -1)}
                                                            className="w-8 h-8 rounded-lg hover:bg-white dark:hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-500 font-bold"
                                                        >-</button>
                                                        <span className="text-sm font-black w-4 text-center dark:text-white">{wine.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(wine.id, 1)}
                                                            className="w-8 h-8 rounded-lg hover:bg-white dark:hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-500 font-bold"
                                                        >+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div className="space-y-6">
                            {orders.length === 0 ? (
                                <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-zinc-100 dark:border-zinc-800">
                                    <ShoppingCart className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                                    <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">{t("no_orders")}</p>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div key={order.id} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 p-6 md:p-8 hover:shadow-xl transition-all group">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl flex items-center justify-center text-wine-gold">
                                                    <Package className="w-8 h-8" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("order_id")}</span>
                                                        <span className="text-sm font-bold dark:text-white">#{order.id}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {order.date}
                                                        </div>
                                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' :
                                                            order.status === 'Processing' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'
                                                            }`}>
                                                            {order.status === 'Delivered' ? t("status_delivered") :
                                                                order.status === 'Processing' ? t("status_processing") :
                                                                    order.status === 'In Transit' ? t("status_in_transit") : order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 pt-6 md:pt-0">
                                                <div>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">{t("order_total")}</span>
                                                    <span className="text-2xl font-black dark:text-white serif leading-none">{order.total.toFixed(2)} €</span>
                                                </div>
                                                <button className="bg-wine-gold/10 hover:bg-wine-gold text-wine-gold hover:text-wine-dark px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2">
                                                    {t("view_details")}
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center font-black serif italic text-wine-gold animate-pulse text-2xl">
                Loading...
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
