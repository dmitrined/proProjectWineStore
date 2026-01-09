/**
 * Назначение файла: Модальное окно авторизации и регистрации (Auth Modal).
 * Зависимости: i18n, AuthContext, Lucide React.
 * Особенности: Переключение между Входом и Регистрацией, проверка сложности пароля, социальные кнопки.
 */

"use client";

import React, { useState, useMemo } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useTranslation } from '@/lib/i18n';
import { X, Mail, Lock, User as UserIcon, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Основной компонент аутентификации пользователя.
 */
export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { t } = useTranslation();
    const { login, register } = useAuth();

    // Состояние формы
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [ageVerified, setAgeVerified] = useState(false);

    /**
     * Оценка сложности пароля (от 0 до 3).
     */
    const passwordStrength = useMemo(() => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) return 1; // Слабый
        if (strength <= 4) return 2; // Средний
        return 3; // Сильный
    }, [password]);

    // Цвет индикатора сложности
    const strengthColor = () => {
        switch (passwordStrength) {
            case 1: return 'bg-red-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-green-500';
            default: return 'bg-zinc-200 dark:bg-zinc-700';
        }
    };

    // Текстовая метка сложности
    const strengthLabel = () => {
        switch (passwordStrength) {
            case 1: return t("strength_weak");
            case 2: return t("strength_medium");
            case 3: return t("strength_strong");
            default: return '';
        }
    };

    /**
     * Обработка отправки формы.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isLogin && password !== confirmPassword) {
            setError(t("passwords_not_matching"));

            return;
        }

        if (!isLogin && !ageVerified) {
            setError(t("auth_age_error"));
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
            onClose();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors z-10"
                >
                    <X className="w-5 h-5 dark:text-zinc-400" />
                </button>

                <div className="p-8 md:p-12">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-black serif dark:text-white mb-2 pr-12">
                            {isLogin ? t("login_title") : t("register_title")}
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                            {isLogin ? t("login_subtitle") : t("register_subtitle")}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                <input
                                    required
                                    type="text"
                                    placeholder={t("auth_name_placeholder")}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border-2 border-transparent focus:border-wine-gold outline-none transition-all dark:text-white"
                                />
                            </div>
                        )}
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input
                                required
                                type="email"
                                placeholder={t("auth_email_placeholder")}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border-2 border-transparent focus:border-wine-gold outline-none transition-all dark:text-white"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                placeholder={t("auth_password_placeholder")}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border-2 border-transparent focus:border-wine-gold outline-none transition-all dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-wine-gold transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Индикатор сложности пароля при регистрации */}
                        {!isLogin && password && (
                            <div className="px-2">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("password_strength")}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${passwordStrength === 1 ? 'text-red-500' : passwordStrength === 2 ? 'text-yellow-500' : 'text-green-500'}`}>
                                        {strengthLabel()}
                                    </span>
                                </div>
                                <div className="flex gap-1 h-1">
                                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength >= 1 ? strengthColor() : 'bg-zinc-100 dark:bg-zinc-800'}`} />
                                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength >= 2 ? strengthColor() : 'bg-zinc-100 dark:bg-zinc-800'}`} />
                                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength >= 3 ? strengthColor() : 'bg-zinc-100 dark:bg-zinc-800'}`} />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t("auth_confirm_password_placeholder")}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border-2 border-transparent focus:border-wine-gold outline-none transition-all dark:text-white"
                                />
                            </div>

                        )}

                        {!isLogin && (
                            <div className="flex items-center gap-3 px-2">
                                <div className="relative flex items-center">
                                    <input
                                        required
                                        id="age-verification"
                                        type="checkbox"
                                        checked={ageVerified}
                                        onChange={(e) => setAgeVerified(e.target.checked)}
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-zinc-300 dark:border-zinc-700 checked:border-wine-gold checked:bg-wine-gold transition-all"
                                    />
                                    <svg
                                        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <label
                                    htmlFor="age-verification"
                                    className="text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer select-none"
                                >
                                    {t("auth_age_verification")}
                                </label>
                            </div>
                        )}

                        {error && (
                            <p className="text-red-500 text-xs font-bold px-2">{error}</p>
                        )}

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-wine-dark text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-wine-gold hover:text-wine-dark transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-zinc-950/20"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? t("login_button") : t("register_button")}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="mt-8">
                        <div className="relative flex items-center justify-center mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-100 dark:border-zinc-800"></div>
                            </div>
                            <span className="relative px-4 bg-white dark:bg-zinc-900 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                {t("social_login_with")}
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {/* Google */}
                            <button className="flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                                <svg className="w-5 h-5 dark:text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            </button>
                            {/* Facebook */}
                            <button className="flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                                <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                            {/* Apple */}
                            <button className="flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
                                <svg className="w-5 h-5 dark:text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Footer Toggle */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="text-sm font-bold text-zinc-500 hover:text-wine-gold transition-colors"
                        >
                            {isLogin ? t("auth_toggle_register") : t("auth_toggle_login")}
                        </button>
                    </div>
                </div>
            </div >
        </div >
    );
}
