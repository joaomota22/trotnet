import FAQuestion from "@/components/FAQuestion";
import BasePage from "@/components/BasePage";
import "./styles.css";

export default function Faq() {
  return (
    <BasePage>
      <div className="min-h-screen flex flex-1 flex-col items-center justify-center px-2 sm:px-4 pt-12 sm:pt-20 z-10 w-full">
        <section className="w-full max-w-xs sm:max-w-lg md:max-w-2xl flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-black dark:text-white text-center mb-4 sm:mb-8 tracking-tight drop-shadow-lg">
            Perguntas Frequentes
          </h1>
          <div className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-xl rounded-2xl p-3 sm:p-6 md:p-8 animate-fade-in backdrop-blur-md">
            <div className="space-y-4 sm:space-y-5">
              <FAQuestion
                title="1. Como funciona a conversão de imagens em código?"
                answer="Nosso sistema analisa a imagem enviada e gera um código correspondente em diferentes formatos, como HTML/CSS, SVG, ASCII Art para processamento de imagens."
              />
              <FAQuestion
                title="2. Quais tipos de imagens posso enviar?"
                answer="Você pode enviar imagens nos formatos mais comuns, como JPEG, PNG, SVG e BMP."
              />
              <FAQuestion
                title="3. O código gerado é editável?"
                answer="Sim! O código gerado pode ser copiado e modificado conforme necessário."
              />
              <FAQuestion
                title="4. Há limite de tamanho para upload de imagens?"
                answer="Sim, atualmente aceitamos imagens de até 5MB para garantir um processamento rápido e eficiente."
              />
            </div>
          </div>
        </section>
      </div>
    </BasePage>
  );
}
