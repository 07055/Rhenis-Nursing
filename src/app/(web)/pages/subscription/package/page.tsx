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
        <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-gradient-to-b from-slate-50 to-white">
            <div className="w-full max-w-lg rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
                {isSuccess && (
                    <>
                        <div className="text-5xl mb-4">✅</div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            Subscription Confirmed
                        </h1>
                        <p className="text-slate-600 mb-6">
                            Thanks for subscribing to {APP_NAME}. Your payment via{" "}
                            <span className="font-semibold capitalize">
                                {provider ?? "your provider"}
                            </span>{" "}
                            was received.
                        </p>
                    </>
                )}

                {isCancel && (
                    <>
                        <div className="text-5xl mb-4">⚠️</div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            Checkout Cancelled
                        </h1>
                        <p className="text-slate-600 mb-6">
                            Your subscription was not completed. No charge was made.
                        </p>
                    </>
                )}

                {!isSuccess && !isCancel && (
                    <>
                        <div className="text-5xl mb-4">❓</div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">
                            Subscription Status Unknown
                        </h1>
                        <p className="text-slate-600 mb-6">
                            We couldn&apos;t determine the result of your checkout.
                            If you completed payment, it may still be processing.
                        </p>
                    </>
                )}

                <div className="text-xs text-slate-400 mb-6 space-y-0.5">
                    {provider && <p>Provider: {provider}</p>}
                    {subscriptionId && <p>Subscription ID: {subscriptionId}</p>}
                    {sessionId && <p>Session: {sessionId}</p>}
                </div>

                <div className="flex justify-center gap-3">
                    <Link
                        href="/"
                        className="rounded-lg bg-slate-800 text-white px-5 py-2 text-sm font-semibold hover:bg-slate-700 transition"
                    >
                        Back Home
                    </Link>

                    {isCancel && (
                        <button
                            onClick={() => history.back()}
                            className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold hover:bg-slate-50 transition"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}