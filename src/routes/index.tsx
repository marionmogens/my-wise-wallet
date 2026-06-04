import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Wallet, PieChart, Bot, Download, Target, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Monetra — Atur Keuangan Lebih Cerdas" },
      {
        name: "description",
        content:
          "Monetra adalah money tracker modern dengan dompet harian, kategori, grafik, ekspor CSV, dan asisten AI keuangan.",
      },
      { property: "og:title", content: "Monetra — Atur Keuangan Lebih Cerdas" },
      {
        property: "og:description",
        content: "Catat pemasukan, kontrol pengeluaran harian, dan dapatkan saran AI personal.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8 md:px-12 lg:px-20">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-semibold tracking-tight">Monetra</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#fitur" className="hover:text-foreground transition-colors">Fitur</a>
          <a href="#cara-kerja" className="hover:text-foreground transition-colors">Cara Kerja</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            search={{ mode: "signin" }}
            className="rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
          >
            Mulai gratis
          </Link>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-sm">
      <span className="text-sm font-bold text-primary-foreground">M</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-8 py-16 md:grid-cols-2 md:items-center md:px-12 md:py-24 lg:px-20">
      <div className="space-y-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-soft/40 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Asisten AI keuangan personal
        </div>
        <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Atur uangmu, <span className="text-primary">tenangkan</span> pikiranmu.
        </h1>
        <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
          Monetra membantumu mencatat pemasukan & pengeluaran, mengatur dompet harian,
          dan memahami kebiasaan finansial lewat grafik dan saran AI.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            Buat akun gratis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#fitur"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
          >
            Lihat fitur
          </a>
        </div>
        <div className="flex items-center gap-6 pt-2 text-xs text-muted-foreground">
          <span>✓ Tanpa kartu kredit</span>
          <span>✓ Data terenkripsi</span>
          <span>✓ Ekspor CSV</span>
        </div>
      </div>

      <HeroMock />
    </section>
  );
}

function HeroMock() {
  const bars = [38, 62, 45, 78, 55, 90, 68];
  const days = ["S", "S", "R", "K", "J", "S", "M"];
  return (
    <div className="relative">
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-accent/30 to-transparent blur-3xl" />

      {/* Laptop */}
      <div className="relative mx-auto w-full max-w-xl">
        {/* Screen bezel */}
        <div className="rounded-t-2xl border border-border bg-neutral-900 p-3 shadow-2xl shadow-primary/20">
          {/* Camera dot */}
          <div className="mx-auto mb-2 h-1.5 w-1.5 rounded-full bg-neutral-700" />
          {/* Screen content */}
          <div className="overflow-hidden rounded-lg bg-card">
            {/* Mini toolbar */}
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              <div className="ml-3 flex-1 truncate rounded bg-background/70 px-2 py-0.5 text-[10px] text-muted-foreground">
                monetra.app/dashboard
              </div>
            </div>

            {/* App body */}
            <div className="grid grid-cols-5 gap-3 p-4">
              {/* Chart card */}
              <div className="col-span-3 rounded-xl border border-border bg-background p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Saldo</p>
                    <p className="text-base font-semibold tracking-tight">Rp 4.250.000</p>
                  </div>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-medium text-success">
                    +12.4%
                  </span>
                </div>
                {/* Bar chart */}
                <div className="mt-3 flex h-20 items-end gap-1.5">
                  {bars.map((h, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-primary to-accent"
                        style={{ height: `${h}%` }}
                      />
                      <span className="text-[8px] text-muted-foreground">{days[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chatbot card */}
              <div className="col-span-2 flex flex-col rounded-xl border border-border bg-background p-3">
                <div className="flex items-center gap-2">
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-3 w-3" />
                  </div>
                  <p className="text-xs font-medium">Monetra AI</p>
                </div>
                <div className="mt-2 space-y-1.5">
                  <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-primary px-2 py-1 text-[10px] text-primary-foreground">
                    Berapa budget makanan?
                  </div>
                  <div className="max-w-[90%] rounded-lg rounded-tl-sm bg-muted px-2 py-1 text-[10px] text-foreground">
                    Sisa Rp 320rb minggu ini. Coba batasi Rp 75rb/hari ya!
                  </div>
                </div>
                <div className="mt-auto flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1">
                  <span className="flex-1 truncate text-[10px] text-muted-foreground">Tanya AI…</span>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                </div>
              </div>

              {/* Category bars row */}
              <div className="col-span-5 grid grid-cols-3 gap-2">
                {[
                  { name: "Makanan", color: "#ef4444", pct: 70 },
                  { name: "Transport", color: "#f97316", pct: 45 },
                  { name: "Belanja", color: "#8b5cf6", pct: 30 },
                ].map((c) => (
                  <div key={c.name} className="rounded-lg border border-border bg-background p-2">
                    <div className="flex justify-between text-[9px] text-muted-foreground">
                      <span>{c.name}</span>
                      <span>{c.pct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Laptop base */}
        <div className="relative mx-auto h-3 w-[108%] -translate-x-[3.7%] rounded-b-2xl bg-gradient-to-b from-neutral-800 to-neutral-700 shadow-xl">
          <div className="absolute left-1/2 top-1 h-1 w-16 -translate-x-1/2 rounded-full bg-neutral-900/60" />
        </div>
        <div className="mx-auto h-1 w-[60%] rounded-b-xl bg-neutral-700/40" />
      </div>
    </div>
  );
}


const features = [
  { icon: Wallet, title: "Dompet harian", desc: "Tetapkan batas pengeluaran per hari dan lihat sisa real-time." },
  { icon: PieChart, title: "Grafik visual", desc: "Pahami arus kas lewat chart kategori dan tren bulanan." },
  { icon: Target, title: "Kategori fleksibel", desc: "Buat kategori sendiri dengan warna khas untuk setiap budget." },
  { icon: Bot, title: "Asisten AI", desc: "Tanya apa saja soal keuangan, dapatkan saran personal." },
  { icon: Download, title: "Ekspor CSV", desc: "Unduh laporan bulanan untuk dianalisis di Excel atau alat lain." },
  { icon: Sparkles, title: "Desain bersih", desc: "Antarmuka ringan terinspirasi iOS, nyaman dipakai harian." },
];

function Features() {
  return (
    <section id="fitur" className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-8 py-20 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Fitur</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Semua yang kamu butuh untuk kendali keuangan.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dari pencatatan harian hingga insight AI — semua dalam satu dashboard yang rapi.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Buat akun", desc: "Daftar dalam 30 detik dengan email & password." },
    { n: "02", title: "Catat transaksi", desc: "Tambahkan pemasukan / pengeluaran dengan kategori." },
    { n: "03", title: "Pantau & dapatkan saran", desc: "Lihat grafik dan tanya AI untuk insight finansial." },
  ];
  return (
    <section id="cara-kerja" className="mx-auto max-w-7xl px-8 py-20 md:px-12 lg:px-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-start">
        <div>
          <p className="text-sm font-medium text-primary">Cara kerja</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Mulai dalam tiga langkah sederhana.
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Tidak perlu spreadsheet rumit. Monetra dibuat agar mencatat keuangan terasa ringan.
          </p>
        </div>
        <div className="space-y-3">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-4 rounded-3xl border border-border bg-card p-5">
              <div className="text-2xl font-semibold text-primary/70">{s.n}</div>
              <div>
                <h3 className="font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-8 pb-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-primary via-primary to-accent p-10 text-primary-foreground shadow-2xl shadow-primary/30 md:p-16">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              Siap punya kontrol penuh atas keuanganmu?
            </h2>
            <p className="mt-3 max-w-lg text-primary-foreground/80">
              Gratis, mudah, dan dirancang untuk kebiasaan harian.
            </p>
          </div>
          <Link
            to="/auth"
            search={{ mode: "signup" }}
            className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground shadow-lg hover:bg-background/90 transition-all"
          >
            Mulai sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-8 py-8 text-xs text-muted-foreground md:flex-row md:px-12 lg:px-20">
        <div className="flex items-center gap-2">
          <Logo />
          <span>© {new Date().getFullYear()} Monetra. Semua hak dilindungi.</span>
        </div>
        <p>Dibuat dengan ❤ untuk pengaturan keuangan yang lebih baik.</p>
      </div>
    </footer>
  );
}
