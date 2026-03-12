"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, Phone, Eye, EyeOff, Building2, CheckCircle } from "lucide-react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function GirisPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Giriş form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Kayıt form state
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!auth) {
        setError("Firebase yapılandırması eksik. Lütfen .env.local dosyasını kontrol edin.");
        setLoading(false);
        return;
      }

      // Firebase Authentication ile giriş yap
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      const firebaseUser = userCredential.user;

      // Temel kullanıcı bilgilerini hemen oluştur
      const basicUserData = {
        id: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
      };

      // Token al (forceRefresh: false ile cache'den al, daha hızlı)
      const token = await firebaseUser.getIdToken(false);

      // LocalStorage'a hemen kaydet (kullanıcıyı hızlıca yönlendirmek için)
      localStorage.setItem("user_token", token);
      localStorage.setItem("user_data", JSON.stringify(basicUserData));
      localStorage.setItem("firebase_user", JSON.stringify({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
      }));

      // Custom event dispatch et (Header'ın güncellenmesi için)
      window.dispatchEvent(new CustomEvent("userDataUpdated"));

      setSuccess("Giriş başarılı! Yönlendiriliyorsunuz...");
      setLoading(false);

      // Kullanıcıyı yönlendir
      setTimeout(() => {
        router.push("/");
        router.refresh(); // Ensure header state updates
      }, 1000);

      // Firestore'dan kullanıcı bilgilerini arka planda al (opsiyonel - hata olsa bile devam et)
      if (db) {
        // Promise'i await etmeden arka planda çalıştır
        getDoc(doc(db, "users", firebaseUser.uid))
          .then((userDoc) => {
            if (userDoc.exists()) {
              const fullUserData = {
                ...basicUserData,
                ...userDoc.data(),
              };
              // LocalStorage'ı güncelle
              localStorage.setItem("user_data", JSON.stringify(fullUserData));
              // Custom event dispatch et (Header'ın güncellenmesi için)
              window.dispatchEvent(new CustomEvent("userDataUpdated"));
              console.log("✅ Firestore'dan kullanıcı bilgileri alındı (arka planda)");
            }
          })
          .catch((firestoreError: any) => {
            // Firestore hatası olsa bile sessizce devam et
            console.warn("⚠️ Firestore'dan kullanıcı bilgileri alınamadı (offline olabilir):", firestoreError.message);
          });
      }
    } catch (err: any) {
      console.error("Login error:", err);

      let errorMessage = "Giriş başarısız";
      if (err.code === "auth/user-not-found") {
        errorMessage = "Kullanıcı bulunamadı";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "Şifre hatalı";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Geçersiz e-posta adresi";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Çok fazla deneme. Lütfen daha sonra tekrar deneyin.";
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (registerData.password !== registerData.confirmPassword) {
      setError("Şifreler eşleşmiyor");
      return;
    }

    if (registerData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır");
      return;
    }

    if (!registerData.acceptTerms) {
      setError("Kullanım şartlarını kabul etmelisiniz");
      return;
    }

    setLoading(true);

    try {
      if (!auth || !db) {
        setError("Firebase yapılandırması eksik. Lütfen .env.local dosyasını kontrol edin.");
        setLoading(false);
        return;
      }

      console.log("Kayıt işlemi başlatılıyor...");

      // Firebase Authentication ile kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );
      const firebaseUser = userCredential.user;
      console.log("Kullanıcı oluşturuldu:", firebaseUser.uid);

      // Firestore'a kullanıcı bilgilerini kaydet
      const userData = {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        phone: registerData.phone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Firestore'a kaydet (Timeout ile)
      let firestoreErrorOccurred = false;
      try {
        console.log("Firestore'a yazma işlemi başlatılıyor...");

        // Timeout promise
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Firestore timeout")), 5000)
        );

        // Race condition: 5 saniye içinde yazamazsa devam et
        await Promise.race([
          setDoc(doc(db, "users", firebaseUser.uid), userData),
          timeoutPromise
        ]);

        console.log("✅ Firestore'a başarıyla kaydedildi");
      } catch (firestoreError: any) {
        firestoreErrorOccurred = true;
        console.error("❌ Firestore kayıt hatası:", firestoreError);
        console.warn("Kullanıcı oluşturuldu ancak profil detayları kaydedilemedi (internet yavaş olabilir).");
      }

      // Token al
      const token = await firebaseUser.getIdToken();
      console.log("Token alındı");

      // LocalStorage'a kaydet
      localStorage.setItem("user_token", token);
      localStorage.setItem("user_data", JSON.stringify({
        id: firebaseUser.uid,
        ...userData,
      }));
      localStorage.setItem("firebase_user", JSON.stringify({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
      }));

      // Custom event dispatch et (Header'ın güncellenmesi için)
      window.dispatchEvent(new CustomEvent("userDataUpdated"));

      console.log("LocalStorage'a kaydedildi");

      // Loading state'i kapat ve başarı mesajını göster
      setLoading(false);

      if (firestoreErrorOccurred) {
        setSuccess("Kullanıcı oluşturuldu! Yönlendiriliyorsunuz...");
      } else {
        setSuccess("Kayıt başarılı! Yönlendiriliyorsunuz...");
      }

      // Yönlendirme
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);

    } catch (err: any) {
      console.error("Register error:", err);
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);

      // Loading state'i mutlaka kapat
      setLoading(false);

      let errorMessage = "Kayıt başarısız";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "Bu e-posta adresi zaten kullanılıyor";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Geçersiz e-posta adresi";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Şifre çok zayıf";
      } else if (err.code === "auth/network-request-failed") {
        errorMessage = "Ağ hatası. İnternet bağlantınızı kontrol edin.";
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-[#b7b1ad] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo ve Başlık */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] rounded-2xl mb-4 shadow-xl">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </h1>
          <p className="text-white/80">
            {isLogin
              ? "Hesabınıza giriş yapın"
              : "Yeni hesap oluşturun ve emlak dünyasına katılın"}
          </p>
        </div>

        {/* Tab Butonları */}
        <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
          <button
            onClick={() => {
              setIsLogin(true);
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${isLogin
                ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
              setSuccess("");
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${!isLogin
                ? "bg-gradient-to-r from-[#2e3c3a] via-[#3a4d4a] to-[#2e3c3a] text-white shadow-lg"
                : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
          >
            Kayıt Ol
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              {success}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-transparent text-white placeholder-white/50"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-transparent text-white placeholder-white/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#2e3c3a] border-white/30 rounded focus:ring-[#2e3c3a]"
                  />
                  <span className="text-sm text-white/80">Beni hatırla</span>
                </label>
                <Link href="/sifre-sifirla" className="text-sm text-white/80 hover:text-white transition-colors">
                  Şifremi unuttum
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#2e3c3a' }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#3a4d4a';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#2e3c3a';
                }}
              >
                {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Ad
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                    <input
                      type="text"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-transparent text-white placeholder-white/50"
                      placeholder="Adınız"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Soyad
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                    <input
                      type="text"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-transparent text-white placeholder-white/50"
                      placeholder="Soyadınız"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-transparent text-white placeholder-white/50"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Telefon
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                  <input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-transparent text-white placeholder-white/50"
                    placeholder="0555 123 45 67"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-transparent text-white placeholder-white/50"
                    placeholder="En az 6 karakter"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Şifre Tekrar
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                    className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e3c3a] focus:border-transparent text-white placeholder-white/50"
                    placeholder="Şifrenizi tekrar girin"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registerData.acceptTerms}
                    onChange={(e) => setRegisterData({ ...registerData, acceptTerms: e.target.checked })}
                    required
                    className="mt-1 w-5 h-5 text-[#2e3c3a] border-white/30 rounded focus:ring-[#2e3c3a] focus:ring-2"
                  />
                  <span className="text-sm text-white/80">
                    <Link href="/kvkk" target="_blank" className="text-white hover:underline font-medium">
                      Kullanım şartlarını
                    </Link> ve{" "}
                    <Link href="/kvkk" target="_blank" className="text-white hover:underline font-medium">
                      gizlilik politikasını
                    </Link> kabul ediyorum *
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#2e3c3a' }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#3a4d4a';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#2e3c3a';
                }}
              >
                {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
              </button>
            </form>
          )}

          {/* Alt Linkler */}
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            {isLogin ? (
              <p className="text-sm text-white/70">
                Hesabınız yok mu?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-white font-semibold hover:underline"
                >
                  Kayıt Ol
                </button>
              </p>
            ) : (
              <p className="text-sm text-white/70">
                Zaten hesabınız var mı?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-white font-semibold hover:underline"
                >
                  Giriş Yap
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Ana Sayfaya Dön */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-white/70 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
          >
            <span>←</span>
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
