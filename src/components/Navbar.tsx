import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logo-textil-salas.png";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Ventas para Empresas", href: "/#b2b" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();

  const handleNav = (href: string) => {
    if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const id = href.replace('/#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }
    navigate(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Corporación Textil Salas SAC" className="h-12 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="font-body text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Buscar">
            <Search size={20} />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Cuenta" onClick={() => navigate(isAuthenticated ? "/perfil" : "/login")}>
            <User size={20} />
          </button>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative" aria-label="Carrito" onClick={() => navigate("/carrito")}>
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-body font-semibold rounded-full flex items-center justify-center">{totalItems}</span>}
          </button>
          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className="h-px bg-border" />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background overflow-hidden">
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button key={link.label} className="font-body text-base text-left text-foreground py-2 border-b border-border" onClick={() => { handleNav(link.href); setMobileOpen(false); }}>{link.label}</button>
              ))}
              <Link to={isAuthenticated ? "/perfil" : "/login"} className="font-body text-base text-foreground py-2 border-b border-border" onClick={() => setMobileOpen(false)}>
                {isAuthenticated ? "Mi Cuenta" : "Iniciar Sesión"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
