"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { dishes, filters, type CategoryId, type Dish } from "@/lib/data";
import { Reveal, SplitText } from "./Motion";
import { useCart } from "./Providers";

function FoodCard({ dish }: { dish: Dish }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    add(dish.name);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      layout
      className="card"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <div className="card-img">
        <Image src={dish.image} alt={dish.name} fill sizes="(max-width: 700px) 80vw, (max-width: 1100px) 45vw, 400px" placeholder="blur" loading="lazy" />
        <span className="tag">{dish.tag}</span>
        <span className="rate">★ {dish.rating.toFixed(1)}</span>
      </div>
      <div className="card-body">
        <h3>{dish.name}</h3>
        <p>{dish.desc}</p>
        <div className="card-foot">
          <span className="price">₹{dish.price}</span>
          <button className={`add${added ? " done" : ""}`} onClick={onAdd} aria-label={`Add ${dish.name} to order`}>
            <span className="add-a">{added ? "Added ✓" : "Add"}</span>
            <span className="plus" aria-hidden="true">{added ? "" : "+"}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Popular() {
  const [filter, setFilter] = useState<"all" | CategoryId>("all");
  const list = filter === "all" ? dishes.filter((d) => d.rating >= 4.7).slice(0, 9) : dishes.filter((d) => d.cats.includes(filter));

  return (
    <section className="section" id="menu">
      <div className="head">
        <div>
          <Reveal><p className="eyebrow">Popular right now</p></Reveal>
          <SplitText text="Dishes our guests *keep* coming back for" />
        </div>
        <Reveal delay={0.15}>
          <div className="filters" role="tablist" aria-label="Filter dishes">
            {filters.map((f) => (
              <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}>
                {filter === f.id && <motion.span layoutId="pill" className="pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">
          {list.map((d) => (
            <FoodCard key={d.id} dish={d} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
