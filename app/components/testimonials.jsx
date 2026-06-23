import { testimonials } from "@/data/gallery";
import { MessageSquare } from "lucide-react";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 border-t border-[var(--border)] bg-[var(--card-bg)]">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light tracking-wide mb-4">Customer Experiences</h2>
          <div className="w-16 h-[2px] bg-[var(--accent)] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.id} className="p-8 rounded-2xl bg-[var(--background)] border border-[var(--border)] flex flex-col justify-between">
              <div>
                <MessageSquare className="text-[var(--accent)] mb-4" size={24} />
                <p className="text-gray-300 italic leading-relaxed text-sm">"{t.text}"</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border)]">
                <p className="font-medium text-sm text-[var(--foreground)]">{t.name}</p>
                <p className="text-xs text-gray-500">{t.location}, India</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}