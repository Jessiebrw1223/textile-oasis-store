import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { productService } from "@/services/productService";
import type { Product } from "@/types/product";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } } };

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll().then(setProducts).finally(() => setLoading(false));
  }, []);

  const getFallbackImage = (categoryName: string, productId: number) => {
    const normalized = (categoryName || "").toLowerCase();
    if (normalized.includes("toalla")) return product1;
    if (normalized.includes("bata")) return product2;
    if (normalized.includes("set")) return product3;
    return [product1, product2, product3, product4][productId % 4];
  };

  const featured = useMemo(() => products.filter((p) => p.isFeatured && p.isActive).slice(0, 4).map((product) => ({
    id: product.id,
    name: product.name,
    material: product.material,
    stock: product.stock,
    price: `S/ ${product.price.toFixed(2)}`,
    image: product.imageUrl?.trim() ? product.imageUrl : getFallbackImage(product.categoryName, product.id),
    fallbackImage: getFallbackImage(product.categoryName, product.id),
  })), [products]);

  return (
    <section id="productos" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Colección Destacada</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">Productos Seleccionados</h2>
        </motion.div>
        {loading ? <div className="text-center font-body text-muted-foreground">Cargando productos destacados...</div> : (
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <motion.div key={product.id} variants={item} className="group bg-background rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                <Link to={`/producto/${product.id}`}>
                  <div className="aspect-square overflow-hidden">
                    <img src={product.image} alt={product.name} onError={(e) => { e.currentTarget.src = product.fallbackImage; }} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                </Link>
                <div className="p-5">
                  <Link to={`/producto/${product.id}`}><h3 className="font-display text-xl text-foreground mb-1 hover:text-primary transition-colors">{product.name}</h3></Link>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-2">{product.material}</p>
                  <p className={`font-body text-xs mb-3 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>{product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-base font-medium text-foreground tabular-nums">{product.price}</span>
                    <Link to={`/producto/${product.id}`} className={`p-2.5 rounded-md transition-all duration-200 ${product.stock === 0 ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-gold-dark hover:-translate-y-px"}`} aria-label={`Ver ${product.name}`}>
                      <ShoppingBag size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
