"use client";

import { useState } from "react";
import { login } from "@/lib/services/auth/loginService";
import DynamicPassWordResetForm from "@/components/auth/forms/DynamicPassWordResetForm";

type Mode = "login" | "forgot";

export default function DeveloperLoginForm({
    onSuccess,
}: {
    onSuccess?: () => void;
    onSwitchToRegister?: () => void;
}) {
    const [mode, setMode] = useState<Mode>("login");

    const [input, setInput] = useState({
        email: "",
        password: "",
        pin: "",
        challenge: "3",
    });

    const [authMode, setAuthMode] = useState<"password" | "pin">("password");
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    // 🔥 LOGIN
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setMessage(null);

        const result = await login({
            email: input.email,
            password: input.password,
            pin: input.pin,
            challenge: input.challenge,
            loginMethod: authMode,
            LoginProvider: "Developer",
            dashboardName: "admin",
            role: "Developer",
        });

        setLoading(false);

        if (result.error) {
            setMessage(result.error);
            return;
        }

        onSuccess?.();
    };

    // 🔥 SOCIAL LOGIN (stub)
    const handleSocialLogin = (provider: string) => {
        setMessage(`🔗 ${provider} login coming soon`);
    };

    return (
        <div className="space-y-4">

            {/* MESSAGE */}
            {message && (
                <div className="p-2 text-sm bg-gray-100 text-gray-700 rounded text-center">
                    {message}
                </div>
            )}

            {/* LOGIN */}
            {mode === "login" && (
                <form onSubmit={handleLogin} className="space-y-2">

                    <input
                        type="email"
                        placeholder="Email"
                        value={input.email}
                        onChange={(e) => setInput({ ...input, email: e.target.value })}
                        className="w-full border rounded px-3 py-2 text-sm text-black"
                        required
                    />

                    {/* AUTH TOGGLE */}
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">
                            {authMode === "password" ? "Password Login" : "PIN Login"}
                        </span>

                        <div className="flex border rounded overflow-hidden text-xs">
                            <button
                                type="button"
                                onClick={() => setAuthMode("password")}
                                className={`px-2 py-1 ${authMode === "password"
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white text-indigo-600"
                                    }`}
                            >
                                Password
                            </button>

                            <button
                                type="button"
                                onClick={() => setAuthMode("pin")}
                                className={`px-2 py-1 ${authMode === "pin"
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white text-indigo-600"
                                    }`}
                            >
                                PIN
                            </button>
                        </div>
                    </div>

                    {/* INPUT SWITCH */}
                    {authMode === "password" ? (
                        <input
                            type="password"
                            placeholder="Password"
                            value={input.password}
                            onChange={(e) =>
                                setInput({ ...input, password: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2 text-sm text-black"
                            required
                        />
                    ) : (
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="PIN"
                            value={input.pin}
                            onChange={(e) => setInput({ ...input, pin: e.target.value })}
                            className="w-full border rounded px-3 py-2 text-sm text-black text-center tracking-widest"
                            required
                        />
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-2 rounded text-sm font-semibold"
                    >
                        {loading ? "Logging In . . . ⚓" : "Submit &Log In"}
                    </button>

                    {/* LINKS */}
                    <div className="flex justify-between text-xs text-indigo-900">
                        <button type="button" onClick={() => setMode("forgot")}>
                            Forgot Password ?
                        </button>

                     
                    </div>
                </form>
            )}

            {/* RESET (REAL COMPONENT) */}
            {mode === "forgot" && (
                <DynamicPassWordResetForm
                    onBack={() => setMode("login")}
                />
            )}

            {/* SOCIAL LOGIN */}
            <div className="border-t space-y-1">

                <p className="text-xs text-center text-gray-500">
                    Or Continue With
                </p>

                <div className="grid grid-cols-3 gap-2">

                    <button
                        onClick={() => handleSocialLogin("Google")}
                        className="flex items-center justify-center gap-1 rounded py-2 text-xs font-medium text-white bg-[#DB4437]"
                    >
                        G Google
                    </button>

                    <button
                        onClick={() => handleSocialLogin("Facebook")}
                        className="flex items-center justify-center gap-1 rounded py-2 text-xs font-medium text-white bg-[#1877F2]"
                    >
                        f Facebook
                    </button>

                    <button
                        onClick={() => handleSocialLogin("LinkedIn")}
                        className="flex items-center justify-center gap-1 rounded py-2 text-xs font-medium text-white bg-[#0A66C2]"
                    >
                        in LinkedIn
                    </button>
                </div>

                {/* DROPDOWN */}
                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => setShowMore(!showMore)}
                        className="text-xs text-indigo-600 hover:text-red-600"
                    >
                        {showMore ? "Less Options ?" : "More Options ?"}
                    </button>
                </div>

                {showMore && (
                    <div className="grid grid-cols-2 gap-2 pt-2">

                        <button
                            onClick={() => handleSocialLogin("GitHub")}
                            className="rounded py-2 text-xs font-medium text-white bg-black"
                        >
                            GitHub
                        </button>

                        <button
                            onClick={() => handleSocialLogin("Twitter")}
                            className="rounded py-2 text-xs font-medium text-white bg-[#1DA1F2]"
                        >
                            Twitter
                        </button>

                        <button
                            onClick={() => handleSocialLogin("Microsoft")}
                            className="rounded py-2 text-xs font-medium text-white bg-[#2F2F2F]"
                        >
                            Microsoft
                        </button>

                        <button
                            onClick={() => handleSocialLogin("Apple")}
                            className="rounded py-2 text-xs font-medium text-white bg-black"
                        >
                            Apple
                        </button>

                    </div>
                )}
            </div>

        </div>
    );
}