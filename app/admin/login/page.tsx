"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "@/components/yacht/icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "로그인에 실패했습니다.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.");
      setLoading(false);
    }
  }

  return (
    <div className="y-admin-login">
      <form className="y-card y-admin-login__card" onSubmit={handleSubmit}>
        <div className="y-logo" style={{ marginBottom: 8 }}>
          <span className="y-logo__mark">⛵</span>
          <span>
            JEJU SAILING
            <small>ADMIN CONSOLE</small>
          </span>
        </div>
        <h3 style={{ marginTop: 18 }}>운영자 로그인</h3>
        <div className="y-field">
          <label htmlFor="admin-pw">비밀번호</label>
          <input
            id="admin-pw"
            className="y-input"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error ? <p className="y-error">{error}</p> : null}
        <button type="submit" className="y-btn y-btn--primary y-btn--block" disabled={loading} aria-disabled={loading}>
          {loading ? "확인 중…" : "로그인"}
          {!loading ? <ArrowRight size={18} /> : null}
        </button>
        <p className="y-note">데모 비밀번호: jeju2026</p>
      </form>
    </div>
  );
}
