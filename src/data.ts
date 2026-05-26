import { PlatformData } from './types';

export const googleData: PlatformData = {
  name: 'Google Ads',
  description: 'Anúncios de Rede de Pesquisa focados em termos de alta intenção de compra sobre SJC (São José dos Campos) e Parque Una.',
  repositioning: 'Como temos busca e os concorrentes têm investido, sugerimos manter as campanhas de google e aumentar a verba para aparecermos em mais pesquisas. Já que os leads do google costumam ser mais qualificados que os da meta. Criamos uma nova página do Parque Una para direcionamento das campanhas que acreditamos que terá melhor resultado.',
  repositioningHighlights: [
    'Manter campanhas ativas e otimizadas',
    'Aumento de verba proporcional para dominar o Share of Search',
    'Foco em leads qualificados de alta intenção',
    'Direcionamento para a nova página exclusiva: Parque Una | Lançamento 2026'
  ],
  advantages: [
    'Público ativamente procurando por imóveis',
    'Maior maturidade na jornada de compra',
    'Fácil rastreamento de intenção de busca específica',
    'Excelente sinergia com a nova página institucional'
  ],
  history: [
    {
      month: 'Abril',
      reach: 12450, // Impressões
      leads: 38,
      qualifiedRate: 35.5,
      budget: 1800,
      cpl: 47.36
    },
    {
      month: 'Maio',
      reach: 14890,
      leads: 51,
      qualifiedRate: 38.2,
      budget: 2200,
      cpl: 43.13
    }
  ]
};

export const metaData: PlatformData = {
  name: 'Meta Ads',
  description: 'Anúncios no Instagram e Facebook baseados em descoberta, interesse e segmentação geográfica/demográfica.',
  repositioning: 'A Meta costuma gerar um maior volume de leads pela facilidade de conversão que até então era através do form da Meta. Além disso os leads da meta costumam ser por descoberta/interesse gerando leads menos qualificados. A ideia é voltar com as campanhas com dois conjuntos de anúncios dividindo por cidade (SJC e cidades do Vale do Paraíba / Polo Regional) e não utilizar mais o formulário da Meta e sim redirecionar para a página Parque Una | Lançamento 2026. Dessa forma teremos redução significativa do volume de leads mas com leads mais interessados.',
  repositioningHighlights: [
    'Substituir o Formulário Nativo da Meta pela Nova Página',
    'Segmentação em 2 conjuntos de anúncios geográficos por cidade',
    'Foco em captação por interesse qualificado e engajamento real',
    'Menos volume absoluto, porém leads com funil de conversão muito mais curto'
  ],
  advantages: [
    'Alto alcance visual e fixação de marca',
    'Segmentação refinada regionalizada',
    'Educação do público através de imagens e vídeos das obras',
    'Filtragem natural do lead ao transitar para a página externa'
  ],
  history: [
    {
      month: 'Abril',
      reach: 36185,
      leads: 245,
      qualifiedRate: 4.8,
      budget: 2500,
      cpl: 10.20
    },
    {
      month: 'Maio',
      reach: 14127,
      leads: 98,
      qualifiedRate: 5.1,
      budget: 1500,
      cpl: 15.30
    }
  ]
};
