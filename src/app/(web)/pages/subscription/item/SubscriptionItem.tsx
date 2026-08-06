"use client";

import { useMemo, useState } from "react";
import { useDistinctDominionSubscriptionItems } from "@/lib/hooks/nexus/subscription/items/distinct/useDistinctDominionSubscriptionItems";
import { dominionService } from "@/lib/services/nexus/dominion/dominionService";

interface SubscriptionItemProps {
    parentTableName: string;
    parentName: string;
    heading?: string;
    subheading?: string;
    perPage?: number;
    showSearch?: boolean;
    onSubscribe?: (item: { guidId?: string; id: number; name: string }) => void;
}

export default function SubscriptionItem({
    parentTableName,
    parentName,
    heading = "Exam Prep Plans",
    subheading,
    perPage = 50,
    showSearch = true,
    onSubscribe,
}: SubscriptionItemProps) {
    const {
        filteredSubscriptionItems,
        subscriptionItemSearch,
        setSubscriptionItemSearch,
        skewTotal,
    } = useDistinctDominionSubscriptionItems({
        parentTableName,
        parentName,
        page: 1,
        perPage,
        sortDirection: "asc",
    });

    const [authRequiredMessage, setAuthRequiredMessage] = useState<string | null>(null);

    const sortedItems = useMemo(
        () =>
            [...filteredSubscriptionItems].sort(
                (a, b) => (a.cardNumber ?? 0) - (b.cardNumber ?? 0)
            ),
        [filteredSubscriptionItems]
    );

    const handleSubscribe = async (item: (typeof sortedItems)[number]) => {
        if (onSubscribe) {
            onSubscribe(item);
            return;
        }

        setAuthRequiredMessage(null);

        const returnUrl = `${window.location.origin}/pages/subscription/package`;

        const result = await dominionService("SubscriptionPackage", "Store", {
            subscriptionItemId: item.id,
            subscriptionItemGuidId: item.guidId,
            returnUrl,
        });

        if (result?.error) {
            console.error("🔔 Subscription Failed :", result.error);
            setAuthRequiredMessage(
                typeof result.error === "string" ? result.error : "Access Denied, Kindly Log In ⚓"
            );
            return;
        }

        const redirectUrl = (result as { redirectUrl?: string } | undefined)?.redirectUrl;
        if (redirectUrl) {
            window.location.href = redirectUrl;
            return;
        }

        console.log("🔔 Subscribed:", result);
    };

    const handleGoToLogin = () => {
        const returnUrl = `${window.location.origin}${window.location.pathname}`;
        window.location.href = `/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`;
    };

    const formatAmount = (amount?: number, currency?: string | null) => {
        if (amount === undefined || amount === null) return null;
        try {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency || "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(amount);
        } catch {
            return `${currency ?? "USD"} ${amount}`;
        }
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
            <div className="mb-8 text-center">
                <h2 className="font-serif text-3xl font-semibold text-navy tracking-tight">{heading}</h2>
                <p className="mt-2 text-navy/60">
                    {subheading ?? `Choose the plan that fits your study timeline. ${skewTotal} plan${skewTotal !== 1 ? "s" : ""} available.`}
                </p>
            </div>

            {/* Auth-required banner */}
            {authRequiredMessage && (
                <div className="mb-8 flex justify-center">
                    <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-center shadow-sm sm:flex-row sm:justify-between sm:text-left">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🔒</span>
                            <p className="text-sm font-semibold text-red-300">{authRequiredMessage}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                            <button
                                type="button"
                                onClick={handleGoToLogin}
                                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white shadow transition-opacity hover:opacity-90"
                            >
                               Click to Log In
                            </button>
                            <button
                                type="button"
                                onClick={() => setAuthRequiredMessage(null)}
                                className="rounded p-1 text-navy font-bold hover:text-red-300"
                                aria-label="Dismiss"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSearch && (
                <div className="mb-8 flex justify-center">
                    <input
                        type="text"
                        value={subscriptionItemSearch}
                        onChange={(e) => setSubscriptionItemSearch(e.target.value)}
                        placeholder="Search plans…"
                        className="w-full max-w-md rounded-lg border border-border-light bg-paper px-4 py-2 text-sm text-navy shadow-sm placeholder:text-navy/40 focus:border-coral focus:outline-none focus:ring-1 focus:ring-coral"
                    />
                </div>
            )}

            {sortedItems.length === 0 && (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border-light bg-paper-dim/50 px-6 py-12 text-center">
                    <span className="text-3xl">📚</span>
                    <p className="font-serif text-xl font-semibold text-navy">
                        Plans are on their way
                    </p>
                    <p className="max-w-md text-sm leading-relaxed text-navy/60">
                        Pricing isn&apos;t available right now. Check back soon or
                        contact support for the latest plan options.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sortedItems.map((item) => {
                    const style = item.style;

                    const titleBg = style?.titleBackground ?? "#4F46E5";
                    const titleColor = style?.titleColor ?? "#FFFFFF";
                    const bodyGradient =
                        style?.bodyGradientStart && style?.bodyGradientEnd
                            ? `linear-gradient(${style.bodyGradientDirection ?? "to bottom"}, ${style.bodyGradientStart}, ${style.bodyGradientEnd})`
                            : undefined;
                    const descriptionColor = style?.descriptionColor ?? "#475569";
                    const footerBg = style?.footerButtonBackground ?? "#4F46E5";
                    const footerColor = style?.footerButtonColor ?? "#FFFFFF";
                    const footerText = style?.footerButtonText || "Subscribe Now";

                    const priceLabel = formatAmount(item.amount, item.currency);

                    return (
                        <div
                            key={item.guidId ?? item.id}
                            className="relative flex flex-col transition-transform duration-200 hover:-translate-y-1"
                        >
                            {item.isFeatured && (
                                <div className="absolute left-2 -top-3 z-20 flex items-center gap-1 rounded-full bg-indigo-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-green-100 shadow-md">
                                    ⭐ Featured
                                </div>
                            )}

                            {style?.badgeName && (
                                <div
                                    className="absolute right-2 -top-3 z-20 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-md"
                                    style={{
                                        background: style.badgeBackground ?? "#FBBF24",
                                        color: style.badgeColor ?? "#111827",
                                        fontSize: style.badgeFontSize,
                                    }}
                                >
                                    {style.badgeName}
                                </div>
                            )}

                            <div
                                className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl"
                                style={{ background: bodyGradient ?? "#FFFFFF" }}
                            >
                                <div
                                    className="flex items-center px-5 py-4"
                                    style={{ background: titleBg, color: titleColor }}
                                >
                                    <h3
                                        className="pr-16 text-lg font-bold leading-snug"
                                        style={{ fontSize: style?.titleFontSize }}
                                    >
                                        {item.name}
                                    </h3>
                                </div>

                                <div className="flex flex-1 flex-col gap-3 px-5 py-1">
                                    {priceLabel && (
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-extrabold text-slate-900">
                                                {priceLabel}
                                            </span>
                                            {item.priceDuration && (
                                                <span className="text-sm text-slate-500"> {item.priceDuration}</span>
                                            )}
                                        </div>
                                    )}

                                    {item.description && (
                                        <p
                                            className="text-sm leading-relaxed"
                                            style={{ color: descriptionColor, fontSize: style?.descriptionFontSize }}
                                        >
                                            {item.description}
                                        </p>
                                    )}

                                    {item.duration && (
                                        <p className="text-sm text-slate-500">Access length: {item.duration}</p>
                                    )}

                                    {item.plan && (
                                        <p className="text-sm text-slate-500">Plan: {item.plan}</p>
                                    )}

                                    {item.features && (
                                        <div
                                            className="mt-1 max-h-88 overflow-y-auto rounded-lg border border-slate-100 bg-slate-50/60 p-3 pr-2 text-sm text-slate-700 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300"
                                            style={{ fontSize: style?.bodyFontSize }}
                                            dangerouslySetInnerHTML={{ __html: item.features }}
                                        />
                                    )}
                                </div>

                                <div className="px-5 pb-5 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => handleSubscribe(item)}
                                        className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold shadow transition-opacity hover:opacity-90"
                                        style={{
                                            background: footerBg,
                                            color: footerColor,
                                            fontSize: style?.footerButtonFontSize,
                                        }}
                                    >
                                        {footerText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// The End By : B.L.S.M.C ;  Skewblanc - The Winds Chase Us ⚓
// ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────