"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Loader2,
  MapPin,
  Navigation,
  Phone,
  ShoppingBasket,
  Smartphone,
  User,
  Wallet,
  X,
} from "lucide-react";
import {
  buildWhatsAppMessage,
  calcDeliveryCost,
  calcDistanceKm,
  DeliveryType,
  OrderDetails,
  PaymentMethod,
} from "@/lib/deliveryUtils";

// استدعاء الخريطة بشكل ديناميكي
const MapPicker = dynamic(() => import("./MapPicker"), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-zinc-100 animate-pulse flex items-center justify-center font-bold">جاري تحميل الخريطة...</div>
});

const PHONE_INTERNATIONAL = "201505084968";

interface Props {
  item: { name: string; price: number } | null;
  onClose: () => void;
  isOpen: boolean;
}

type Step = 1 | 2 | 3;

const STEP_LABELS: Record<Step, string> = {
  1: "بياناتك",
  2: "موقعك",
  3: "الدفع",
};

export default function OrderModal({ item, onClose, isOpen }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [tooFar, setTooFar] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // سكرول لفوق عند تغيير الخطوة
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [step]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  function applyLocation(latitude: number, longitude: number) {
    setLat(latitude);
    setLng(longitude);
    const dist = calcDistanceKm(latitude, longitude);
    setDistanceKm(Math.round(dist * 10) / 10);
    const cost = calcDeliveryCost(dist);
    if (cost === null) {
      setTooFar(true);
      setDeliveryCost(null);
    } else {
      setTooFar(false);
      setDeliveryCost(cost);
    }
  }

  const step1Valid = () => name.trim().length >= 3 && phone.trim().length >= 11;
  const step2Valid = () => deliveryType === "pickup" || (address.trim().length >= 5 && lat !== null && !tooFar);

  const totalPrice = useMemo(() => {
    return (item?.price || 0) + (deliveryType === "delivery" ? (deliveryCost ?? 0) : 0);
  }, [item, deliveryType, deliveryCost]);

  function handleConfirm() {
    if (!item) return;
    const order: OrderDetails = {
      itemName: item.name,
      itemPrice: item.price,
      customerName: name,
      customerPhone: phone,
      deliveryType,
      address: deliveryType === "delivery" ? address : undefined,
      lat: deliveryType === "delivery" ? (lat ?? undefined) : undefined,
      lng: deliveryType === "delivery" ? (lng ?? undefined) : undefined,
      deliveryCost: deliveryType === "delivery" ? (deliveryCost ?? 0) : undefined,
      paymentMethod,
      notes: notes || undefined,
    };
    const msg = buildWhatsAppMessage(order);
    window.open(`https://wa.me/${PHONE_INTERNATIONAL}?text=${encodeURIComponent(msg)}`, "_blank");
    onClose();
  }

  if (!isOpen || !item) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-200 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center p-0 sm:p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-t-[2.5rem] bg-white shadow-2xl sm:rounded-[2.5rem] flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="shrink-0 border-b border-zinc-100 px-6 pt-6 pb-4">
          <button onClick={onClose} className="absolute top-5 left-5 h-9 w-9 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition">
            <X size={18} />
          </button>
          <p className="text-center text-[10px] font-black tracking-[0.2em] text-red-500 uppercase">Easy Pizza</p>
          <h2 className="mt-1 text-center text-xl font-black text-zinc-950">تفاصيل الطلب</h2>
          
          {/* Stepper */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {([1, 2, 3] as Step[]).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-all ${step === s ? "bg-zinc-950 text-white" : step > s ? "bg-emerald-500 text-white" : "bg-zinc-100 text-zinc-400"}`}>
                  {step > s ? <CheckCircle2 size={14} /> : s}
                </div>
                <span className={`text-[11px] font-bold ${step === s ? "text-zinc-900" : "text-zinc-400"}`}>{STEP_LABELS[s]}</span>
                {s < 3 && <div className={`h-px w-6 ${step > s ? "bg-emerald-400" : "bg-zinc-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 scroll-smooth">
          {step === 1 && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-zinc-50 p-4 flex items-center gap-4">
                <div className="h-12 w-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                  <ShoppingBasket size={24} />
                </div>
                <div>
                  <p className="text-xs font-black text-zinc-400">المنتج المختار</p>
                  <p className="font-black text-zinc-950">{item.name}</p>
                </div>
                <p className="mr-auto font-black text-red-600">{item.price} ج</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-black text-zinc-700">الاسم بالكامل</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="اكتب اسمك هنا..." className="w-full rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3.5 font-bold outline-none focus:border-red-400 focus:bg-white transition" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-black text-zinc-700">رقم الموبايل</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01xxxxxxxxx" dir="ltr" className="w-full rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3.5 font-bold outline-none focus:border-red-400 focus:bg-white transition" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-black text-zinc-700">طريقة الاستلام</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["delivery", "pickup"] as const).map((t) => (
                      <button key={t} onClick={() => setDeliveryType(t)} className={`rounded-2xl border-2 p-3 transition-all ${deliveryType === t ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-100 bg-zinc-50 text-zinc-500"}`}>
                        <span className="block text-xl mb-1">{t === "delivery" ? "🛵" : "🏪"}</span>
                        <span className="text-xs font-black">{t === "delivery" ? "توصيل للمنزل" : "استلام من الفرع"}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              {deliveryType === "pickup" ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-5xl">🏪</div>
                  <h3 className="text-lg font-black">فرع مصر الجديدة</h3>
                  <p className="text-zinc-500 font-bold px-10">١ ش أحمد سنان، سانت فاتيما، مصر الجديدة</p>
                  <button className="bg-zinc-100 hover:bg-zinc-200 px-6 py-2 rounded-full font-black text-sm transition">فتح الخريطة</button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-black text-zinc-700">
                      <MapPin size={16} className="text-red-500" /> حدد موقعك على الخريطة
                    </label>
                    <div className="h-64 w-full rounded-[2rem] overflow-hidden border-4 border-zinc-100 shadow-inner relative">
                      <MapPicker 
                        onLocationSelect={applyLocation} 
                        initialLat={lat || undefined} 
                        initialLng={lng || undefined} 
                      />
                    </div>
                  </div>

                  {distanceKm !== null && !tooFar && (
                    <div className="bg-emerald-50 border-2 border-emerald-100 rounded-2xl p-4 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black text-emerald-600 uppercase">المسافة التقريبية</p>
                        <p className="font-black text-emerald-900">{distanceKm} كيلو متر</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-emerald-600 uppercase">تكلفة التوصيل</p>
                        <p className="font-black text-emerald-900">{deliveryCost === 0 ? "مجاني 🎉" : `${deliveryCost} جنيه`}</p>
                      </div>
                    </div>
                  )}

                  {tooFar && (
                    <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-4 text-center">
                      <p className="text-sm font-black text-red-600">عفواً، إنت خارج نطاق التوصيل (أكثر من 15 كم)</p>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-sm font-black text-zinc-700">تفاصيل العنوان</label>
                    <textarea 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      placeholder="رقم العمارة، الدور، الشقة، أو علامة مميزة..." 
                      rows={2} 
                      className="w-full rounded-2xl border-2 border-zinc-100 bg-zinc-50 px-4 py-3.5 font-bold outline-none focus:border-red-400 focus:bg-white transition resize-none"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-zinc-900 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">ملخص الحساب</p>
                <div className="space-y-3">
                  <div className="flex justify-between font-bold text-sm">
                    <span className="text-zinc-400">سعر البيتزا</span>
                    <span>{item.price} ج</span>
                  </div>
                  {deliveryType === "delivery" && (
                    <div className="flex justify-between font-bold text-sm">
                      <span className="text-zinc-400">مصاريف التوصيل</span>
                      <span>{deliveryCost === 0 ? "مجاني" : `${deliveryCost} ج`}</span>
                    </div>
                  )}
                  <div className="pt-4 mt-4 border-t border-white/10 flex justify-between items-end">
                    <span className="font-black text-lg">الإجمالي</span>
                    <span className="text-3xl font-black text-red-500">{totalPrice} <span className="text-sm">جنية</span></span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-black text-zinc-700">طريقة الدفع</label>
                {(["cash", "instapay", "visa"] as PaymentMethod[]).map((m) => (
                  <button key={m} onClick={() => setPaymentMethod(m)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${paymentMethod === m ? "border-zinc-950 bg-zinc-950 text-white shadow-lg" : "border-zinc-100 bg-white text-zinc-500"}`}>
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${paymentMethod === m ? "bg-white/10" : "bg-zinc-50"}`}>
                      {m === "cash" ? <Wallet size={20} /> : m === "instapay" ? <Smartphone size={20} /> : <CreditCard size={20} />}
                    </div>
                    <div className="text-right">
                      <p className="font-black text-sm">{m === "cash" ? "كاش عند الاستلام" : m === "instapay" ? "Instapay" : "بطاقة ائتمان"}</p>
                      <p className={`text-[10px] font-bold ${paymentMethod === m ? "text-zinc-400" : "text-zinc-400"}`}>
                        {m === "cash" ? "ادفع وقت ما تستلم البيتزا" : "تحويل سريع للمحفظة"}
                      </p>
                    </div>
                    {paymentMethod === m && <CheckCircle2 size={20} className="mr-auto text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-zinc-100 p-6 flex items-center gap-3 bg-white">
          {step > 1 && (
            <button onClick={() => setStep((s) => (s - 1) as Step)} className="h-14 w-14 flex items-center justify-center rounded-2xl border-2 border-zinc-100 text-zinc-400 hover:bg-zinc-50 transition">
              <ChevronRight size={24} />
            </button>
          )}
          
          {step < 3 ? (
            <button 
              onClick={() => setStep((s) => (s + 1) as Step)} 
              disabled={step === 1 ? !step1Valid() : !step2Valid()}
              className="flex-1 h-14 bg-zinc-950 text-white rounded-2xl font-black flex items-center justify-center gap-2 disabled:opacity-30 transition hover:bg-red-600 shadow-lg shadow-zinc-200"
            >
              الخطوة التالية <ChevronLeft size={20} />
            </button>
          ) : (
            <button 
              onClick={handleConfirm}
              className="flex-1 h-14 bg-[#25D366] text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#1da856] transition shadow-lg shadow-emerald-100"
            >
              أرسل الطلب واتساب <CheckCircle2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}