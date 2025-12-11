/**
 * SEO Analytics & Monitoring Dashboard
 * Tracks SEO metrics, rankings, and performance
 */

export interface SEOMetric {
  date: string;
  metric: string;
  value: number;
  target?: number;
  change?: number;
}

export interface PageMetrics {
  url: string;
  title: string;
  keywordTargets: string[];
  status: 'index' | 'no-index' | 'pending';
  views: number;
  avgTimeOnPage: number;
  bounceRate: number;
  conversions: number;
  quality: 'good' | 'ok' | 'needs-improvement';
}

export interface RankingData {
  keyword: string;
  currentRank: number;
  previousRank: number;
  searchVolume: number;
  clickValue: number;
  url: string;
}

export interface ContentAuditItem {
  url: string;
  title: string;
  issues: string[];
  warnings: string[];
  score: number;
}

/**
 * SEO Health Score Calculation
 */
export const calculateSEOHealthScore = (metrics: {
  indexedPages: number;
  totalPages: number;
  avgPageMetaLength: number;
  avgDescriptionLength: number;
  internalLinkRatio: number;
  mobileReadyRatio: number;
  avgPageSpeed: number;
  keywordCoverage: number;
  backlinks: number;
  domainAuthority: number;
}): number => {
  let score = 0;

  // Indexation (15%)
  const indexRatio = metrics.indexedPages / metrics.totalPages;
  score += indexRatio * 15;

  // Meta tags (15%)
  const metaScore =
    (metrics.avgPageMetaLength >= 50 && metrics.avgPageMetaLength <= 60 ? 10 : 5) +
    (metrics.avgDescriptionLength >= 150 && metrics.avgDescriptionLength <= 160 ? 10 : 5) -
    10;
  score += metaScore;

  // Internal linking (15%)
  score += metrics.internalLinkRatio * 15;

  // Mobile readiness (15%)
  score += metrics.mobileReadyRatio * 15;

  // Page speed (15%)
  const speedScore = Math.min(metrics.avgPageSpeed, 100) / 100;
  score += speedScore * 15;

  // Keyword coverage (10%)
  score += metrics.keywordCoverage * 10;

  // Backlinks (10%)
  const backlinkScore = Math.min(metrics.backlinks / 100, 1);
  score += backlinkScore * 10;

  // Domain authority (5%)
  score += (metrics.domainAuthority / 100) * 5;

  return Math.round(score);
};

/**
 * Content Audit for SEO
 */
export const auditContentForSEO = (content: {
  title: string;
  description: string;
  body: string;
  url: string;
  image?: string;
  internalLinks?: number;
  headingStructure?: Record<string, number>;
}): ContentAuditItem => {
  const issues: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // Title audit
  if (!content.title || content.title.length < 30) {
    issues.push('Tiêu đề quá ngắn (<30 ký tự)');
    score -= 15;
  } else if (content.title.length > 60) {
    warnings.push('Tiêu đề có thể bị cắt ngắn trong kết quả tìm kiếm');
    score -= 5;
  }

  // Description audit
  if (!content.description || content.description.length < 120) {
    issues.push('Mô tả quá ngắn (<120 ký tự)');
    score -= 15;
  } else if (content.description.length > 160) {
    warnings.push('Mô tả có thể bị cắt ngắn');
    score -= 5;
  }

  // Body content audit
  const wordCount = content.body?.split(/\s+/).length || 0;
  if (wordCount < 300) {
    issues.push(`Nội dung quá ngắn (${wordCount} từ, mục tiêu: 1000+)`);
    score -= 20;
  } else if (wordCount < 1000) {
    warnings.push(`Nội dung có thể dài hơn (${wordCount} từ, mục tiêu: 1000+)`);
    score -= 10;
  }

  // Heading structure
  if (content.headingStructure) {
    if (!content.headingStructure.h1 || content.headingStructure.h1 !== 1) {
      issues.push('Phải có đúng 1 H1 tag');
      score -= 15;
    }

    if (!content.headingStructure.h2 || content.headingStructure.h2 < 2) {
      warnings.push('Nên có ít nhất 2 H2 tags');
      score -= 10;
    }
  }

  // Image audit
  if (!content.image) {
    warnings.push('Nên thêm hình ảnh nổi bật');
    score -= 10;
  }

  // Internal links audit
  if (!content.internalLinks || content.internalLinks < 3) {
    warnings.push('Nên thêm ít nhất 3 liên kết nội bộ');
    score -= 10;
  }

  return {
    url: content.url,
    title: content.title,
    issues,
    warnings,
    score: Math.max(score, 0),
  };
};

/**
 * Keyword Performance Tracker
 */
export const trackKeywordPerformance = (
  keywords: string[],
  metrics: Record<string, RankingData>
): {
  topPerformers: RankingData[];
  needsWork: RankingData[];
  opportunities: RankingData[];
} => {
  const keywordMetrics = keywords.map((kw) => metrics[kw] || { keyword: kw, currentRank: 100 });

  const topPerformers = keywordMetrics
    .filter((k) => k.currentRank && k.currentRank <= 10)
    .sort((a, b) => (a.currentRank || 100) - (b.currentRank || 100))
    .slice(0, 5);

  const needsWork = keywordMetrics
    .filter((k) => !k.currentRank || k.currentRank > 50)
    .sort((a, b) => (b.currentRank || 100) - (a.currentRank || 100))
    .slice(0, 5);

  const opportunities = keywordMetrics
    .filter((k) => k.currentRank && k.currentRank > 10 && k.currentRank <= 50)
    .sort((a, b) => (a.currentRank || 100) - (b.currentRank || 100))
    .slice(0, 5);

  return { topPerformers, needsWork, opportunities };
};

/**
 * Calculate organic traffic potential
 */
export const calculateOrganiTrafficPotential = (rankings: RankingData[]): number => {
  let traffic = 0;

  rankings.forEach((ranking) => {
    const clickRates: Record<number, number> = {
      1: 0.31,
      2: 0.17,
      3: 0.11,
      4: 0.08,
      5: 0.06,
      6: 0.05,
      7: 0.04,
      8: 0.03,
      9: 0.03,
      10: 0.02,
    };

    const clickRate = clickRates[ranking.currentRank] || 0.01;
    traffic += ranking.searchVolume * clickRate;
  });

  return Math.round(traffic);
};

/**
 * SEO Metrics Collector
 */
export class SEOMetricsCollector {
  private metrics: Map<string, SEOMetric[]> = new Map();

  addMetric(metric: string, value: number, date: string = new Date().toISOString()) {
    if (!this.metrics.has(metric)) {
      this.metrics.set(metric, []);
    }

    const metricData = this.metrics.get(metric)!;
    const previousValue = metricData[metricData.length - 1]?.value || value;

    metricData.push({
      date,
      metric,
      value,
      change: value - previousValue,
    });
  }

  getMetricHistory(metric: string, days: number = 30): SEOMetric[] {
    const data = this.metrics.get(metric) || [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return data.filter((d) => new Date(d.date) >= cutoffDate);
  }

  calculateTrend(metric: string): 'up' | 'down' | 'stable' {
    const history = this.getMetricHistory(metric, 30);
    if (history.length < 2) return 'stable';

    const firstHalf = history.slice(0, Math.floor(history.length / 2));
    const secondHalf = history.slice(Math.floor(history.length / 2));

    const avgFirst = firstHalf.reduce((sum, m) => sum + m.value, 0) / firstHalf.length;
    const avgSecond = secondHalf.reduce((sum, m) => sum + m.value, 0) / secondHalf.length;

    if (avgSecond > avgFirst * 1.05) return 'up';
    if (avgSecond < avgFirst * 0.95) return 'down';
    return 'stable';
  }

  getReport(metricNames: string[]): Record<string, any> {
    const report: Record<string, any> = {};

    metricNames.forEach((name) => {
      const history = this.getMetricHistory(name, 30);
      const current = history[history.length - 1]?.value || 0;
      const previous = history[0]?.value || 0;

      report[name] = {
        current,
        previous,
        change: current - previous,
        changePercent: previous !== 0 ? ((current - previous) / previous) * 100 : 0,
        trend: this.calculateTrend(name),
        history,
      };
    });

    return report;
  }
}

export default {
  calculateSEOHealthScore,
  auditContentForSEO,
  trackKeywordPerformance,
  calculateOrganiTrafficPotential,
  SEOMetricsCollector,
};
