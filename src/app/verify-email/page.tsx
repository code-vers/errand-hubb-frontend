"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailForResend, setEmailForResend] = useState("");
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setErrorMessage("No verification token provided.");
      return;
    }

    let isMounted = true;
    authService.verifyEmail(token)
      .then(() => {
        if (!isMounted) return;
        setStatus("success");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      })
      .catch((error: any) => {
        if (!isMounted) return;
        setStatus("error");
        setErrorMessage(error.response?.data?.message || error.message || "Invalid or expired verification link.");
      });

    return () => {
      isMounted = false;
    };
  }, [token, router]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForResend) return;

    setIsResending(true);
    try {
      await authService.resendVerification(emailForResend);
      toast.success("Verification email resent! Please check your inbox. If you do not see it, please check your spam folder.");
      setEmailForResend("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to resend verification email.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-surface-dim)] px-4">
      <div className="w-full max-w-md bg-[var(--color-background)] p-8 rounded-xl border border-[var(--color-border)] shadow-lg text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-[var(--color-primary)] animate-spin mb-4" />
            <h1 className="text-2xl font-bold text-[var(--color-secondary)]">Verifying Email</h1>
            <p className="text-[var(--color-muted)] mt-2">Please wait while we verify your email address...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-[var(--color-secondary)]">Email Verified!</h1>
            <p className="text-[var(--color-muted)] mt-2">Your email has been successfully verified.</p>
            <p className="text-sm text-[var(--color-muted)] mt-4">Redirecting to login...</p>
            <Link href="/login" className="mt-6 w-full py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors uppercase tracking-wide text-sm block">
              Go to Login Now
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <XCircle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-[var(--color-secondary)]">Verification Failed</h1>
            <p className="text-red-500 mt-2">{errorMessage}</p>

            <div className="mt-8 w-full text-left border-t border-[var(--color-border)] pt-6">
              <h3 className="text-sm font-bold text-[var(--color-secondary)] uppercase tracking-wide mb-2">Resend Verification Email</h3>
              <p className="text-xs text-[var(--color-muted)] mb-4">Enter your email below to request a new verification link.</p>
              <form onSubmit={handleResend} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={emailForResend}
                  onChange={(e) => setEmailForResend(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-md text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-1 focus:ring-[var(--color-secondary)] focus:border-[var(--color-secondary)] transition-colors bg-[var(--color-background)]"
                />
                <button
                  type="submit"
                  disabled={isResending || !emailForResend}
                  className="w-full py-3 bg-[var(--color-primary)] text-white font-bold rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors uppercase tracking-wide text-sm disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Resend Link"}
                </button>
              </form>
            </div>
            
            <Link href="/login" className="mt-6 text-sm font-bold text-[var(--color-primary)] hover:underline">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[var(--color-surface-dim)]">
        <Loader2 className="w-12 h-12 text-[var(--color-primary)] animate-spin" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
