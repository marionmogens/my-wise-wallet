import { createFileRoute, Link } from "@tanstack/react-router";
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
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
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
  return (
    <div className="relative">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-accent/30 to-transparent blur-2xl" />
      <div className="rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Saldo bulan ini</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">Rp 4.250.000</p>
          </div>
          <div className="rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">
            +12.4%
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Stat label="Pemasukan" value="Rp 8.5jt" tone="success" />
          <Stat label="Pengeluaran" value="Rp 4.25jt" tone="destructive" />
        </div>
        <div className="mt-6 space-y-3">
          {[
            { name: "Makanan", color: "#ef4444", pct: 70 },
            { name: "Transportasi", color: "#f97316", pct: 45 },
            { name: "Belanja", color: "#8b5cf6", pct: 30 },
          ].map((c) => (
            <div key={c.name}>
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>{c.name}</span>
                <span>{c.pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${c.pct}%`, backgroundColor: c.color }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-primary-soft/50 p-4">
          <div className="flex items-start gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
              <Bot className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Saran Monetra AI</p>
              <p className="mt-1 text-muted-foreground">
                Pengeluaran makanan kamu naik 18% minggu ini. Coba batasi Rp 75rb/hari ya!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "success" | "destructive" }) {
  const cls = tone === "success" ? "text-success" : "text-destructive";
  return (
    <div className="rounded-2xl border border-border bg-background p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 text-lg font-semibold ${cls}`}>{value}</p>
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
      <div className="mx-auto max-w-7xl px-6 py-20">
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
    <section id="cara-kerja" className="mx-auto max-w-7xl px-6 py-20">
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
    <section className="px-6 pb-20">
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
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground md:flex-row">
        <div className="flex items-center gap-2">
          <Logo />
          <span>© {new Date().getFullYear()} Monetra. Semua hak dilindungi.</span>
        </div>
        <p>Dibuat dengan ❤ untuk pengaturan keuangan yang lebih baik.</p>
      </div>
    </footer>
  );
}
