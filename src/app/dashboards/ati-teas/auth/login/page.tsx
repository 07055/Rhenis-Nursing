'use client';

import { useState } from 'react';
import { useFlexPageClasp } from "@/lib/contexts/panel/layout/utils/FlexPageClasp";
import { APP_TITLE } from "@/lib/config/config";
import { login } from "@/lib/services/auth/loginService";

const TARGET_DASHBOARD = "ati-teas";

interface LoginInput {
  email: string;
  password: string;
  challenge: string;
  pin: string; // PIN must be string for input handling
}

export default function DeveloperLoginPage() {
  const [input, setInput] = useState<LoginInput>({
    email: '',
    password: '',
    challenge: "8",
    pin: '',
  });

  const [message, setMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [lockoutMinutes, setLockoutMinutes] = useState<number | null>(null);
  const [authMode, setAuthMode] = useState<'password' | 'pin'>('password');


  const appName = APP_TITLE;

  const {
    isClient,
    isLightContent,
    leftWidth,
    rightWidth,
    navHeight,
    effectiveContentTheme,
  } = useFlexPageClasp();

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */


  /* ------------------------------------------------------------------ */
  /* Effects                                                             */
  /* ------------------------------------------------------------------ */


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage(null);
    setSuccessMessage(null);
    setRemainingAttempts(null);
    setLockoutMinutes(null);

    const result = await login({
      email: input.email,
      password: authMode === "password" ? input.password : "",
      pin: authMode === "pin" ? input.pin : "",
      challenge: input.challenge,
      loginMethod: authMode,
      LoginProvider: "Developer",
      loginProviderPayload: "Void",
      dashboardName: "AtiTeas",
      role: "Developer",
      remember: true,
    });

    if (result.error) {
      setMessage(result.error);
      return;
    }

    setSuccessMessage("You've Logged in Successfully 🏌️‍♂️");

    if (result.redirect_url) {
      window.location.href = result.redirect_url;
    }
  };



  if (!isClient) {
    return <div className="pt-16 min-h-[calc(100vh-64px)] w-full" />;
  }

  return (
    <main
      className={`pt-16 transition-all duration-300 ease-in-out overflow-x-hidden flex flex-col items-center justify-center relative ${isLightContent ? "bg-white text-gray-900" : "bg-gray-900 text-white"
        }`}
      style={{
        marginLeft: leftWidth,
        marginRight: rightWidth,
        minHeight: `calc(100vh - ${navHeight}px)`,
        backgroundColor:
          effectiveContentTheme === "custom"
            ? "var(--content-bg)"
            : undefined,
        color:
          effectiveContentTheme === "custom"
            ? "var(--content-text)"
            : undefined,
      }}
    >
      <div className={`w-full`}>

        {/* Header */}
        <div className="text-center mb-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 border border-indigo-400 rounded-xl shadow-md py-1">
          <h2 className="text-xl font-bold text-indigo-900">{appName}</h2>
          <p className="text-sm text-indigo-700">{new Date().toLocaleString()}</p>
        </div>

        <div className="w-full flex justify-center mb-2 mt-2">
          <div className="px-4 py-1 rounded-full shadow-md border border-red-300 bg-gradient-to-r from-red-100 via-rose-100 to-pink-100 text-red-700 text-sm font-semibold">
            You are Not Logged In — Kindly Sign In to Access Full Resources 🏌️‍♂️
          </div>
        </div>

        <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-indigo-600 to-indigo-200 pt-2 px-8 pb-8 rounded-xl">
          <div className="w-full max-w-md bg-gradient-to-br from-indigo-100 via-purple-100 to-indigo-200 shadow-2xl rounded-xl p-8 mt-[-5px] relative transition-all duration-300 hover:shadow-indigo-500/50">
            <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 tracking-wide drop-shadow">
              {appName}
            </h2>

            {remainingAttempts !== null && remainingAttempts > 0 && (
              <div className="bg-yellow-100 text-yellow-800 p-2 rounded mb-4 text-center text-sm shadow-inner">
                Remaining login attempts: {remainingAttempts}
              </div>
            )}

            {lockoutMinutes !== null && lockoutMinutes > 0 && (
              <div className="bg-red-200 text-red-800 p-2 rounded mb-4 text-center text-sm shadow-inner">
                Account is locked. Try again in {lockoutMinutes} minutes.
              </div>
            )}

            {(message || successMessage) && (
              <div className="w-full flex justify-center">
                <div className="mb-4 p-3 bg-green-700 text-green-100 rounded-md text-center w-full">
                  {message ?? successMessage}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center w-full">
                <label className="mb-1 font-medium text-gray-700 w-full text-center">Enter Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={input.email}
                  onChange={(e) => setInput({ ...input, email: e.target.value })}
                  className="border border-gray-800 text-black rounded px-4 py-2 w-full text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                  required
                />
              </div>
              {/* PASSWORD / PIN */}
              {authMode === 'password' ? (
                <div className="flex flex-col w-full">
                  {/* LABEL + TOGGLE ROW */}
                  <div className="flex items-center justify-between mb-1 w-full">
                    <label className="font-medium text-gray-700">
                      Enter Password
                    </label>

                    <div className="inline-flex rounded-lg border overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setAuthMode('password')}
                        className={`px-3 py-1 text-xs font-semibold transition ${authMode === 'password'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-indigo-600'
                          }`}
                      >
                        Password
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuthMode('pin')}
                        className="px-3 py-1 text-xs font-semibold transition bg-indigo-600 text-white"
                      >
                        PIN
                      </button>
                    </div>
                  </div>

                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={input.password}
                    onChange={(e) => setInput({ ...input, password: e.target.value })}
                    className="border border-gray-800 text-black rounded px-4 py-2 w-full text-center"
                    required
                  />
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  {/* LABEL + TOGGLE ROW */}
                  <div className="flex items-center justify-between mb-1 w-full">
                    <label className="font-medium text-gray-700">
                      Enter PIN
                    </label>

                    <div className="inline-flex rounded-lg border overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setAuthMode('password')}
                        className="px-3 py-1 text-xs font-semibold transition bg-white text-indigo-600"
                      >
                        Password
                      </button>

                      <button
                        type="button"
                        onClick={() => setAuthMode('pin')}
                        className={`px-3 py-1 text-xs font-semibold transition ${authMode === 'pin'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-indigo-600'
                          }`}
                      >
                        PIN
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={input.pin}
                    onChange={(e) => setInput({ ...input, pin: e.target.value })}
                    className="border border-gray-800 text-black rounded px-4 py-2 w-full text-center tracking-widest"
                    required
                  />
                </div>
              )}


              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Submit & Log In
              </button>
            </form>

            <div className="mt-6 flex flex-row space-x-3 w-full">
              <a
                href={`/dashboards/${TARGET_DASHBOARD}/auth/recovery/password`}
                className="flex-1 text-center bg-white border border-indigo-600 text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
              >
                Forgot Password ?
              </a> <a
                href={`/dashboards/${TARGET_DASHBOARD}/auth/register`}
                className="flex-1 text-center bg-white border border-indigo-600 text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300"
              >
                Register ?
              </a>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
