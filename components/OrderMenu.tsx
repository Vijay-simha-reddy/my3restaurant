"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { dishes, filters, type CategoryId, type Dish } from "@/lib/data";
import { WHATSAPP_PHONE } from "@/lib/site";
import Logo from "./Logo";

const ORDER_TYPES = ["Delivery", "Pickup"] as const;
type OrderType = (typeof ORDER_TYPES)[number];

const isVeg = (d: Dish) => !d.cats.includes("nonveg");
const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function Stepper({ dish, qty, onChange }: { dish: Dish; qty: number; onChange: (delta: number) => void }) {
  return (
    <div className="stepper">
      <button type="button" onClick={() => onChange(-1)} aria-label={`Remove one ${dish.name}`}>−</button>
      <span aria-live="polite">{qty}</span>
      <button type="button" onClick={() => onChange(1)} aria-label={`Add one ${dish.name}`}>+</button>
    </div>
  );
}

export default function OrderMenu() {
  const [filter, setFilter] = useState<"all" | CategoryId>("all");
  const [vegOnly, setVegOnly] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [checkout, setCheckout] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<OrderType>("Delivery");
  const [address, setAddress] = useState("");

  const change = (id: string, delta: number) => {
    const q = (cart[id] ?? 0) + delta;
    const next = { ...cart };
    if (q <= 0) delete next[id];
    else next[id] = q;
    setCart(next);
    if (Object.keys(next).length === 0) setCheckout(false);
  };

  const list = dishes.filter((d) => (filter === "all" || d.cats.includes(filter)) && (!vegOnly || isVeg(d)));
  const lines = dishes.filter((d) => cart[d.id]);
  const count = lines.reduce((n, d) => n + cart[d.id], 0);
  const total = lines.reduce((n, d) => n + d.price * cart[d.id], 0);

  useEffect(() => {
    if (!checkout) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCheckout(false);
    };
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.scrollbarWidth = "none";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.scrollbarWidth = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [checkout]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = [
      "*New Order - MY3 Family Restaurant*",
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Order type:* ${type}`,
      type === "Delivery" && `*Address:* ${address}`,
      "",
      "*Items*",
      ...lines.map((d, i) => `${i + 1}. ${d.name} x ${cart[d.id]} = ${rupees(d.price * cart[d.id])}`),
      "",
      `*Total:* ${rupees(total)}`,
    ].filter((line) => line !== false);
    window.location.assign(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message.join("\n"))}`);
  };

  return (
    <div className="order">
      <header className="order-top">
        <div className="order-top-in">
          <Link href="/" className="brand" aria-label="MY3 home"><Logo size={36} /></Link>
          <Link href="/" className="order-back">← Back to home</Link>
        </div>
      </header>

      <main className="order-main">
        <h1>Order online</h1>
        <p className="order-sub">Pick your dishes, add your details, and send the order to us on WhatsApp.</p>

        <div className="order-controls">
          <div className="filters" role="tablist" aria-label="Filter dishes">
            {filters.map((f) => (
              <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}>
                {filter === f.id && <motion.span layoutId="order-pill" className="pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span>{f.label}</span>
              </button>
            ))}
          </div>
          <label className="veg-toggle">
            <input type="checkbox" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} />
            <span>Veg only</span>
          </label>
        </div>

        <ul className="dish-list">
          {list.map((d) => (
            <li key={d.id} className="dish">
              <div className="dish-img">
                <Image src={d.image} alt={d.name} fill sizes="120px" placeholder="blur" />
              </div>
              <div className="dish-info">
                <div className="dish-title">
                  <span className={`diet ${isVeg(d) ? "veg" : "nonveg"}`} role="img" aria-label={isVeg(d) ? "Vegetarian" : "Non-vegetarian"} />
                  <h3>{d.name}</h3>
                </div>
                <p>{d.desc}</p>
                <div className="dish-foot">
                  <span className="price">{rupees(d.price)}</span>
                  {cart[d.id] ? (
                    <Stepper dish={d} qty={cart[d.id]} onChange={(delta) => change(d.id, delta)} />
                  ) : (
                    <button type="button" className="add" onClick={() => change(d.id, 1)} aria-label={`Add ${d.name} to order`}>
                      <span>Add</span>
                      <span className="plus" aria-hidden="true">+</span>
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {list.length === 0 && <p className="order-empty">No dishes match this filter.</p>}
      </main>

      <AnimatePresence>
        {count > 0 && !checkout && (
          <motion.div
            className="cart-bar"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <span>
              <b>{count}</b> {count === 1 ? "item" : "items"} · {rupees(total)}
            </span>
            <button type="button" className="btn btn-sm" onClick={() => setCheckout(true)}>View order <span className="arrow">→</span></button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkout && (
          <motion.div
            className="sheet-overlay"
            onClick={() => setCheckout(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Your order"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <button type="button" className="sheet-close" onClick={() => setCheckout(false)} aria-label="Close">×</button>
              <div className="sheet-scroll" data-lenis-prevent>
                <p className="eyebrow">Your order</p>
                <h2>Review and send</h2>
  
                <ul className="sheet-lines">
                  {lines.map((d) => (
                    <li key={d.id}>
                      <span className="sl-name">{d.name}</span>
                      <Stepper dish={d} qty={cart[d.id]} onChange={(delta) => change(d.id, delta)} />
                      <span className="sl-price">{rupees(d.price * cart[d.id])}</span>
                    </li>
                  ))}
                </ul>
                <div className="sheet-total">
                  <span>Total</span>
                  <strong>{rupees(total)}</strong>
                </div>
  
                <form className="sheet-form" onSubmit={onSubmit}>
                  <div className="sheet-row">
                    <label>
                      <span>Your name</span>
                      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                    </label>
                    <label>
                      <span>Phone number</span>
                      <input
                        required
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        title="Enter a 10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="10-digit number"
                      />
                    </label>
                  </div>
                  <fieldset className="seg">
                    <legend>Order type</legend>
                    {ORDER_TYPES.map((t) => (
                      <label key={t}>
                        <input type="radio" name="order-type" checked={type === t} onChange={() => setType(t)} />
                        <span>{t}</span>
                      </label>
                    ))}
                  </fieldset>
                  {type === "Delivery" && (
                    <label>
                      <span>Delivery address</span>
                      <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no, street, landmark" />
                    </label>
                  )}
                  <button type="submit" className="btn">Send order on WhatsApp <span className="arrow">→</span></button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
