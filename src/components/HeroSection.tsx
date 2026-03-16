import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-robe.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Bata de algodón premium en suite de hotel de lujo"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-20">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-sm uppercase tracking-[0.2em] text-primary-foreground/80 mb-6"
          >
            Textiles de alta gama
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl font-normal text-primary-foreground leading-[1.1] mb-6"
          >
            Textiles que definen la experiencia del huésped
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-body text-lg text-primary-foreground/80 mb-10 max-w-lg text-pretty"
          >
            Descubre nuestra colección premium de toallas y batas de algodón, 
            diseñadas para hoteles, spas y hogares que exigen lo mejor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/catalogo"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-body text-sm uppercase tracking-[0.1em] rounded-md hover:bg-gold-dark transition-all duration-200 hover:-translate-y-px shadow-card hover:shadow-card-hover"
            >
              Ver Catálogo
            </Link>
            <a
              href="#b2b"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground font-body text-sm uppercase tracking-[0.1em] rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all duration-200"
            >
              Soluciones B2B
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
