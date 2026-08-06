import Link from "next/link";
import { APP_NAME } from "@/lib/config/config";

type CallbackStatus = "success" | "cancel" | null;

type PageProps = {
    searchParams: Promise<{
        provider?: string;
        subscriptionId?: string;
        status?: CallbackStatus;
        session_id?: string;
    }>;
};

export default async function SubscriptionPackageCallbackPage({
    searchParams,
}: PageProps) {
    const params = await searchParams;

    const provider = params.provider;
    const subscriptionId = params.subscriptionId;
    const status = params.status ?? null;
    const sessionId = params.session_id;

    const isSuccess = status === "success";
    const isCancel = status === "cancel";

    return (
        <main className="min-h-screen flex items-center justify-center px-6 py-16" style={{ backgroundColor: "#0d1b2e" }}>
            <div className="w-full max-w-lg rounded-2xl border border-border bg-paper shadow-sm p-8 text-center">
                {isSuccess && (
                    <>
                        <div className="text-5xl mb-4">✅</div>
                        <h1 className="font-serif text-2xl font-semibold text-navy mb-2">
                            Subscription Confirmed
                        </h1>
                        <p className="text-navy/60 mb-6">
                            Thanks for subscribing to {APP_NAME}. Your payment via{" "}
                            <span className="font-semibold capitalize text-coral">
                                {provider ?? "your provider"}
                            </span>{" "}
                            was received.
                        </p>
                    </>
                )}

                {isCancel && (
                    <>
                        <div className="text-5xl mb-4">⚠️</div>
                        <h1 className="font-serif text-2xl font-semibold text-navy mb-2">
                            Checkout Cancelled
                        </h1>
                        <p className="text-navy/60 mb-6">
                            Your subscription was not completed. No charge was made.
                        </p>
                    </>
                )}

                {!isSuccess && !isCancel && (
                    <>
                        <div className="text-5xl mb-4">❓</div>
                        <h1 className="font-serif text-2xl font-semibold text-navy mb-2">
                            Subscription Status Unknown
                        </h1>
                        <p className="text-navy/60 mb-6">
                            We couldn&apos;t determine the result of your checkout.
                            If you completed payment, it may still be processing.
                        </p>
                    </>
                )}

                <div className="text-xs text-navy/40 mb-6 space-y-0.5">
                    {provider && <p>Provider: {provider}</p>}
                    {subscriptionId && <p>Subscription ID: {subscriptionId}</p>}
                    {sessionId && <p>Session: {sessionId}</p>}
                </div>

                <div className="flex justify-center gap-3">
                    <Link
                        href="/"
                        className="rounded-lg bg-coral text-paper px-5 py-2 text-sm font-semibold hover:bg-coral-hover transition"
                    >
                        Back Home
                    </Link>

                    {isCancel && (
                        <button
                            onClick={() => history.back()}
                            className="rounded-lg border border-border-light px-5 py-2 text-sm font-semibold text-navy hover:bg-paper-dim transition"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}