
import { motion } from "framer-motion";

const BrandLogos = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600">
            Trusted by thousands of content creators and businesses worldwide
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {['TikTok', 'Instagram', 'YouTube', 'OpenAI', 'AWS'].map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-gray-400 text-2xl font-bold"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
