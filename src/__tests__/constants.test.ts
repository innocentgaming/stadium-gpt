import {
  features,
  agents,
  architectureNodes,
  cvDetections,
  accessibilityFeatures,
  sustainabilityStats,
  techStack,
  timeline,
  pricingTiers,
  testimonials,
  faqItems,
  dashboardNavItems,
} from '../lib/constants';

describe('Constants Validation - StadiumGPT', () => {
  test('features array should be fully defined and contain 20 items', () => {
    expect(Array.isArray(features)).toBe(true);
    expect(features.length).toBe(20);
    features.forEach((feature) => {
      expect(feature.title).toBeTruthy();
      expect(typeof feature.title).toBe('string');
      expect(feature.description).toBeTruthy();
      expect(typeof feature.description).toBe('string');
      expect(feature.icon).toBeTruthy();
    });
  });

  test('agents array should contain exactly 8 specialized AI agents', () => {
    expect(Array.isArray(agents)).toBe(true);
    expect(agents.length).toBe(8);
    agents.forEach((agent) => {
      expect(agent.title).toBeTruthy();
      expect(typeof agent.title).toBe('string');
      expect(agent.description).toBeTruthy();
      expect(typeof agent.description).toBe('string');
      expect(agent.model).toBeTruthy();
      expect(Array.isArray(agent.responsibilities)).toBe(true);
      expect(agent.responsibilities.length).toBeGreaterThan(0);
      expect(agent.color).toBeTruthy();
      expect(agent.icon).toBeTruthy();
    });
  });

  test('architectureNodes should map the system flow from edge to database', () => {
    expect(Array.isArray(architectureNodes)).toBe(true);
    expect(architectureNodes.length).toBe(10);
    architectureNodes.forEach((node) => {
      expect(node.id).toBeTruthy();
      expect(node.label).toBeTruthy();
      expect(node.sublabel).toBeTruthy();
      expect(node.icon).toBeTruthy();
    });
  });

  test('cvDetections should have valid confidence scores and counts', () => {
    expect(Array.isArray(cvDetections)).toBe(true);
    expect(cvDetections.length).toBe(5);
    cvDetections.forEach((det) => {
      expect(det.title).toBeTruthy();
      expect(det.confidence).toBeGreaterThanOrEqual(0);
      expect(det.confidence).toBeLessThanOrEqual(100);
      expect(det.count).toBeGreaterThanOrEqual(0);
      expect(det.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  test('accessibilityFeatures should contain 7 WCAG 2.2 AA compliant items', () => {
    expect(Array.isArray(accessibilityFeatures)).toBe(true);
    expect(accessibilityFeatures.length).toBe(7);
    accessibilityFeatures.forEach((feat) => {
      expect(feat.title).toBeTruthy();
      expect(feat.description).toBeTruthy();
      expect(feat.icon).toBeTruthy();
    });
  });

  test('sustainabilityStats should define valid resource tracking targets', () => {
    expect(Array.isArray(sustainabilityStats)).toBe(true);
    expect(sustainabilityStats.length).toBe(5);
    sustainabilityStats.forEach((stat) => {
      expect(stat.label).toBeTruthy();
      expect(stat.value).toBeGreaterThan(0);
      expect(stat.unit).toBeTruthy();
      expect(stat.icon).toBeTruthy();
      expect(stat.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  test('techStack should map appropriate layers', () => {
    expect(techStack).toBeDefined();
    const keys = Object.keys(techStack);
    expect(keys).toContain('Frontend');
    expect(keys).toContain('Backend');
    expect(keys).toContain('AI/ML');
    expect(keys).toContain('Data');
    expect(keys).toContain('Vision');
    expect(keys).toContain('Cloud');
    keys.forEach((key) => {
      const items = techStack[key as keyof typeof techStack];
      expect(Array.isArray(items)).toBe(true);
      expect(items.length).toBeGreaterThan(0);
    });
  });

  test('timeline should cover 2026 FIFA World Cup and future roadmap', () => {
    expect(Array.isArray(timeline)).toBe(true);
    expect(timeline.length).toBe(4);
    timeline.forEach((item) => {
      expect(item.year).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(Array.isArray(item.milestones)).toBe(true);
      expect(item.milestones.length).toBeGreaterThan(0);
    });
  });

  test('pricingTiers should describe 5 deployment packages', () => {
    expect(Array.isArray(pricingTiers)).toBe(true);
    expect(pricingTiers.length).toBe(5);
    pricingTiers.forEach((tier) => {
      expect(tier.name).toBeTruthy();
      expect(tier.price).toBeTruthy();
      expect(tier.description).toBeTruthy();
      expect(Array.isArray(tier.features)).toBe(true);
      expect(tier.icon).toBeTruthy();
    });
  });

  test('testimonials should feature diverse feedback', () => {
    expect(Array.isArray(testimonials)).toBe(true);
    expect(testimonials.length).toBe(4);
    testimonials.forEach((t) => {
      expect(t.quote).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.role).toBeTruthy();
      expect(t.avatar).toBeTruthy();
    });
  });

  test('faqItems should contain clear questions and answers', () => {
    expect(Array.isArray(faqItems)).toBe(true);
    expect(faqItems.length).toBe(8);
    faqItems.forEach((faq) => {
      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();
    });
  });

  test('dashboardNavItems should point to valid relative paths', () => {
    expect(Array.isArray(dashboardNavItems)).toBe(true);
    expect(dashboardNavItems.length).toBe(14);
    dashboardNavItems.forEach((item) => {
      expect(item.label).toBeTruthy();
      expect(item.href.startsWith('/')).toBe(true);
      expect(item.icon).toBeTruthy();
    });
  });
});
