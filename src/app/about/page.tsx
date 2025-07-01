import FAQuestion from "@/components/FAQuestion";
import BasePage from "@/components/BasePage";
import "./styles.css";

export default function Faq() {
  return (
    <BasePage>
      <div className="min-h-screen flex flex-1 flex-col items-center justify-center px-2 sm:px-4 pt-12 sm:pt-20 z-10 w-full">
        <section className="w-full max-w-xs sm:max-w-lg md:max-w-2xl flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-black dark:text-white text-center mb-4 sm:mb-8 tracking-tight drop-shadow-lg">
            Sobre a aplicação
          </h1>
          <div className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-xl rounded-2xl p-3 sm:p-6 md:p-8 animate-fade-in backdrop-blur-md">
            <div className="space-y-4 sm:space-y-5">
              <FAQuestion
                title="O que é?"
                answer="Esta aplicação web foi criada para transformar imagens em código automaticamente. Com ela, você pode enviar uma imagem de um layout, interface ou esboço, e a ferramenta gera o código correspondente - como HTML e TailwindCSS. O objetivo é acelarar o processo de desenvolvimento, principalmente na etapa de prototipagem e conversão de design para código."
              />
              <FAQuestion
                title="Propósito"
                answer="Nosso principal objetivo é facilitar a vida de desenvolvedores e designers, automatizando a transcrição visual para código e reduzindo o tempo gasto em tarefas repetitivas. Essa ferramenta é pensada para acelerar projetos e permitir foco na criatividade e na lógica."
              />
              <FAQuestion
                title="Para quem é?"
                answer="Esta aplicação é ideal para desenvolvedores, designers e estudantes que buscam transformar imagens em código de forma rápida, prática e inteligente, otimizando tempo e facilitando o processo de criação."
              />
              <FAQuestion
                title="Projeto Acadêmico"
                answer="Esta aplicação foi desenvolvida como parte da Prova de Aptidão Profissional (PAP) do curso técnico de GPSI na Escola Secundaria de Santa Maria da Feira.
O projeto teve como foco integrar desenvolvimento web, inteligência artificial, design responsivo e usabilidade.

Mais do que um trabalho escolar, este projeto representa a dedicação em transformar aprendizado em algo concreto, funcional e com potencial de uso real."
              />
            </div>
          </div>
        </section>
      </div>
    </BasePage>
  );
}
