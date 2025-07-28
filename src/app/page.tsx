import Image from "next/image";
import {
  Phone,
  ChevronRight,
  Box,
  ShoppingCart,
  Tag,
  AreaChart,
  Cloud,
  CheckCircle2,
  Star,
  Users,
  Warehouse,
  TrendingUp,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SalesPredictionForm } from "@/components/sales-prediction-form";
import Link from "next/link";

const NexusProLogo = ({ className }: { className?: string }) => (
  <h1 className={`text-2xl font-bold font-headline text-primary ${className}`}>
    NexusPro
  </h1>
);

const features = [
  {
    icon: <Box className="w-8 h-8 text-primary" />,
    title: "Controle Inteligente de Estoque",
    description: "Automatize entradas e saídas, receba alertas de estoque baixo e evite perdas.",
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-primary" />,
    title: "Gestão de Vendas Simplificada",
    description: "PDV rápido e intuitivo, integrado ao estoque para uma gestão em tempo real.",
  },
  {
    icon: <Tag className="w-8 h-8 text-primary" />,
    title: "Geração de Etiquetas",
    description: "Crie e imprima etiquetas com código de barras, preço e informações do produto com um clique.",
  },
  {
    icon: <AreaChart className="w-8 h-8 text-primary" />,
    title: "Relatórios e Insights",
    description: "Visualize relatórios detalhados de vendas, lucro e produtos mais vendidos para tomar decisões.",
  },
  {
    icon: <Cloud className="w-8 h-8 text-primary" />,
    title: "Sistema na Nuvem",
    description: "Acesse seus dados de qualquer lugar, com segurança e backups automáticos.",
  },
];

const testimonials = [
  {
    name: "Carlos Mendes",
    company: "Gerente da TechStore",
    quote: "Com o NexusPro, nosso controle de estoque melhorou 80%. A automação de tarefas nos poupou horas de trabalho manual.",
    avatar: "https://placehold.co/100x100.png",
    data_ai_hint: "man portrait"
  },
  {
    name: "Juliana Ferreira",
    company: "Dona da Modas & Cia",
    quote: "O sistema é incrivelmente fácil de usar. A gestão de vendas ficou muito mais ágil e consigo ver o lucro de cada produto.",
    avatar: "https://placehold.co/100x100.png",
    data_ai_hint: "woman portrait"
  },
  {
    name: "Ricardo Alves",
    company: "Sócio da EletroTotal",
    quote: "A geração de etiquetas é fantástica. Reduzimos os erros de precificação a zero e a loja ficou mais organizada.",
    avatar: "https://placehold.co/100x100.png",
    data_ai_hint: "man smiling"
  },
  {
    name: "Fernanda Lima",
    company: "Proprietária da Art & Decor",
    quote: "O suporte técnico é muito atencioso. Sempre que precisei, fui atendida rapidamente. Recomendo de olhos fechados!",
    avatar: "https://placehold.co/100x100.png",
    data_ai_hint: "woman smiling"
  },
  {
    name: "André Costa",
    company: "CEO da NutriFit Suplementos",
    quote: "Os relatórios são um divisor de águas. Consigo ver quais produtos têm maior saída e planejar minhas compras com precisão.",
    avatar: "https://placehold.co/100x100.png",
    data_ai_hint: "man glasses"
  },
  {
    name: "Patrícia Souza",
    company: "Gerente da BookMania",
    quote: "Acessar o sistema de casa ou do celular é uma mão na roda. Tenho controle total do negócio na palma da minha mão.",
    avatar: "https://placehold.co/100x100.png",
    data_ai_hint: "woman glasses"
  },
];

const faqItems = [
    {
        question: "Como funciona o período de teste grátis?",
        answer: "Você tem 14 dias para testar todas as funcionalidades do NexusPro sem compromisso. Não pedimos cartão de crédito. Ao final do período, você pode escolher um de nossos planos para continuar."
    },
    {
        question: "Como posso agendar uma demonstração?",
        answer: "É simples! Clique em qualquer botão 'Agendar Demonstração' em nosso site e preencha o formulário. Nossa equipe entrará em contato para marcar um horário conveniente para você."
    },
    {
        question: "Quais são as formas de pagamento?",
        answer: "Aceitamos pagamentos via boleto bancário, PIX e os principais cartões de crédito. Oferecemos descontos para planos anuais."
    },
    {
        question: "O sistema é compatível com meu computador?",
        answer: "O NexusPro é compatível com Windows 10 ou superior. Por ser um sistema na nuvem, você também pode acessá-lo de qualquer dispositivo com um navegador de internet."
    },
    {
        question: "Posso alterar meu plano a qualquer momento?",
        answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano quando quiser, diretamente pelo painel do sistema ou entrando em contato com nosso suporte."
    }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NexusProLogo />
            <div className="flex items-center space-x-4">
              <a href="tel:3233111870" className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                (32) 3311-1870
              </a>
              <Button asChild className="bg-accent hover:bg-accent/90">
                <a href="#pricing">Agendar Demonstração</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section id="hero" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-headline text-primary tracking-tighter">
              Controle Total de Estoque e Vendas, Simples e Eficiente
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              O sistema que automatiza seu estoque, gerencia vendas em tempo real e imprime etiquetas com facilidade.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-[#28a745] hover:bg-[#28a745]/90 text-white shadow-lg">
                <a href="#pricing">
                  Iniciar Teste Grátis de 14 Dias
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-[#fd7e14] hover:bg-[#fd7e14]/90 text-white border-[#fd7e14] shadow-lg">
                <a href="#pricing">Agendar Demonstração</a>
              </Button>
            </div>
            <div className="mt-12 w-full max-w-4xl mx-auto">
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src="https://placehold.co/1200x675.png"
                    alt="Interface do sistema NexusPro"
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                    priority
                    data-ai-hint="dashboard software"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="clients" className="py-12 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-center text-sm font-semibold text-muted-foreground tracking-wider uppercase">
                    Mais de 500 empresas confiam no NexusPro
                </h3>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-x-8 gap-y-4 text-center text-muted-foreground font-medium">
                    <p>TechStore</p>
                    <p>Modas & Cia</p>
                    <p>EletroTotal</p>
                    <p>Art & Decor</p>
                    <p>NutriFit</p>
                    <p>BookMania</p>
                </div>
            </div>
        </section>

        <section id="impact" className="py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <Card className="text-center">
                         <CardHeader>
                             <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                                <TrendingUp className="w-8 h-8 text-primary"/>
                             </div>
                         </CardHeader>
                         <CardContent>
                            <p className="text-4xl font-bold font-headline">Aumento de 47%</p>
                            <p className="mt-2 text-muted-foreground">nas vendas para clientes que automatizaram o estoque.</p>
                         </CardContent>
                     </Card>
                     <Card className="text-center">
                         <CardHeader>
                            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                                <Warehouse className="w-8 h-8 text-primary"/>
                            </div>
                         </CardHeader>
                         <CardContent>
                            <p className="text-4xl font-bold font-headline">Redução de 90%</p>
                            <p className="mt-2 text-muted-foreground">em perdas de estoque por validade ou falta de produtos.</p>
                         </CardContent>
                     </Card>
                     <Card className="text-center">
                         <CardHeader>
                            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                                <Users className="w-8 h-8 text-primary"/>
                            </div>
                         </CardHeader>
                         <CardContent>
                             <p className="text-4xl font-bold font-headline">98% de Satisfação</p>
                             <p className="mt-2 text-muted-foreground">com nosso suporte técnico especializado.</p>
                         </CardContent>
                     </Card>
                 </div>
            </div>
        </section>

        <section id="features" className="py-20 sm:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Funcionalidades Principais</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Tudo que você precisa para uma gestão completa, em um só lugar.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto w-fit p-4 bg-primary/10 rounded-full">{feature.icon}</div>
                    <CardTitle className="font-headline pt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="screenshots" className="py-20 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Veja o NexusPro em Ação</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                        Interface limpa, intuitiva e poderosa.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-4">
                        <h3 className="font-headline text-xl font-semibold">Tela de Início</h3>
                        <p className="text-muted-foreground">Painel com novidades, atalhos e resumo do seu negócio.</p>
                        <Card className="overflow-hidden">
                           <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Tela de início" data-ai-hint="dashboard analytics"/>
                        </Card>
                    </div>
                     <div className="flex flex-col gap-4">
                        <h3 className="font-headline text-xl font-semibold">Frente de Caixa (PDV)</h3>
                        <p className="text-muted-foreground">Realize vendas rapidamente, consulte produtos e clientes.</p>
                        <Card className="overflow-hidden">
                           <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Tela de PDV" data-ai-hint="pos system" />
                        </Card>
                    </div>
                     <div className="flex flex-col gap-4">
                        <h3 className="font-headline text-xl font-semibold">Relatórios Detalhados</h3>
                        <p className="text-muted-foreground">Acompanhe suas vendas, lucros e estoque com gráficos claros.</p>
                        <Card className="overflow-hidden">
                           <Image src="https://placehold.co/600x400.png" width={600} height={400} alt="Tela de Relatórios" data-ai-hint="charts graph" />
                        </Card>
                    </div>
                </div>
            </div>
        </section>

        <section id="ai-prediction" className="py-20 sm:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Previsão de Vendas com IA</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Use o poder da Inteligência Artificial para prever suas necessidades de estoque e otimizar suas compras.
              </p>
            </div>
            <SalesPredictionForm />
          </div>
        </section>

        <section id="testimonials" className="py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">O que nossos clientes dizem</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                A satisfação de quem usa o NexusPro no dia a dia.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="flex flex-col">
                  <CardContent className="pt-6 flex-grow">
                    <div className="flex text-yellow-500 mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5"/>)}
                    </div>
                    <blockquote className="text-foreground italic">"{testimonial.quote}"</blockquote>
                  </CardContent>
                  <CardFooter className="mt-4">
                    <div className="flex items-center">
                        <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full" data-ai-hint={testimonial.data_ai_hint}/>
                        <div className="ml-4">
                            <p className="font-semibold text-primary">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                        </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 sm:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Planos e Preços</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Escolha o plano ideal para o seu negócio. Sem taxas escondidas.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8">
              <Card className="w-full lg:w-[380px] flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline">Plano Básico</CardTitle>
                  <p className="text-4xl font-bold font-headline">R$ 80<span className="text-lg font-medium text-muted-foreground">/mês</span></p>
                  <p className="text-sm text-muted-foreground">Ideal para pequenos negócios e autônomos.</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Controle de Estoque</li>
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Gestão de Vendas (PDV)</li>
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Geração de Etiquetas</li>
                     <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Suporte via E-mail</li>
                  </ul>
                </CardContent>
                <CardFooter>
                   <Button className="w-full" variant="outline">Iniciar Teste Grátis</Button>
                </CardFooter>
              </Card>

              <Card className="w-full lg:w-[380px] flex flex-col border-primary ring-2 ring-primary relative overflow-hidden">
                <Badge className="absolute top-0 right-0 -mr-1 -mt-1 transform-none rotate-0 bg-accent text-white py-1 px-3">Mais Popular</Badge>
                <CardHeader>
                  <CardTitle className="font-headline">Plano Profissional</CardTitle>
                  <p className="text-4xl font-bold font-headline text-primary">R$ 120<span className="text-lg font-medium text-muted-foreground">/mês</span></p>
                  <p className="text-sm text-muted-foreground">Para empresas que buscam crescimento e insights.</p>
                </CardHeader>
                <CardContent className="flex-grow">
                   <ul className="space-y-3">
                    <li className="flex items-center font-semibold"><CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Tudo do Plano Básico</li>
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Relatórios e Insights Avançados</li>
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Previsão de Vendas com IA</li>
                    <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-green-500 mr-2" /> Suporte Prioritário via WhatsApp</li>
                  </ul>
                </CardContent>
                <CardFooter>
                   <Button className="w-full bg-[#28a745] hover:bg-[#28a745]/90 text-white">Iniciar Teste Grátis</Button>
                </CardFooter>
              </Card>
            </div>
             <p className="text-center mt-6 text-sm text-muted-foreground">Pague anualmente e ganhe 2 meses de desconto!</p>
          </div>
        </section>

        <section id="tech-specs" className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h4 className="font-semibold font-headline">Compatibilidade</h4>
                        <p className="text-muted-foreground">Windows 10 ou superior. Acesso via navegador em qualquer OS.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold font-headline">Dados na Nuvem</h4>
                        <p className="text-muted-foreground">Seus dados seguros e salvos na nuvem com criptografia de ponta.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold font-headline">Suporte Dedicado</h4>
                        <p className="text-muted-foreground">Suporte técnico especializado via WhatsApp, e-mail e telefone.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="faq" className="py-20 sm:py-24 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Perguntas Frequentes</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index+1}`} key={index}>
                            <AccordionTrigger className="text-left font-semibold">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
      </main>

      <footer className="bg-foreground text-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  <div className="lg:col-span-2">
                      <h3 className="text-xl font-bold font-headline text-primary-foreground">NexusPro</h3>
                      <p className="mt-2 text-muted-foreground">Comece a transformar o controle de estoque e vendas da sua empresa!</p>
                      <div className="mt-4">
                        <Button asChild className="bg-[#28a745] hover:bg-[#28a745]/90 text-white">
                            <a href="#pricing">Começar Agora</a>
                        </Button>
                      </div>
                  </div>
                  <div>
                      <h4 className="font-semibold font-headline">Contato</h4>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                          <li><a href="mailto:contato@nexuspro.com" className="hover:text-primary-foreground">contato@nexuspro.com</a></li>
                          <li><a href="tel:3233111870" className="hover:text-primary-foreground">(32) 3311-1870</a></li>
                          <li>Rua Exemplo, 123 - Centro</li>
                      </ul>
                  </div>
                   <div>
                      <h4 className="font-semibold font-headline">Legal</h4>
                      <ul className="mt-4 space-y-2 text-muted-foreground">
                          <li><Link href="#" className="hover:text-primary-foreground">Política de Privacidade</Link></li>
                          <li><Link href="#" className="hover:text-primary-foreground">Termos de Uso</Link></li>
                      </ul>
                       <div className="flex space-x-4 mt-4">
                           <Link href="#" className="text-muted-foreground hover:text-primary-foreground"><Twitter/></Link>
                           <Link href="#" className="text-muted-foreground hover:text-primary-foreground"><Facebook/></Link>
                           <Link href="#" className="text-muted-foreground hover:text-primary-foreground"><Linkedin/></Link>
                       </div>
                  </div>
              </div>
              <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                  <p>&copy; {new Date().getFullYear()} NexusPro by Andromeda Solutions. Todos os direitos reservados.</p>
              </div>
          </div>
      </footer>
    </div>
  );
}
