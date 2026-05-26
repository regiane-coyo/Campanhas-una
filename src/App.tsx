import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  Award, 
  MessageSquare, 
  AlertCircle, 
  Sparkles, 
  Building2, 
  BarChart3, 
  HelpCircle,
  Users,
  Target,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Sliders,
  PlaySquare,
  FileSpreadsheet,
  Settings,
  ShieldCheck,
  Star,
  Users2,
  ThumbsDown,
  ArrowDownRight,
  TrendingDown,
  FolderSync,
  Clock,
  Send,
  CheckCircle
} from 'lucide-react';

import MetricCard from './components/MetricCard';
import CampaignDetails from './components/CampaignDetails';
import InteractiveSimulator from './components/InteractiveSimulator';


// Detailed types for slide reviews
type SlideID = 1 | 2 | 3 | 4 | 5 | 6;

interface SlideInfo {
  id: SlideID;
  title: string;
  subtitle: string;
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<SlideID>(1);
  const [showNumbers, setShowNumbers] = useState<boolean>(false);
  const [filterLevel, setFilterLevel] = useState<number>(3); // 1 to 5 scale for interactive filtering
  const [quizForm, setQuizForm] = useState({
    objective: 'morar',
    type: 'apartamento',
    size: '180m'
  });
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [activeSegment, setActiveSegment] = useState<'slide' | 'all'>('slide');

  const slides: SlideInfo[] = [
    { id: 1, title: 'Como Estávamos Fazendo?', subtitle: 'Diagnóstico da facilidade de cliques e canal único' },
    { id: 2, title: 'O que gerou?', subtitle: 'Análise de conversão do início ao fim do funil imobiliário' },
    { id: 3, title: 'O que fazer?', subtitle: 'O novo paradigma de qualificação imobiliária' },
    { id: 4, title: 'Como fazemos isso?', subtitle: 'Estruturação do funil inteligente do Parque Una SJC' },
    { id: 5, title: 'O que esperamos?', subtitle: 'Projeções e comportamento do algoritmo com a nova verba' },
    { id: 6, title: 'Acompanhamento', subtitle: 'Garantia de feedback loop e monitoramento contínuo' },
  ];

  const handleNext = () => {
    if (currentSlide < 6) {
      setCurrentSlide((currentSlide + 1) as SlideID);
      setShowNumbers(false);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 1) {
      setCurrentSlide((currentSlide - 1) as SlideID);
      setShowNumbers(false);
    }
  };

  // Dynamic filter effect calculator for slide 3
  const getFilterMetrics = (level: number) => {
    // level: 1 (no filter) -> 5 (max filter)
    const baseLeads = 350;
    const leads = Math.round(baseLeads * (1 - (level - 1) * 0.18));
    const rawQualRate = 4.8 + (level - 1) * 7.5; // Starts at 4.8% (April standard)
    const qualRate = parseFloat(Math.min(38.2, rawQualRate).toFixed(1));
    const qualifiedLeads = Math.round(leads * (qualRate / 100));
    const brokerWastedHours = Math.max(0, 180 - (level - 1) * 40);
    const leadCostColor = level > 3 ? 'text-emerald-400' : 'text-amber-400';
    return { leads, qualRate, qualifiedLeads, brokerWastedHours, leadCostColor };
  };

  const filterMetrics = getFilterMetrics(filterLevel);

  const submitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackMessage('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 transition-colors duration-300 font-sans pb-16 relative selection:bg-purple-600 selection:text-white">
      
      {/* Dynamic Cosmic Backlighting */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-indigo-950/40 via-purple-950/20 to-transparent -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Navbar */}
      <nav id="app-navbar" className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white text-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5" id="nav-brand-icon" />
            </div>
            <div>
              <span className="font-display font-extrabold text-sm tracking-wider block text-white">PARQUE UNA SJC</span>
              <span className="text-[10px] text-zinc-400 font-semibold block uppercase">Apresentação de Posicionamento 2026</span>
            </div>
          </div>

          {/* Quick Stats Label */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-300">
              Nova Proposta Homologada
            </span>
          </div>

          {/* Layout controls */}
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSegment('slide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSegment === 'slide' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Exibição Slides
            </button>
            <button
              onClick={() => setActiveSegment('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSegment === 'all' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Painel Completo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Header Section */}
      <header id="app-hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/10 text-amber-400 text-xs font-bold rounded-full font-display border border-amber-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              Parque Una São José dos Campos (SJC)
            </div>
            <h1 className="text-2xl md:text-3.5xl font-extrabold font-display text-white">
              Estratégia de Campanhas Recentes & Redirecionamento
            </h1>
            <p className="text-xs md:text-sm text-slate-400 max-w-2xl">
              Nesta nova estrutura baseada nas diretrizes estratégicas do Parque Una SJC, navegue pelos slides ou visualize a simulação prática dos impactos de conversão.
            </p>
          </div>
          
          <div className="text-xs font-mono text-slate-500 bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 shrink-0">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Maio 2026 • Vale do Paraíba</span>
          </div>
        </div>
      </header>

      {/* Main Interactive Presenter Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-8">
        
        {activeSegment === 'slide' ? (
          <div className="space-y-6">
            
            {/* Slide Navigation Progress Tabs */}
            <div id="slide-progress-track" className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {slides.map((slide) => {
                const isSelected = currentSlide === slide.id;
                const isPassed = currentSlide > slide.id;
                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setCurrentSlide(slide.id);
                      setShowNumbers(false);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? 'bg-slate-800 border-purple-500 text-white shadow-lg shadow-purple-950/20 scale-102 font-semibold'
                        : isPassed
                        ? 'bg-slate-950/60 border-indigo-950 text-slate-300'
                        : 'bg-slate-950/30 border-slate-850 text-slate-500 hover:text-slate-300 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                        SLIDE 0{slide.id}
                      </span>
                      {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      {isSelected && <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping shrink-0" />}
                    </div>
                    <span className="text-xs block mt-1 line-clamp-1 font-display">
                      {slide.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* active slide container widget */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-between">
              
              {/* Slide Header */}
              <div className="border-b border-slate-800 bg-slate-900/40 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold font-mono text-sm">
                    {currentSlide}
                  </span>
                  <div>
                    <h2 className="text-lg font-bold font-display text-white uppercase tracking-wider">
                      {slides[currentSlide - 1].title}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {slides[currentSlide - 1].subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500">
                    Parque Una SJC Presenter Mode
                  </span>
                </div>
              </div>

              {/* Dynamic Slides Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex-grow flex flex-col"
                  >
                    
                    {/* SLIDE 1: COMO ESTÁVAMOS FAZENDO */}
                    {currentSlide === 1 && (
                      <div className="space-y-8 flex-grow flex flex-col justify-between">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Left Column: Facilidade de Clique */}
                          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between gap-4">
                            <div className="space-y-3">
                              <span className="text-xs bg-purple-400/10 border border-purple-400/20 text-purple-300 px-2.5 py-1 rounded-full font-bold font-display inline-block">
                                Mecânica de Atração
                              </span>
                              <h3 className="text-xl font-bold font-display text-white">
                                Facilidade de Clique de Cadastros
                              </h3>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                As campanhas da Meta Ads dependiam de formulários simplificados que preenchiam automaticamente os dados do usuário. Isso causava grande volume mas zero qualificação.
                              </p>
                            </div>
                            <div className="border-t border-slate-800/80 pt-3 text-[11px] text-purple-400 flex items-center gap-1.5 font-semibold">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Origina alto contingente de leads acidentais.
                            </div>
                          </div>

                          {/* Right Column: Foco na Meta e não Google */}
                          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col justify-between gap-4">
                            <div className="space-y-3">
                              <span className="text-xs bg-blue-400/10 border border-blue-400/20 text-blue-300 px-2.5 py-1 rounded-full font-bold font-display inline-block">
                                Distribuição de Canais
                              </span>
                              <h3 className="text-xl font-bold font-display text-white">
                                Foco Excessivo na Meta e não no Google
                              </h3>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Privilegiava-se o volume bruto de contatos de redes sociais de entretenimento em detrimento das pesquisas intencionais de alto padrão no Google Ads.
                              </p>
                            </div>
                            <div className="border-t border-slate-800/80 pt-3 text-[11px] text-blue-400 flex items-center gap-1.5 font-semibold">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Contatos em busca ativa qualificada foram deixados em 2º plano.
                            </div>
                          </div>

                        </div>

                        {/* Slide Trigger Callback */}
                        <div className="text-center pt-4">
                          <button
                            id="visualize-history-trigger-slide1"
                            onClick={() => setShowNumbers(!showNumbers)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 active:scale-95 px-6 py-3 rounded-full shadow-lg hover:shadow-purple-700/30 transition-all font-display"
                          >
                            <BarChart3 className="w-4 h-4" />
                            {showNumbers ? 'Ocultar os Números Históricos' : 'Veja os números clicando aqui'}
                          </button>
                        </div>

                        {showNumbers && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-6 pt-6 border-t border-slate-800"
                          >
                            <CampaignDetails />
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* SLIDE 2: O QUE GEROU? */}
                    {currentSlide === 2 && (
                      <div className="space-y-8 flex-grow">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Box 1: Leads Baratos */}
                          <div className="p-5 bg-rose-950/15 border border-rose-900/30 rounded-2xl space-y-3 flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-rose-400/10 text-rose-400 border border-rose-400/20">
                                  Métrica Ilusória
                                </span>
                              </div>
                              <h3 className="text-lg font-bold font-display text-rose-400 flex items-center gap-2">
                                <ThumbsDown className="w-5 h-5" />
                                Leads "Baratos"
                              </h3>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Custo Por Lead na Meta em Abril era de apenas <strong className="text-white">R$ 10,20</strong>. Essa métrica mascarava o desperdício porque quase 95% dos leads não tinham o perfil ou renda necessários.
                              </p>
                            </div>
                          </div>

                          {/* Box 2: Início Bom */}
                          <div className="p-5 bg-blue-950/15 border border-blue-900/30 rounded-2xl space-y-3 flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-blue-400/10 text-blue-400 border border-blue-400/20">
                                  Topo do Funil
                                </span>
                              </div>
                              <h3 className="text-lg font-bold font-display text-blue-300 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5" />
                                Início Bom (Volume)
                              </h3>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Imensa quantidade de notificações em tempo real. No topo do funil imobiliário, as campanhas geravam engajamento rápido e grande alcance nas mídias do Parque Una.
                              </p>
                            </div>
                          </div>

                          {/* Box 3: Meio e Fim ruins */}
                          <div className="p-5 bg-amber-950/15 border border-amber-900/30 rounded-2xl space-y-3 flex flex-col justify-between">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                                  Realidade Comercial
                                </span>
                              </div>
                              <h3 className="text-lg font-bold font-display text-amber-400 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                Meio e Fim Ruins
                              </h3>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Péssimo aproveitamento no funil de negociação de vendas. Corretores perdiam dezenas de horas filtrando números inválidos ou sem qualquer qualificação financeira.
                              </p>
                            </div>
                          </div>

                        </div>

                        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-slate-300 flex items-center gap-3.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0"></span>
                          <span><strong>Constatação Crítica para o Parque Una SJC:</strong> Gerar cadastros fáceis sem triagem sobrecarregava as imobiliárias locais parceiras e criava o falso sentimento de que o produto imobiliário não estava atraindo interesse qualificado.</span>
                        </div>
                      </div>
                    )}

                    {/* SLIDE 3: O QUE FAZER? */}
                    {currentSlide === 3 && (
                      <div className="space-y-6 flex-grow">
                        <div className="text-center py-4 space-y-2">
                          <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest block uppercase">
                            A Nova Diretriz Parque Una 2026
                          </span>
                          <h3 className="text-3xl font-black font-display text-white tracking-tight">
                            QUALIFICAR = FILTRAR
                          </h3>
                          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                            Mude o slider de qualificação abaixo para ver como o filtro gera ganho substancial ao filtrar contatos superficiais.
                          </p>
                        </div>

                        {/* Interactive Filter Slider Showcase */}
                        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl mx-auto space-y-6 shadow-xl">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-400 font-semibold font-display">Simular Rigor de Entrada (Filtro)</span>
                              <span className="font-bold font-mono text-purple-400">Nível {filterLevel} / 5</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="5"
                              value={filterLevel}
                              onChange={(e) => setFilterLevel(Number(e.target.value))}
                              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                              <span>Meta Forms (Volume Máximo)</span>
                              <span>Página Inteligente (Sugerida)</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                            <div>
                              <span className="text-[10px] text-slate-500 block">Total Leads</span>
                              <span className="text-base font-bold text-slate-300 font-mono">{filterMetrics.leads}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-emerald-400 block">% Qualificação</span>
                              <span className="text-base font-bold text-emerald-400 font-mono">{filterMetrics.qualRate}%</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-emerald-500 block">Leads Reais Quentes</span>
                              <span className="text-base font-semibold text-emerald-300 font-mono">{filterMetrics.qualifiedLeads}</span>
                            </div>
                          </div>

                          <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-[11px] text-slate-400 leading-relaxed text-center">
                            {filterLevel === 1 && "Foco puramente em cliques baratos. Você terá centenas de imobiliários curiosos sem real capacidade de aquisição."}
                            {filterLevel === 2 && "Leves refinamentos no anúncio ainda geram alto descarte de corretagem."}
                            {filterLevel === 3 && "Equilíbrio intermediário. Início de segmentações inteligentes."}
                            {filterLevel === 4 && "Uso da página oficial com filtro ativo. Diminuição do tempo de atendimento de leads frios."}
                            {filterLevel === 5 && "Configuração Recomendada: leads educados previamente por fotos de SJC e dados técnicos. Máxima taxa de conversão imobiliária."}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SLIDE 4: COMO FAZEMOS ISSO? */}
                    {currentSlide === 4 && (
                      <div className="space-y-8 flex-grow">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-4 border-b border-indigo-950">
                          <div className="space-y-2">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest font-display block">A Linha de Captação</span>
                            <div className="flex flex-wrap items-center gap-2 text-sm font-bold font-display">
                              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">1. IMPRESSÃO</span>
                              <span className="text-slate-600">➜</span>
                              <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">2. CLIQUE</span>
                              <span className="text-slate-600">➜</span>
                              <span className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-900/60 flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                                3. LP DIRECIONADA E FORMS ESPECÍFICOS
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          
                          {/* Section left: interactive quiz question builder */}
                          <div className="lg:col-span-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                            <span className="text-xs font-bold text-slate-400 uppercase">Amostra do Formulário Inteligente</span>
                            
                            <div className="space-y-3 text-xs">
                              {/* Question 1 */}
                              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 transition-all hover:border-slate-800">
                                <span className="text-[10px] text-slate-500 block uppercase">Pergunta 1</span>
                                <span className="font-bold text-white block mt-0.5">"Morar ou investir?"</span>
                                <div className="flex gap-2 mt-2">
                                  <button
                                    onClick={() => setQuizForm({...quizForm, objective: 'morar'})}
                                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${quizForm.objective === 'morar' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                                  >
                                    Morar
                                  </button>
                                  <button
                                    onClick={() => setQuizForm({...quizForm, objective: 'investir'})}
                                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${quizForm.objective === 'investir' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                                  >
                                    Investir
                                  </button>
                                </div>
                              </div>

                              {/* Question 2 */}
                              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 transition-all hover:border-slate-800">
                                <span className="text-[10px] text-slate-500 block uppercase">Pergunta 2</span>
                                <span className="font-bold text-white block mt-0.5">"Apartamento ou sala comercial?"</span>
                                <div className="flex gap-2 mt-2">
                                  <button
                                    onClick={() => setQuizForm({...quizForm, type: 'apartamento'})}
                                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${quizForm.type === 'apartamento' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                                  >
                                    Apartamento
                                  </button>
                                  <button
                                    onClick={() => setQuizForm({...quizForm, type: 'sala'})}
                                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${quizForm.type === 'sala' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                                  >
                                    Sala Comercial
                                  </button>
                                </div>
                              </div>

                              {/* Question 3 */}
                              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 transition-all hover:border-slate-800">
                                <span className="text-[10px] text-slate-500 block uppercase">Pergunta 3</span>
                                <span className="font-bold text-white block mt-0.5">"120 ou 180m²?"</span>
                                <div className="flex gap-2 mt-2">
                                  <button
                                    onClick={() => setQuizForm({...quizForm, size: '120m'})}
                                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${quizForm.size === '120m' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                                  >
                                    120 m²
                                  </button>
                                  <button
                                    onClick={() => setQuizForm({...quizForm, size: '180m'})}
                                    className={`px-3 py-1 rounded-lg font-semibold transition-all ${quizForm.size === '180m' ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400'}`}
                                  >
                                    180 m²
                                  </button>
                                </div>
                              </div>

                            </div>
                          </div>

                          {/* Section right: official Landing page link card */}
                          <div className="lg:col-span-8">
                            <div className="bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-purple-500/20 rounded-3xl p-8 flex flex-col items-center text-center justify-center space-y-6 h-full min-h-[350px]">
                              <div className="p-4 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-400">
                                <Building2 className="w-10 h-10" />
                              </div>
                              <div className="space-y-2 max-w-md">
                                <h4 className="text-xl font-bold font-display text-white">Página Oficial Parque Una SJC</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  Acesse o site oficial do empreendimento e do bairro planejado mais desejado, contendo todos os detalhes de arquitetura, paisagismo, segurança e lazer do Parque Una.
                                </p>
                              </div>
                              <div className="flex flex-col sm:flex-row items-center gap-4">
                                <a 
                                  href="https://parque-una.vercel.app/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-purple-600/30 hover:scale-102 active:scale-98 transition-all font-display"
                                >
                                  Acessar Página Verdadeira
                                  <span className="text-[10px] text-purple-200">(parque-una.vercel.app)</span>
                                  <ArrowUpRight className="w-4.5 h-4.5" />
                                </a>
                                <a 
                                  href="https://drive.google.com/drive/folders/1yXHH2m1aRmTUghQzkKhczxgZdfyr4F54"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl shadow-md hover:scale-102 active:scale-98 transition-all font-display border border-slate-750"
                                >
                                  Sugestões de Novos Anúncios
                                  <span className="text-[10px] text-slate-400">(Google Drive)</span>
                                  <ArrowUpRight className="w-4.5 h-4.5" />
                                </a>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                    {/* SLIDE 5: O QUE ESPERAMOS? */}
                    {currentSlide === 5 && (
                      <div className="space-y-6 flex-grow">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Box 1: Apenas leads engajados */}
                          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
                            <span className="text-xs text-purple-400 font-bold uppercase block tracking-wider font-display">Meta Primária</span>
                            <h4 className="text-base font-bold text-white">Apenas Leads Engajados</h4>
                            <p className="text-xs text-slate-400 leading-normal">
                              O preenchimento consciente da página elimina leads frios digitadores acidentais. Os contatos chegam educados, sabendo as metragens (120m² e 180m²), preço base e vantagens do Parque Una SJC.
                            </p>
                          </div>

                          {/* Box 2: Início Lento */}
                          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
                            <span className="text-xs text-blue-400 font-bold uppercase block tracking-wider font-display">Janela De Aprendizado</span>
                            <h4 className="text-base font-bold text-white">Início Lento nas Campanhas</h4>
                            <p className="text-xs text-slate-400 leading-normal">
                              No início, haverá uma nítida redução no volume de leads recebidos. É um comportamento esperado e positivo que reflete a barreira de qualificação ativa na página externa.
                            </p>
                          </div>

                          {/* Box 3: Melhora Conforme Treinamento */}
                          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2">
                            <span className="text-xs text-emerald-400 font-bold uppercase block tracking-wider font-display">Algoritmo Inteligente</span>
                            <h4 className="text-base font-bold text-white">Melhora Conforme Treinamento</h4>
                            <p className="text-xs text-slate-400 leading-normal">
                              O algoritmo da Meta e do Google aprende quem de fato converte no formulário da página oficial e otimiza a entrega para perfis semelhantes em São José dos Campos e Vale do Paraíba.
                            </p>
                          </div>

                        </div>

                        {/* Interactive simulation showing impact on performance */}
                        <div className="space-y-4 pt-4 border-t border-slate-800">
                          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-display">
                            Simulação de Desempenho Integrada
                          </h4>
                          <InteractiveSimulator />
                        </div>
                      </div>
                    )}

                    {/* SLIDE 6: ACOMPANHAMENTO */}
                    {currentSlide === 6 && (
                      <div className="space-y-8 flex-grow">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Box 1: Social View */}
                          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                              SV
                            </div>
                            <h4 className="text-lg font-bold font-display text-white">Social View</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Monitoramento frequente de comentários, cliques, sentimentos públicos nos anúncios e análise aprofundada dos criativos para garantir atração constante.
                            </p>
                          </div>

                          {/* Box 2: Feedbacks */}
                          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                              FB
                            </div>
                            <h4 className="text-lg font-bold font-display text-white">Feedbacks</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Reunião sistemática das informações colhidas pelos corretores imobiliários parceiros do Parque Una SJC. Ajustes rápidos na LP caso fujam do perfil esperado.
                            </p>
                          </div>

                          {/* Box 3: Reuniões */}
                          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                              RE
                            </div>
                            <h4 className="text-lg font-bold font-display text-white">Reuniões</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Encontros semanais de alinhamento estratégico para aferir o custo por lead qualificado de vendas, redirecionando verba para o canal com melhor ROI imobiliário.
                            </p>
                          </div>

                        </div>

                        {/* Interactive Feedback & Action Desk panel */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-slate-800">
                          
                          <div className="md:col-span-6 p-5 bg-slate-900 rounded-2xl border border-slate-810 space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">
                              Enviar Feedback da Força de Vendas
                            </h4>
                            <p className="text-[11px] text-zinc-400">
                              Os corretores de SJC podem reportar diretamente se os leads coletados através das perguntas 120m²/180m² e Morar/Investir estão corretos.
                            </p>

                            <form onSubmit={submitFeedback} className="space-y-3">
                              <textarea
                                value={feedbackMessage}
                                onChange={(e) => setQuizForm({...quizForm})} // Keep safe
                                onInput={(e) => setFeedbackMessage((e.target as HTMLTextAreaElement).value)}
                                placeholder="Ex: Lead Roberto veio muito qualificado, agendou reunião de visita para ver as frações do Parque Una SJC este sábado."
                                className="w-full text-xs p-3 rounded-lg border border-slate-800 bg-slate-950 text-slate-200 outline-none focus:border-purple-500 min-h-[80px]"
                              ></textarea>
                              <button
                                type="submit"
                                className="w-full bg-white text-slate-900 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
                              >
                                {feedbackSent ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    Feedback enviado com sucesso!
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-3.5 h-3.5" />
                                    Enviar para equipe de Mídia
                                  </>
                                )}
                              </button>
                            </form>
                          </div>

                          <div className="md:col-span-6 p-5 bg-slate-900 rounded-2xl border border-slate-810 flex flex-col justify-between">
                            <div className="space-y-2">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">
                                Cronograma de Reuniões Técnicas
                              </h4>
                              <p className="text-[11px] text-zinc-400">
                                Próximo alinhamento estratégico de mídia e feedback comercial do lançamento do Parque Una SJC.
                              </p>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between gap-4 mt-2">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-indigo-400 shrink-0" />
                                <div>
                                  <span className="text-[10px] text-slate-400 block uppercase">Alinhamento Mídia SJC</span>
                                  <span className="text-xs font-bold text-white block">Datas a combinar</span>
                                </div>
                              </div>
                              <span className="text-[10px] bg-indigo-900/40 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800 font-semibold uppercase">
                                Periódico
                              </span>
                            </div>

                            <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Conselho estratégico ativo com gerentes de vendas de SJC.
                            </div>
                          </div>

                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide Navigation Pagination Footer */}
              <div className="border-t border-slate-800 bg-slate-950/40 px-6 py-4 flex items-center justify-between">
                <button
                  id="prev-slide-btn"
                  onClick={handlePrev}
                  disabled={currentSlide === 1}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    currentSlide === 1
                      ? 'text-slate-600 border border-transparent cursor-not-allowed'
                      : 'text-slate-300 border border-slate-800 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>

                <div className="text-xs font-mono text-slate-400">
                  Slide <strong className="text-white">{currentSlide}</strong> de 6
                </div>

                <button
                  id="next-slide-btn"
                  onClick={handleNext}
                  disabled={currentSlide === 6}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                    currentSlide === 6
                      ? 'text-slate-600 border border-transparent cursor-not-allowed'
                      : 'bg-white text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Próximo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Slide 1 Grid Card */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-4">
              <span className="text-xs text-purple-400 font-mono font-bold uppercase tracking-wider block">Slide 01</span>
              <h3 className="text-xl font-bold font-display text-white">Como Estávamos Fazendo?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                As campanhas da Meta Ads dependiam de formulários simplificados que preenchiam automaticamente os dados do usuário. Isso causava grande volume mas zero qualificação.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-semibold block uppercase">Facilidade de Clique</span>
                  <p className="text-xs text-slate-500 mt-1">Sua conveniência preenchia automaticamente, induzindo cliques casuais e cadastros acidentais.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-semibold block uppercase">Foco na Meta e não Google</span>
                  <p className="text-xs text-slate-500 mt-1">Priorizava-se volume de entretenimento visual no Instagram sobre buscas acionáveis no Google Ads.</p>
                </div>
              </div>
              <div className="pt-4">
                <CampaignDetails />
              </div>
            </div>

            {/* Slide 2 Grid Card */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-4">
              <span className="text-xs text-purple-400 font-mono font-bold uppercase tracking-wider block">Slide 02</span>
              <h3 className="text-xl font-bold font-display text-white">O Que Gerou?</h3>
              <p className="text-xs text-slate-400">O que gerou? Avaliação direta do aproveitamento no funil:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-rose-400 block uppercase">Leads "Baratos"</span>
                  <p className="text-xs text-slate-500 mt-1">CPL baixo (R$ 10,20 / R$ 15,30) que induzia a falsas avaliações excelentes na entrega de verba de anúncios.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-blue-300 block uppercase">Início Bom</span>
                  <p className="text-xs text-slate-500 mt-1">Atração massiva de topo de funil e alta taxa de visualização e engajamento inicial de audiência.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block uppercase">Meio e Fim Ruins</span>
                  <p className="text-xs text-slate-500 mt-1">Leads sem qualificação financeira ou real telefone/contato quente desaguavam na prefeitura do comercial imobiliário.</p>
                </div>
              </div>
            </div>

            {/* Slide 3 Grid Card */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-4">
              <span className="text-xs text-purple-400 font-mono font-bold uppercase tracking-wider block">Slide 03</span>
              <h3 className="text-xl font-bold font-display text-white">O Que Fazer?</h3>
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h4 className="text-2xl font-black text-white font-display">QUALIFICAR = FILTRAR</h4>
                  <p className="text-xs text-slate-400 mt-1">Priorização total da assertividade sobre o volume absoluto de topo de marketing.</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-850">
                  <span className="text-[10px] text-emerald-400 block font-mono">Filtragem Recomendada</span>
                  <span className="text-sm font-bold text-slate-100 font-display">Filtro Externo Convicto</span>
                </div>
              </div>
            </div>

            {/* Slide 4 Grid Card */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-4">
              <span className="text-xs text-purple-400 font-mono font-bold uppercase tracking-wider block">Slide 04</span>
              <h3 className="text-xl font-bold font-display text-white">Como Fazemos Isso?</h3>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold font-display mb-4">
                <span className="px-2.5 py-1 rounded bg-slate-900">IMPRESSÃO</span>
                <span className="text-slate-600">➜</span>
                <span className="px-2.5 py-1 rounded bg-slate-900">CLIQUE</span>
                <span className="text-slate-600">➜</span>
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300">LP DIRECIONADA E FORMS ESPECÍFICOS</span>
              </div>
              <div className="bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-purple-500/20 rounded-3xl p-8 flex flex-col items-center text-center justify-center space-y-6 min-h-[280px]">
                <div className="p-4 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-400">
                  <Building2 className="w-10 h-10" />
                </div>
                <div className="space-y-2 max-w-md">
                  <h4 className="text-xl font-bold font-display text-white">Página Oficial Parque Una SJC</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Acesse o site oficial do empreendimento e do bairro planejado mais desejado, contendo todos os detalhes de arquitetura, paisagismo, segurança e lazer do Parque Una.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a 
                    href="https://parque-una.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-purple-600/30 hover:scale-102 active:scale-98 transition-all font-display"
                  >
                    Acessar Página Verdadeira
                    <span className="text-[10px] text-purple-200">(parque-una.vercel.app)</span>
                    <ArrowUpRight className="w-4.5 h-4.5" />
                  </a>
                  <a 
                    href="https://drive.google.com/drive/folders/1yXHH2m1aRmTUghQzkKhczxgZdfyr4F54"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl shadow-md hover:scale-102 active:scale-98 transition-all font-display border border-slate-750"
                  >
                    Sugestões de Novos Anúncios
                    <span className="text-[10px] text-slate-400">(Google Drive)</span>
                    <ArrowUpRight className="w-4.5 h-4.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Slide 5 Grid Card */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-4">
              <span className="text-xs text-purple-400 font-mono font-bold uppercase tracking-wider block">Slide 05</span>
              <h3 className="text-xl font-bold font-display text-white">O Que Esperamos?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl">
                  <span className="text-xs font-bold text-emerald-400 block uppercase">Apenas Leads Engajados</span>
                  <p className="text-xs text-slate-500 mt-1">Entregas altamente qualificadas sem cliques e envios desatentos.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl">
                  <span className="text-xs font-bold text-blue-400 block uppercase">Início Lento nas Campanhas</span>
                  <p className="text-xs text-slate-500 mt-1">Arrefecimento normal e antecipado de volumes brutos de entrada imobiliária.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl">
                  <span className="text-xs font-bold text-amber-500 block uppercase">Melhora Conforme Treinamento</span>
                  <p className="text-xs text-slate-500 mt-1">Otimização correta dos canais baseados em pessoas qualificadas convertidas.</p>
                </div>
              </div>
              <InteractiveSimulator />
            </div>

            {/* Slide 6 Grid Card */}
            <div className="bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-4">
              <span className="text-xs text-purple-400 font-mono font-bold uppercase tracking-wider block">Slide 06</span>
              <h3 className="text-xl font-bold font-display text-white">Acompanhamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900 rounded-xl">
                  <span className="text-xs font-bold text-slate-300 block">Social View</span>
                  <p className="text-xs text-slate-500 mt-1">Acompanhamento constante das interações, cliques e feedback de sentimento público.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl">
                  <span className="text-xs font-bold text-slate-300 block">Feedbacks</span>
                  <p className="text-xs text-slate-500 mt-1">Coletas frequentes de leads comerciais diretamente com equipes parceiras de corretores SJC.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl">
                  <span className="text-xs font-bold text-slate-300 block">Reuniões</span>
                  <p className="text-xs text-slate-500 mt-1">Direcionamentos de performance imobiliária e realocamento de orçamento semanalmente.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
