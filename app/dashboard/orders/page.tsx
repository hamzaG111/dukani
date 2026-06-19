"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopBar from "@/components/dashboard/TopBar";

type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

interface Order {
  id: string;
  customer: string;
  phone: string;
  city: string;
  products: string[];
  total: number;
  status: OrderStatus;
  date: string;
  channel: string;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; bg: string; icon: string }> = {
  pending:   { label: "بانتظار التأكيد", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20", icon: "⏳" },
  confirmed: { label: "مؤكد",            color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20",   icon: "✅" },
  shipped:   { label: "في الطريق",       color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", icon: "🚚" },
  delivered: { label: "تم التسليم",      color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20", icon: "🎉" },
  cancelled: { label: "ملغى",            color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20",     icon: "❌" },
};

const orders: Order[] = [
  { id: "ORD-٠٠١", customer: "فاطمة الزهراء", phone: "0661234567", city: "كازا", products: ["جاكيت جلد الأطلس (L)"], total: 390, status: "shipped", date: "منذ ٢ ساعة", channel: "واتساب" },
  { id: "ORD-٠٠٢", customer: "كريم بنعلي", phone: "0662345678", city: "الرباط", products: ["عطر الورد المغربي", "شال كاشمير"], total: 560, status: "pending", date: "منذ ٣٠ دقيقة", channel: "انستغرام" },
  { id: "ORD-٠٠٣", customer: "سناء المنصوري", phone: "0663456789", city: "مراكش", products: ["حذاء جلد بني (٣٩)"], total: 250, status: "delivered", date: "أمس", channel: "واتساب" },
  { id: "ORD-٠٠٤", customer: "يوسف الأمين", phone: "0664567890", city: "فاس", products: ["حقيبة يد فاخرة (بني)"], total: 600, status: "confirmed", date: "منذ ٤ ساعات", channel: "فيسبوك" },
  { id: "ORD-٠٠٥", customer: "هند الرحالي", phone: "0665678901", city: "أكادير", products: ["جاكيت جلد الأطلس (M)", "حزام جلد"], total: 490, status: "pending", date: "منذ ١٠ دقائق", channel: "واتساب" },
  { id: "ORD-٠٠٦", customer: "أحمد رضا", phone: "0666789012", city: "طنجة", products: ["عطر الورد المغربي"], total: 280, status: "cancelled", date: "منذ يومين", channel: "انستغرام" },
];

const statusFlow: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered"];

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState("");

  const filtered = orders.filter(o => {
    const matchFilter = filter === "all" || o.status === filter;
    const matchSearch = !search || o.customer.includes(search) || o.id.includes(search) || o.city.includes(search);
    return matchFilter && matchSearch;
  });

  const updateStatus = (id: string, status: OrderStatus) => {
    if (selectedOrder?.id === id) setSelectedOrder(prev => prev ? { ...prev, status } : null);
  };

  const counts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  return (
    <>
      <TopBar title="الطلبيات" subtitle="تتبع وإدارة جميع طلبيات متجرك" />

      <main className="flex-1 p-6 overflow-y-auto space-y-6 max-w-5xl">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "إجمالي الطلبيات", value: orders.length, icon: "📦" },
            { label: "بانتظار التأكيد", value: counts.pending, icon: "⏳", urgent: counts.pending > 0 },
            { label: "في الطريق", value: counts.shipped, icon: "🚚" },
            { label: "إيرادات الطلبيات", value: `${orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0).toLocaleString("ar-MA")} د.م`, icon: "💰" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={`glass rounded-2xl border p-4 ${s.urgent ? "border-yellow-500/30 bg-yellow-500/5" : "border-border"}`}>
              <div className="text-xl mb-2">{s.icon}</div>
              <p className={`font-black text-xl ${s.urgent ? "text-yellow-400" : "text-gold"}`}>{s.value}</p>
              <p className="text-muted text-xs">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter tabs + search */}
        <div className="flex gap-2 flex-wrap items-center">
          <button onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === "all" ? "bg-gold text-background" : "glass border border-border text-muted"}`}>
            الكل ({counts.all})
          </button>
          {(["pending", "confirmed", "shipped", "delivered"] as OrderStatus[]).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${filter === s ? "bg-gold text-background border-gold" : `glass ${statusConfig[s].bg} ${statusConfig[s].color}`}`}>
              {statusConfig[s].icon} {statusConfig[s].label}
              {counts[s as keyof typeof counts] ? ` (${counts[s as keyof typeof counts]})` : ""}
            </button>
          ))}
          <div className="mr-auto relative">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="بحث..."
              className="glass border border-border rounded-xl px-4 py-2 text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-gold/40 pr-9 w-44" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm">🔍</span>
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-3">
          {filtered.map((order, i) => {
            const cfg = statusConfig[order.status];
            return (
              <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedOrder(order)}
                className="glass rounded-2xl border border-border p-5 hover:border-gold/20 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{cfg.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="text-foreground font-black">{order.customer}</span>
                      <span className="text-muted text-xs">{order.id}</span>
                      <span className={`text-[10px] font-black border px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                    </div>
                    <p className="text-muted text-sm">{order.products.join("، ")} • {order.city}</p>
                    <p className="text-muted text-xs mt-1">{order.channel} • {order.date}</p>
                  </div>
                  <div className="text-left flex-shrink-0">
                    <p className="text-gold font-black">{order.total.toLocaleString("ar-MA")} د.م</p>
                    <a href={`https://wa.me/${order.phone.replace(/0/, "212")}`} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="text-xs text-green-400 hover:underline">
                      واتساب
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted">لا توجد طلبيات مطابقة</div>
          )}
        </div>
      </main>

      {/* Order Detail Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#141414] border border-border rounded-3xl p-8 w-full max-w-md space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-foreground font-black text-xl">{selectedOrder.id}</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-muted hover:text-foreground text-xl">×</button>
              </div>

              {/* Status stepper */}
              <div className="flex items-center gap-1">
                {statusFlow.map((s, i) => {
                  const cfg = statusConfig[s];
                  const isActive = statusFlow.indexOf(selectedOrder.status) >= i;
                  return (
                    <div key={s} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 transition-all ${isActive ? "border-gold bg-gold/20 text-gold" : "border-border text-muted"}`}>
                        {isActive ? "✓" : i + 1}
                      </div>
                      <span className={`text-[9px] text-center leading-tight ${isActive ? "text-gold" : "text-muted"}`}>{cfg.label.split(" ")[0]}</span>
                      {i < statusFlow.length - 1 && (
                        <div className={`absolute mt-3 w-full h-px ${isActive ? "bg-gold/40" : "bg-border"}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Order info */}
              <div className="space-y-3 text-sm">
                {[
                  { label: "الزبون", value: selectedOrder.customer },
                  { label: "الهاتف", value: selectedOrder.phone },
                  { label: "المدينة", value: selectedOrder.city },
                  { label: "المنتجات", value: selectedOrder.products.join("، ") },
                  { label: "القناة", value: selectedOrder.channel },
                  { label: "الإجمالي", value: `${selectedOrder.total.toLocaleString("ar-MA")} درهم` },
                ].map(row => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-muted">{row.label}</span>
                    <span className="text-foreground font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                {selectedOrder.status === "pending" && (
                  <button onClick={() => updateStatus(selectedOrder.id, "confirmed")}
                    className="bg-gold-gradient text-background font-black py-2.5 rounded-xl text-sm col-span-2">
                    ✅ تأكيد الطلبية
                  </button>
                )}
                {selectedOrder.status === "confirmed" && (
                  <button onClick={() => updateStatus(selectedOrder.id, "shipped")}
                    className="bg-gold-gradient text-background font-black py-2.5 rounded-xl text-sm col-span-2">
                    🚚 تم الشحن
                  </button>
                )}
                {selectedOrder.status === "shipped" && (
                  <button onClick={() => updateStatus(selectedOrder.id, "delivered")}
                    className="bg-gold-gradient text-background font-black py-2.5 rounded-xl text-sm col-span-2">
                    🎉 تأكيد التسليم
                  </button>
                )}
                <a href={`https://wa.me/${selectedOrder.phone.replace(/0/, "212")}`} target="_blank" rel="noopener noreferrer"
                  className="text-center text-xs font-bold glass border border-border text-muted py-2.5 rounded-xl hover:text-foreground transition-all">
                  💬 تواصل بواتساب
                </a>
                {selectedOrder.status !== "cancelled" && selectedOrder.status !== "delivered" && (
                  <button onClick={() => updateStatus(selectedOrder.id, "cancelled")}
                    className="text-xs font-bold border border-red-500/20 text-red-400 py-2.5 rounded-xl hover:bg-red-500/10 transition-all">
                    ❌ إلغاء
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
