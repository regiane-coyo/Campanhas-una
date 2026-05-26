import React, { useState } from 'react';
import { googleData, metaData } from '../data';
import { ArrowDown, ArrowUp, CheckCircle2, TrendingUp, Sparkles, Building2, MapPin, Eye, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CampaignDetails() {
  const [activeTab, setActiveTab] = useState<'google' | 'meta'>('google');

  const data = activeTab === 'google' ? googleData : metaData;

  // Calculando variações de Abril para Maio
  const april = data.history[0];
  const may = data.history[1];

  const reachDiff = ((may.reach - april.reach) / april.reach) * 100;
  const leadsDiff = ((may.leads - april.leads) / april.leads) * 100;
  const cplDiff = ((may.cpl - april.cpl) / april.cpl) * 100;

  return (
    <div id="campaign-details-section" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-100 dark:border-slate-800 p-2 bg-slate-50/50 dark:bg-slate-950/20">
        <button
          id="tab-btn-google"
          onClick={() => setActiveTab('google')}
          className={`flex-1 py-3 px-4 rounded-xl font-display font-medium text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'google'
              ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm font-semibold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/20'
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          Google Ads (Pesquisa Qualificada)
        </button>
        <button
          id="tab-btn-meta"
          onClick={() => setActiveTab('meta')}
          className={`flex-1 py-3 px-4 rounded-xl font-display font-medium text-sm transition-all flex items-center justify-center gap-2 ${
            activeTab === 'meta'
              ? 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm font-semibold'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/20'
          }`}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
          Meta Ads (Alcance & Interesse)
        </button>
      </div>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'google' ? -15 : 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'google' ? 15 : -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header Platform */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    activeTab === 'google' 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400' 
                      : 'bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400'
                  }`}>
                    {activeTab === 'google' ? 'Funil de Intenção Direta' : 'Funil de Descoberta & Interesse'}
                  </span>
                  {activeTab === 'meta' && (
                    <span className="bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Novidade: Foco em Lead Qualificado
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold font-display text-slate-800 dark:text-slate-100">
                  Histórico e Estratégia de {data.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {data.description}
                </p>
              </div>

              {/* Quick Status Check */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 min-w-[200px]">
                <span className="text-xs text-slate-400 block font-medium">Situação Recente (Maio)</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-300">
                    {activeTab === 'google' ? 'Investimento Ativo' : 'Redução Planejada'}
                  </span>
                </div>
                <div className="mt-2 text-xs flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                    activeTab === 'google' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}></span>
                  {activeTab === 'google' ? 'Necessita aumento de verba' : 'Mudança para pág. externa'}
                </div>
              </div>
            </div>

            {/* Campaign Metrics Comparison (April vs May) */}
            <div className="py-8">
              <h4 className="text-base font-semibold font-display text-slate-700 dark:text-slate-300 mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-slate-400" />
                Desempenho Recente (Comparativo {april.month} vs {may.month})
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Metric Box 1: Reach / Impressoes */}
                <div className="p-5 bg-slate-50/50 dark:bg-slate-950/30 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-slate-400">
                      {activeTab === 'google' ? 'Impressões de Busca' : 'Alcance Total'}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold ${
                      reachDiff > 0 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400'
                    }`}>
                      {reachDiff > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(reachDiff).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                      {may.reach.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs text-slate-400">
                      vs {april.reach.toLocaleString('pt-BR')} em {april.month}
                    </span>
                  </div>
                  <div className="mt-4 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${activeTab === 'google' ? 'bg-blue-500' : 'bg-purple-500'}`}
                      style={{ width: `${Math.min(100, (may.reach / (april.reach + may.reach)) * 100 * 1.5)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Metric Box 2: Total Leads */}
                <div className="p-5 bg-slate-50/50 dark:bg-slate-950/30 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-slate-400">Leads Gerados</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold ${
                      leadsDiff > 0 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400'
                    }`}>
                      {leadsDiff > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(leadsDiff).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                      {may.leads}
                    </span>
                    <span className="text-xs text-slate-400">
                      vs {april.leads} em {april.month}
                    </span>
                  </div>
                  <div className="mt-4 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${activeTab === 'google' ? 'bg-blue-500' : 'bg-purple-500'}`}
                      style={{ width: `${Math.min(100, (may.leads / (april.leads + may.leads)) * 100 * 1.5)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Metric Box 3: Cost per Lead (CPL) */}
                <div className="p-5 bg-slate-50/50 dark:bg-slate-950/30 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-slate-400">Custo por Lead (CPL)</span>
                    {/* CPL decréscimo é positivo, CPL aumento é negativo para marketing */}
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold ${
                      cplDiff < 0 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400'
                    }`}>
                      {cplDiff > 0 ? <ArrowUp className="w-3 h-3 text-red-500" /> : <ArrowDown className="w-3 h-3 text-emerald-500" />}
                      {Math.abs(cplDiff).toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                      R$ {may.cpl.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400">
                      vs R$ {april.cpl.toFixed(2)} em {april.month}
                    </span>
                  </div>
                  <div className="mt-4 text-xs text-slate-400 font-medium">
                    {activeTab === 'meta' 
                      ? 'Aumento de CPL decorre de menor volume focado.' 
                      : 'Redução positiva de CPL devido a maior índice de otimização.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Repositioning Strategy Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              {/* Strategic Repositioning Description */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Novo Direcionamento Estratégico
                </h4>
                <div className="bg-slate-50 dark:bg-slate-950/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/60 leading-relaxed text-slate-600 dark:text-slate-300 text-sm space-y-3">
                  <p>{data.repositioning}</p>
                </div>

                {activeTab === 'meta' && (
                  <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100/60 dark:border-blue-900/40 p-5 rounded-2xl">
                    <h5 className="text-sm font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-1.5 mb-2">
                      <MapPin className="w-4 h-4" />
                      Dupla Segmentação Geográfica
                    </h5>
                    <p className="text-xs text-blue-600/90 dark:text-blue-400 leading-relaxed">
                      Voltaremos com as campanhas com <strong>dois conjuntos de anúncios dividindo por cidade</strong> (ex: SJC para público imediato de moradores e Vale do Paraíba / São Paulo para investidores regionais e de alto padrão). Sem formulários nativos, enviando todo tráfego qualificado diretamente para a página.
                    </p>
                  </div>
                )}
              </div>

              {/* Action Items List */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Plano de Ação Prático
                </h4>
                <div className="space-y-3">
                  {data.repositioningHighlights.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 transition-colors"
                    >
                      <div className={`mt-0.5 p-1 rounded-full ${
                        activeTab === 'google' 
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400' 
                          : 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400'
                      }`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-amber-50/30 dark:bg-amber-950/15 border border-amber-100/50 dark:border-amber-900/30 rounded-2xl flex items-center justify-between gap-4 mt-2">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 block font-display">
                        Destino da Conversão
                      </span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200 block">
                        Parque Una | Lançamento 2026
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-emerald-500 text-white px-2.5 py-1 rounded-lg">
                    Novo Link
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
