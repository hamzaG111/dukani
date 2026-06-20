"use client";

import { motion } from "framer-motion";

const tweets = [
  {
    name: "محمد الزياني",
    handle: "@m_ziani_casablanca",
    avatar: "مز",
    text: "صدقوني — بدأت باستخدام دُكّاني الأسبوع الماضي وبعت 3 أزواج جبادور في أول يوم بدون ما أرد على أي رسالة بنفسي. الذكاء الاصطناعي فاهم الدارجة زعما بشر! 🔥",
    time: "منذ 3 ساعات",
    likes: 248,
    verified: true,
    highlight: true,
  },
  {
    name: "سلمى بنعبدالله",
    handle: "@salma.boutique.fes",
    avatar: "سب",
    text: "كنت خايفة تكون معقدة بصح 5 دقائق وكان متجري جاهز. أحسن استثمار درت في حياتي لمتجري 💯",
    time: "منذ 5 ساعات",
    likes: 189,
    verified: true,
    highlight: false,
  },
  {
    name: "يوسف الكنزاوي",
    handle: "@yousef.honey.marrakech",
    avatar: "يك",
    text: "المساعد الذكي رد على عميل الساعة 3 الصبح وباع له عسل بـ450 درهم. أنا كنت نايم 😂 هذا هو المستقبل",
    time: "منذ يوم",
    likes: 512,
    verified: false,
    highlight: false,
  },
  {
    name: "نجاة الإدريسي",
    handle: "@najat.handmade",
    avatar: "نإ",
    text: "كنت نخسر عملاء كيمشيو لمنافسيي لأني ما كنتش نرد بزربة. دابا ما عاد شي واحد يفوتني. مبيعاتي زادو 80٪ ف شهر واحد 📈",
    time: "منذ يومين",
    likes: 334,
    verified: true,
    highlight: false,
  },
  {
    name: "عمر المنصوري",
    handle: "@omar_fashion_rabat",
    avatar: "عم",
    text: "جربت Tidio و Intercom قبل. غالية ومعقدة وما كيفهموش العربية. دُكّاني الوحيد اللي فاهم زبائني المغاربة بالدارجة",
    time: "منذ 3 أيام",
    likes: 421,
    verified: true,
    highlight: true,
  },
  {
    name: "خديجة التوارغي",
    handle: "@khadija.cosmetics",
    avatar: "خت",
    text: "ولات عندي وكيلة مبيعات ذكية شادة مكانتي على مدار الساعة. والله هاد الشي مكيوجدش 🌙",
    time: "منذ 4 أيام",
    likes: 267,
    verified: false,
    highlight: false,
  },
  {
    name: "رشيد بنحمو",
    handle: "@rachid.electronics.agadir",
    avatar: "رب",
    text: "العملاء كيقولو ليا 'خدمتكم رائعة وجوابكم سريع' وهما ما عارفينش راه الذكاء الاصطناعي كيجاوبهم 😄 هاد المنتوج قاتل",
    time: "منذ أسبوع",
    likes: 198,
    verified: true,
    highlight: false,
  },
  {
    name: "فاطمة الزهراء",
    handle: "@fatima.bijoux.tanger",
    avatar: "فز",
    text: "بغيت نقول شكراً لفريق دُكّاني. حلوتو مشكلة كانت عندي من سنين. دابا نقدر نتركز على تصنيع المجوهرات وهو كيبيع عوضا عني ✨",
    time: "منذ أسبوع",
    likes: 445,
    verified: true,
    highlight: false,
  },
  {
    name: "حسن الغزلاني",
    handle: "@hassan.furniture.meknes",
    avatar: "حغ",
    text: "ROI ديالي ف أول شهر: دفعت 149 درهم واسترجعت 3800 درهم من مبيعات كانت غادي تضيع. 25x return 💰",
    time: "منذ أسبوع",
    likes: 678,
    verified: true,
    highlight: true,
  },
];

function TweetCard({ tweet, delay }: { tweet: typeof tweets[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`glass rounded-2xl border p-5 break-inside-avoid mb-4 ${
        tweet.highlight ? "border-gold/30 bg-gold/5" : "border-border"
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-background font-black text-sm flex-shrink-0">
          {tweet.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-foreground font-bold text-sm truncate">{tweet.name}</span>
            {tweet.verified && (
              <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            )}
          </div>
          <p className="text-muted text-xs">{tweet.handle}</p>
        </div>
        <svg className="w-5 h-5 text-muted/40 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.735-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>
      <p className="text-foreground/85 text-sm leading-relaxed mb-3">{tweet.text}</p>
      <div className="flex items-center justify-between text-muted text-xs">
        <span>{tweet.time}</span>
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="font-semibold">{tweet.likes}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function WallOfLove() {
  const col1 = tweets.filter((_, i) => i % 3 === 0);
  const col2 = tweets.filter((_, i) => i % 3 === 1);
  const col3 = tweets.filter((_, i) => i % 3 === 2);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-40" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-gold text-sm font-semibold tracking-widest uppercase mb-4 block">آراء التجار</span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            2000+ تاجر
            <br /><span className="text-gold-gradient">يحبون دُكّاني</span>
          </h2>
          <p className="text-muted text-lg">لا تصدقنا — اقرأ ما يقوله التجار أنفسهم</p>
        </motion.div>

        {/* Desktop: 3-column masonry */}
        <div className="hidden md:grid grid-cols-3 gap-4">
          <div>{col1.map((t, i) => <TweetCard key={t.handle} tweet={t} delay={i * 0.08} />)}</div>
          <div className="mt-8">{col2.map((t, i) => <TweetCard key={t.handle} tweet={t} delay={i * 0.08 + 0.1} />)}</div>
          <div>{col3.map((t, i) => <TweetCard key={t.handle} tweet={t} delay={i * 0.08 + 0.2} />)}</div>
        </div>

        {/* Mobile: single column, show first 4 */}
        <div className="md:hidden space-y-4">
          {tweets.slice(0, 4).map((t, i) => <TweetCard key={t.handle} tweet={t} delay={i * 0.08} />)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-gold-gradient text-background font-black px-8 py-4 rounded-2xl text-lg hover:shadow-gold-strong transition-all hover:-translate-y-0.5"
          >
            انضم إليهم الآن
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
