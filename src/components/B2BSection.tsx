import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, FileText, HandCoins, Phone, MessageCircle, Send, PackageCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import b2bHero from "@/assets/b2b-hero.jpg";

const features = [
  { icon: Building2, title: "Atención Personalizada", desc: "Acompañamiento comercial para hoteles, spas, gimnasios, clínicas y distribuidores." },
  { icon: HandCoins, title: "Negociación por Volumen", desc: "Cotizaciones flexibles según cantidades requeridas de toallas, batas o sets hoteleros." },
  { icon: FileText, title: "Producción a Medida", desc: "Bordado con logo, colores personalizados y propuestas adaptadas a tu negocio." },
  { icon: PackageCheck, title: "Coordinación Directa", desc: "Tu cliente puede acordar cantidades, tiempos de entrega y reposiciones con el asesor." },
];

const emptyForm = {
  companyName: "",
  contactName: "",
  phoneNumber: "",
  email: "",
  productRequired: "",
  estimatedQuantity: "",
  message: "",
};

const B2BSection = () => {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName || !form.contactName || !form.phoneNumber || !form.email || !form.productRequired || !form.estimatedQuantity) {
      toast({ title: "Completa la información", description: "Ingresa empresa, contacto, correo, teléfono, producto y cantidad estimada.", variant: "destructive" });
      return;
    }
    try {
      setSubmitting(true);
      await authService.sendQuoteRequest(form);
      toast({ title: "Solicitud enviada", description: "Nuestro asesor comercial se comunicará contigo para negociar cantidades y condiciones." });
      setForm(emptyForm);
    } catch (error) {
      toast({ title: "No se pudo enviar", description: error instanceof Error ? error.message : "Configura SMTP para enviar correos reales.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="b2b" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-xl overflow-hidden shadow-elevated">
            <img src={b2bHero} alt="Toallas premium para hoteles" className="w-full h-full object-cover aspect-[4/3]" loading="lazy" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="font-body text-sm uppercase tracking-[0.2em] text-primary mb-4">Ventas para Empresas</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 text-balance leading-tight">
              El socio textil de los mejores hoteles
            </h2>
            <p className="font-body text-base text-muted-foreground mb-10 text-pretty leading-relaxed">
              Si su empresa requiere cantidades específicas de toallas, batas o sets hoteleros, comuníquese directamente con nuestro asesor para evaluar su requerimiento y llegar a un acuerdo comercial según volumen, tipo de producto y personalización solicitada.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-10">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center shrink-0 border border-border">
                    <f.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-foreground mb-1">{f.title}</h4>
                    <p className="font-body text-xs text-muted-foreground text-pretty leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="tel:999384593" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-body text-sm uppercase tracking-[0.1em] rounded-lg hover:bg-gold-dark transition-all duration-200 hover:-translate-y-px shadow-card hover:shadow-card-hover flex-1">
                <Phone size={18} />
                <span className="text-left"><span className="block text-xs opacity-80">Llame al asesor:</span><span className="block text-base font-semibold tracking-wider">999384593</span></span>
              </a>
              <a href="https://wa.me/51999384593?text=Hola%2C%20deseo%20cotizar%20cantidades%20requeridas%20de%20toallas%20o%20batas" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-background text-foreground font-body text-sm uppercase tracking-[0.1em] rounded-lg border border-border hover:bg-secondary transition-all duration-200">
                <MessageCircle size={18} /> Hablar por WhatsApp
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-background rounded-xl border border-border shadow-card p-6 md:p-8">
          <div className="max-w-3xl">
            <h3 className="font-display text-2xl text-foreground mb-2">Solicitar cotización</h3>
            <p className="font-body text-sm text-muted-foreground mb-6">Déjanos tus datos y la cantidad estimada. Te contactaremos para negociar el acuerdo comercial.</p>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="space-y-2"><Label>Empresa</Label><Input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} /></div>
            <div className="space-y-2"><Label>Nombre del contacto</Label><Input value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} /></div>
            <div className="space-y-2"><Label>Teléfono</Label><Input value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} /></div>
            <div className="space-y-2"><Label>Correo</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="space-y-2"><Label>Producto requerido</Label><Input value={form.productRequired} onChange={(e) => setForm({ ...form, productRequired: e.target.value })} placeholder="Toallas, batas o sets" /></div>
            <div className="space-y-2"><Label>Cantidad estimada</Label><Input value={form.estimatedQuantity} onChange={(e) => setForm({ ...form, estimatedQuantity: e.target.value })} placeholder="Ej. 48 unidades" /></div>
            <div className="space-y-2 md:col-span-2"><Label>Mensaje</Label><Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Indica personalización, tiempos o requerimientos adicionales." /></div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" className="font-body uppercase tracking-wide gap-2" disabled={submitting}><Send size={16} /> {submitting ? "Enviando..." : "Solicitar cotización"}</Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default B2BSection;
