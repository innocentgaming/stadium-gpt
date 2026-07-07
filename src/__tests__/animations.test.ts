import {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  slideInFromLeft,
  slideInFromRight,
  cardHover,
  glowPulse,
} from '../lib/animations';

describe('Animations Validation - StadiumGPT', () => {
  test('fadeIn should define correct opacity variants', () => {
    expect(fadeIn.hidden).toEqual({ opacity: 0 });
    expect(fadeIn.visible).toBeDefined();
    expect(fadeIn.visible).toHaveProperty('opacity', 1);
  });

  test('fadeInUp should define correct translation and opacity', () => {
    expect(fadeInUp.hidden).toEqual({ opacity: 0, y: 40 });
    expect(fadeInUp.visible).toBeDefined();
    expect(fadeInUp.visible).toHaveProperty('opacity', 1);
    expect(fadeInUp.visible).toHaveProperty('y', 0);
  });

  test('fadeInDown should define correct translation and opacity', () => {
    expect(fadeInDown.hidden).toEqual({ opacity: 0, y: -30 });
    expect(fadeInDown.visible).toBeDefined();
    expect(fadeInDown.visible).toHaveProperty('opacity', 1);
    expect(fadeInDown.visible).toHaveProperty('y', 0);
  });

  test('fadeInLeft should define correct horizontal translation', () => {
    expect(fadeInLeft.hidden).toEqual({ opacity: 0, x: -40 });
    expect(fadeInLeft.visible).toBeDefined();
    expect(fadeInLeft.visible).toHaveProperty('x', 0);
  });

  test('fadeInRight should define correct horizontal translation', () => {
    expect(fadeInRight.hidden).toEqual({ opacity: 0, x: 40 });
    expect(fadeInRight.visible).toBeDefined();
    expect(fadeInRight.visible).toHaveProperty('x', 0);
  });

  test('scaleIn should define correct scale scaling parameters', () => {
    expect(scaleIn.hidden).toEqual({ opacity: 0, scale: 0.9 });
    expect(scaleIn.visible).toBeDefined();
    expect(scaleIn.visible).toHaveProperty('scale', 1);
  });

  test('staggerContainer should configure stagger children transitions', () => {
    expect(staggerContainer.hidden).toEqual({ opacity: 0 });
    expect(staggerContainer.visible).toBeDefined();
    expect(staggerContainer.visible).toHaveProperty('opacity', 1);
  });

  test('staggerItem should configure proper vertical entries', () => {
    expect(staggerItem.hidden).toEqual({ opacity: 0, y: 20 });
    expect(staggerItem.visible).toBeDefined();
    expect(staggerItem.visible).toHaveProperty('y', 0);
  });

  test('slideInFromLeft should translate from outside left screen boundaries', () => {
    expect(slideInFromLeft.hidden).toEqual({ x: -100, opacity: 0 });
    expect(slideInFromLeft.visible).toBeDefined();
    expect(slideInFromLeft.visible).toHaveProperty('x', 0);
  });

  test('slideInFromRight should translate from outside right screen boundaries', () => {
    expect(slideInFromRight.hidden).toEqual({ x: 100, opacity: 0 });
    expect(slideInFromRight.visible).toBeDefined();
    expect(slideInFromRight.visible).toHaveProperty('x', 0);
  });

  test('cardHover should configure scale and y animations', () => {
    expect(cardHover.rest).toEqual({ scale: 1, y: 0 });
    expect(cardHover.hover).toBeDefined();
    expect(cardHover.hover).toHaveProperty('scale', 1.02);
    expect(cardHover.hover).toHaveProperty('y', -4);
  });

  test('glowPulse should configure box shadow scaling', () => {
    expect(glowPulse.rest).toEqual({ boxShadow: '0 0 0px rgba(59, 130, 246, 0)' });
    expect(glowPulse.hover).toBeDefined();
  });
});
