import React, { useState, useMemo } from 'react';
import { Sliders, Calculator, ShieldCheck, FileSpreadsheet, Percent, HelpCircle, ArrowUpRight, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function InteractiveSimulator() {
  const [googleBudget, setGoogleBudget] = useState<number>(3000); // Default expanded from May (R$2200)
  const [metaBudget, setMetaBudget] = useState<number>(2500); // Default R$2500
  const [metaStrategy, setMetaStrategy] = useState<'form' | 'page'>('page');

  // Calculations based on the actual marketing variables
  const simulation = useMemo(() => {
    // Google:
    // CPL improves slightly with bigger budget inside sweet spot or remains stable. We set avg Google CPL = R$ 42.
    // Quality stays high at 38%
    const googleCpl = 42;
    const googleLeads = Math.round(googleBudget / googleCpl);
    const googleQualRate = 38.0; // 38%
    const googleQualifiedLeads = Math.round(googleLeads * (googleQualRate / 100));
    const googleReach = googleBudget * 6.8; // Appx impressions

    // Meta:
    // With Native Forms: CPL is cheap (e.g. R$ 11.50) but quality is low (5.0%)
    // With Custom Landing Page: CPL increases due to friction (e.g. R$ 38.00) but quality increases to 25.0%!
    const isPage = metaStrategy === 'page';
    const metaCpl = isPage ? 36 : 12.5;
    const metaQualRate = isPage ? 24.5 : 5.0;
    
    const metaLeads = Math.round(metaBudget / metaCpl);
    const metaQualifiedLeads = Math.round(metaLeads * (metaQualRate / 100));
    const metaReach = metaBudget * 14.5; // High organic reach in Meta

    // Totals
    const totalBudget = googleBudget + metaBudget;
    const totalLeads = googleLeads + metaLeads;
    const totalQualifiedLeads = googleQualifiedLeads + metaQualifiedLeads;
    const overallCpql = totalQualifiedLeads > 0 ? totalBudget / totalQualifiedLeads : 0;
    const overallSuccessRate = totalLeads > 0 ? (totalQualifiedLeads / totalLeads) * 100 : 0;

    // Estimation of sales opportunities (hot pipeline)
    // 5% of qualified leads become close prospects
    const prospectiveDeals = Math.max(1, Math.round(totalQualifiedLeads * 0.08));

    return {
      google: {
        budget: googleBudget,
        leads: googleLeads,
        qualified: googleQualifiedLeads,
        qualRate: googleQualRate,
        cpl: googleCpl,
        cpql: googleBudget / (googleQualifiedLeads || 1),
        reach: googleReach
      },
      meta: {
        budget: metaBudget,
        leads: metaLeads,
        qualified: metaQualifiedLeads,
        qualRate: metaQualRate,
        cpl: metaCpl,
        cpql: metaBudget / (metaQualifiedLeads || 1),
        reach: metaReach
      },
      totals: {
        budget: totalBudget,
        leads: totalLeads,
        qualified: totalQualifiedLeads,
        cpql: overallCpql,
        successRate: overallSuccessRate,
        deals: prospectiveDeals
      }
    };
  }, [googleBudget, metaBudget, metaStrategy]);

  return (
    <div id="simulator-dashboard" className="bg-slate-900 border border-slate-800 text-white rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
      {/* Sidebar Controls */}
      <div className="lg:col-span-4 p-6 md:p-8 bg-slate-950/60 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-8">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-display flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            Simulador Estratégico
          </span>
          <h3 className="text-xl font-bold font-display mt-2">
            Projetar Investimento
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Ajuste a verba e preveja a qualificação de leads com a nova página <strong className="text-white">Parque Una | Lançamento 2026</strong>.
          </p>
        </div>

        {/* Control 1: Google Ads */}
        <div id="control-google" className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              Verba Google Ads
            </label>
            <span className="text-sm font-bold font-mono text-blue-400">
              R$ {googleBudget.toLocaleString('pt-BR')}
            </span>
          </div>
          <input
            id="slider-google-budget"
            type="range"
            min="1000"
            max="12000"
            step="500"
            value={googleBudget}
            onChange={(e) => setGoogleBudget(Number(e.target.value))}
            className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>R$ 1.000</span>
            <span>R$ 6.000</span>
            <span>R$ 12.000</span>
          </div>
        </div>

        {/* Control 2: Meta Ads */}
        <div id="control-meta" className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              Verba Meta Ads
            </label>
            <span className="text-sm font-bold font-mono text-purple-400">
              R$ {metaBudget.toLocaleString('pt-BR')}
            </span>
          </div>
          <input
            id="slider-meta-budget"
            type="range"
            min="500"
            max="10000"
            step="500"
            value={metaBudget}
            onChange={(e) => setMetaBudget(Number(e.target.value))}
            className="w-full accent-purple-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>R$ 500</span>
            <span>R$ 5.000</span>
            <span>R$ 10.000</span>
          </div>
        </div>

        {/* Control 3: Destinatário Meta Strategy */}
        <div id="control-strategy" className="space-y-4 pt-2">
          <label className="text-xs font-bold text-slate-300 block uppercase tracking-wider font-display">
            Destino dos Leads (Meta Ads)
          </label>
          <div className="grid grid-cols-1 gap-2">
            <button
              id="strategy-btn-form"
              onClick={() => setMetaStrategy('form')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                metaStrategy === 'form'
                  ? 'bg-slate-800 border-purple-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-display">Formulário Nativo da Meta</span>
                <span className="text-[10px] px-1.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded font-semibold font-mono">
                  Antigo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Facilidade extrema de preenchimento automático. Alto volume de cadastros acidentais com baixa qualificação (~5% úteis).
              </p>
            </button>

            <button
              id="strategy-btn-page"
              onClick={() => setMetaStrategy('page')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                metaStrategy === 'page'
                  ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-emerald-500/80 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold font-display flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  Pág. Parque Una Lançamento
                </span>
                <span className="text-[10px] px-1.5 bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 rounded font-semibold font-mono">
                  Sugerido
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Clique direcionado para a nova página explicativa. Filtra curiosos e entrega leads altamente educados e qualificados (~24.5% úteis).
              </p>
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl">
          <div className="text-[11px] text-slate-400 leading-relaxed font-sans">
            💡 <strong>Análise da agência:</strong> Redirecionar os leads da Meta para a página externa reduz o volume total bruto, mas eleva drasticamente a assertividade comercial, economizando tempo crucial da nossa equipe de vendas.
          </div>
        </div>
      </div>

      {/* Main Stats Display */}
      <div className="lg:col-span-8 p-6 md:p-8 space-y-8 flex flex-col justify-between">
        
        {/* KPI Row Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Verba Total */}
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Verba Total Estimada</span>
            <div className="mt-2">
              <span className="text-2xl font-bold font-display">
                R$ {simulation.totals.budget.toLocaleString('pt-BR')}
              </span>
              <span className="text-xs text-slate-500 block mt-1">Soma de Google e Meta</span>
            </div>
          </div>

          {/* Card 2: Total de Leads */}
          <div className="p-5 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Volume Bruto de Leads</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold font-display text-amber-400">
                {simulation.totals.leads}
              </span>
              <span className="text-xs text-slate-500">leads</span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-2">
              {metaStrategy === 'page' ? 'Volume enxuto e qualificado' : 'Alto volume bruto de cadastros'}
            </span>
          </div>

          {/* Card 3: Leads Qualificados (O Santo Graal) */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 flex flex-col justify-between">
            <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Leads Qualificados (Reais)
            </span>
            <div className="mt-2">
              <span className="text-3xl font-extrabold font-display text-emerald-400">
                {simulation.totals.qualifiedLeads}
              </span>
              <span className="text-xs text-slate-300 block mt-1">Prontos para contato comercial</span>
            </div>
          </div>

        </div>

        {/* Channels Breakdown comparison list */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">
            Desempenho Previsto por Canal de Mídia
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Google Forecast Widget */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-blue-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Google Ads (Pesquisa)
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-300">
                  Qualificação: {simulation.google.qualRate}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center py-1">
                <div>
                  <span className="text-[10px] text-slate-500 block">Investido</span>
                  <span className="text-xs font-bold font-mono">R$ {simulation.google.budget}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Leads Brutos</span>
                  <span className="text-xs font-bold">{simulation.google.leads}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-500 block">Qualificados</span>
                  <span className="text-xs font-bold text-emerald-400">{simulation.google.qualified}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/60 flex justify-between text-[11px] text-slate-400">
                <span>CPL: R$ {simulation.google.cpl.toFixed(2)}</span>
                <span className="text-emerald-400">CPQL: R$ {simulation.google.cpql.toFixed(2)}</span>
              </div>
            </div>

            {/* Meta Forecast Widget */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-purple-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Meta Ads
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded font-mono text-slate-300">
                  Qualificação: {simulation.meta.qualRate}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center py-1">
                <div>
                  <span className="text-[10px] text-slate-500 block">Investido</span>
                  <span className="text-xs font-bold font-mono">R$ {simulation.meta.budget}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Leads Brutos</span>
                  <span className="text-xs font-bold">{simulation.meta.leads}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-500 block">Qualificados</span>
                  <span className="text-xs font-bold text-emerald-400">{simulation.meta.qualified}</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800/60 flex justify-between text-[11px] text-slate-400">
                <span>CPL: R$ {simulation.meta.cpl.toFixed(2)}</span>
                <span className="text-emerald-400">CPQL: R$ {simulation.meta.cpql.toFixed(2)}</span>
              </div>
            </div>

          </div>
        </div>

        {/* CPQL Advantage explanation */}
        <div className="bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-800/30 p-5 rounded-2xl flex flex-col md:flex-row items-center gap-5 justify-between">
          <div className="space-y-1">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest block font-display">
              Vantagem da Nova Estratégia
            </span>
            <h5 className="text-base font-bold text-white font-display">
              Custo por Lead Qualificado Real (CPQL) cai para <span className="text-emerald-400">R$ {simulation.totals.cpql.toFixed(2)}</span>
            </h5>
            <p className="text-xs text-slate-300 leading-normal max-w-xl">
              {metaStrategy === 'page' ? (
                <span>No modelo anterior, gerávamos muitos curiosos. Agora, ao filtrar os leads através da página <strong>Parque Una Lançamento 2026</strong>, reduzimos o desperdício financeiro de captação e triagem comercial.</span>
              ) : (
                <span className="text-amber-300">Aviso: Mantendo o Formulário Nativo, o custo de triagem de leads inválidos é estimado em mais de R$ 90 adicionais por lead quente de corretor.</span>
              )}
            </p>
          </div>

          <div className="text-center bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0 min-w-[140px]">
            <span className="text-[10px] text-slate-400 block uppercase">Leads Qualificados / Mês</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
              {simulation.totals.successRate.toFixed(1)}%
            </div>
            <span className="text-[9px] text-slate-500">De aproveitamento do funil</span>
          </div>
        </div>

        {/* Simulated Funnel visualization */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-display">
              Projeção de Funil Estimado (Pipeline Parque Una 2026)
            </h4>
            <span className="text-[10px] text-slate-400">Taxas estimativas de conversão imobiliária</span>
          </div>

          {/* Svg / Pure CSS Funnel */}
          <div className="space-y-2.5">
            {/* Stage 1: Visitas estimadas */}
            <div>
              <div className="flex justify-between items-center text-xs text-slate-300 mb-1">
                <span>1. Visitas Qualificadas na Página</span>
                <span className="font-semibold">{Math.round(simulation.totals.reach * 0.08)} cliques</span>
              </div>
              <div className="h-6 bg-slate-950/60 rounded-lg border border-slate-800 overflow-hidden flex items-center px-3 relative">
                <div className="absolute top-0 left-0 bottom-0 bg-blue-500/10 w-[100%] transition-all"></div>
                <span className="text-[10px] text-slate-400 z-10">Qualificação Base de Pesquisa e Interesses segmentados por Cidade</span>
              </div>
            </div>

            {/* Stage 2: Lead Bruto */}
            <div>
              <div className="flex justify-between items-center text-xs text-slate-300 mb-1">
                <span>2. Leads Brutos Cadastrados</span>
                <span className="font-semibold text-amber-400">{simulation.totals.leads} cadastros</span>
              </div>
              <div className="h-6 bg-slate-950/60 rounded-lg border border-slate-800 overflow-hidden flex items-center px-3 relative">
                <div 
                  className="absolute top-0 left-0 bottom-0 bg-amber-500/15 transition-all"
                  style={{ width: `${Math.max(15, Math.min(100, (simulation.totals.leads / (Math.round(simulation.totals.reach * 0.08) || 1)) * 100))}%` }}
                ></div>
                <span className="text-[10px] text-slate-400 z-10">Custo médio do Lead: R$ {((simulation.totals.budget) / (simulation.totals.leads || 1)).toFixed(2)}</span>
              </div>
            </div>

            {/* Stage 3: Leads Qualificados Reais */}
            <div>
              <div className="flex justify-between items-center text-xs text-slate-300 mb-1">
                <span>3. Leads Altamente Qualificados (Contatos Quentes)</span>
                <span className="font-semibold text-emerald-400">{simulation.totals.qualifiedLeads} leads quentes</span>
              </div>
              <div className="h-6 bg-slate-950/60 rounded-lg border border-slate-800 overflow-hidden flex items-center px-3 relative">
                <div 
                  className="absolute top-0 left-0 bottom-0 bg-emerald-500/20 transition-all"
                  style={{ width: `${Math.max(8, Math.min(100, (simulation.totals.qualifiedLeads / (simulation.totals.leads || 1)) * 100))}%` }}
                ></div>
                <span className="text-[10px] text-emerald-300 z-10 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  Índice de aproveitamento: {simulation.totals.successRate.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Stage 4: Probable pipeline opportunities */}
            <div>
              <div className="flex justify-between items-center text-xs text-slate-300 mb-1">
                <span>4. Oportunidades Claras de Atendimento de Corretores</span>
                <span className="font-semibold text-blue-400">~{simulation.totals.deals} visitas agendadas</span>
              </div>
              <div className="h-6 bg-slate-950/60 rounded-lg border border-slate-800 overflow-hidden flex items-center px-3 relative">
                <div 
                  className="absolute top-0 left-0 bottom-0 bg-blue-500/25 transition-all"
                  style={{ width: `${Math.max(5, Math.min(100, (simulation.totals.deals / (simulation.totals.qualifiedLeads || 1)) * 100))}%` }}
                ></div>
                <span className="text-[10px] text-slate-400 z-10">Previsão de Pipeline direto para fechamento</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
