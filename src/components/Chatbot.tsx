import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  from: "bot" | "user";
}

const quickReplies = [
  "¿Cuáles son sus productos?",
  "¿Hacen envíos a provincia?",
  "Consulta empresarial B2B",
  "Consultar mi pedido",
  "Quiero hablar con soporte",
];

const botResponses: Record<string, string> = {
  "productos": "Ofrecemos toallas de baño, faciales y de manos en algodón premium (500-600 GSM), batas de spa y sets hoteleros completos. Puedes ver todo en nuestro catálogo. 🛍️",
  "envío": "¡Sí! Realizamos envíos a todo el Perú. Lima Metropolitana en 1-2 días hábiles y provincias en 3-5 días. Envío gratis en compras mayores a S/ 200.",
  "b2b": "Para pedidos empresariales comuníquese con nuestro asesor al número 📞 999384593. Ofrecemos precios especiales por volumen para hoteles, spas, gimnasios, clínicas y distribuidores. También realizamos producción personalizada con bordado de logo.",
  "pedido": "Para consultar el estado de tu pedido, ingresa a tu cuenta en la sección 'Mi Perfil' → 'Historial de Pedidos'. Si necesitas ayuda adicional, contacta a nuestro asesor al 999384593.",
  "soporte": "Te conectaré con un agente de soporte. Puedes contactarnos por:\n📞 Teléfono: 999384593\n📧 Email: ventas@textilsalas.com\n\nHorario: Lunes a Viernes 9am - 6pm, Sábados 9am - 1pm.",
  "default": "¡Gracias por tu mensaje! Puedo ayudarte con:\n• Información sobre productos\n• Consultas de envío\n• Pedidos empresariales (B2B)\n• Estado de tu pedido\n• Contactar con soporte\n\n¿En qué te puedo ayudar?",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  if (lower.includes("producto") || lower.includes("toalla") || lower.includes("bata") || lower.includes("catálogo")) return botResponses.productos;
  if (lower.includes("envío") || lower.includes("envio") || lower.includes("provincia") || lower.includes("delivery")) return botResponses["envío"];
  if (lower.includes("b2b") || lower.includes("volumen") || lower.includes("empresa") || lower.includes("hotel") || lower.includes("corporativ") || lower.includes("mayorista")) return botResponses.b2b;
  if (lower.includes("pedido") || lower.includes("orden") || lower.includes("seguimiento") || lower.includes("estado")) return botResponses.pedido;
  if (lower.includes("soporte") || lower.includes("hablar") || lower.includes("agente") || lower.includes("ayuda") || lower.includes("contacto")) return botResponses.soporte;
  return botResponses.default;
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "¡Hola! 👋 Soy el asistente de Textil Salas. ¿En qué puedo ayudarte hoy?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  let nextId = useRef(2);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: nextId.current++, text, from: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: Message = { id: nextId.current++, text: getResponse(text), from: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      {/* Toggle Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-elevated flex items-center justify-center hover:bg-gold-dark transition-colors"
            aria-label="Abrir chat"
          >
            <MessageCircle size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-background rounded-lg shadow-elevated flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="bg-foreground text-primary-foreground px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-display text-lg">Textil Salas</p>
                <p className="font-body text-xs text-primary-foreground/60">Asistente virtual • En línea</p>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-primary-foreground/10 rounded">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-lg font-body text-sm whitespace-pre-line ${m.from === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="px-3 py-1.5 rounded-full border border-border font-body text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send(input)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-secondary rounded-md px-3 py-2 font-body text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={() => send(input)}
                className="p-2.5 bg-primary text-primary-foreground rounded-md hover:bg-gold-dark transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
