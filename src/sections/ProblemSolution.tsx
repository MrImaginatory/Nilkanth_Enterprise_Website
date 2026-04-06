import React from 'react';
import { HiXCircle, HiCheckCircle } from 'react-icons/hi2';
import { Container, Section } from '../components/ui';
import styles from './styles/ProblemSolution.module.css';

const ProblemSolution: React.FC = () => {
  const points = [
    {
      problem: "High Retail Markups",
      solution: "Factory-Direct Pricing",
      description: "Traditional stores add 40-60% margin. We cut the middleman to give you luxury quality at honest prices.",
    },
    {
      problem: "Generic 'One-Size' Designs",
      solution: "Bespoke Craftsmanship",
      description: "Ready-made furniture rarely fits your unique space or style perfectly. We design for YOUR home.",
    },
    {
      problem: "Hidden Material Quality",
      solution: "Total Transparency",
      description: "Many brands use compressed wood or low-grade foam. We use 100% teak wood and high-density materials.",
    },
  ];

  return (
    <Section bg="white" py="lg">
      <Container>
        <div className={styles.header}>
          <h2 className={styles.h2}>
            Why Custom Over Ready-Made?
          </h2>
          <p className={styles.p}>
            We solve the frustrations of modern furniture shopping by bringing the workshop directly to you.
          </p>
        </div>

        <div className={styles.grid}>
          {points.map((point) => (
            <div
              key={point.problem}
              className={styles.card}
            >
              <div className={styles.problemArea}>
                <span className={styles.problemLabel}>
                  <HiXCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} /> The Problem
                </span>
                <h3 className={styles.problemTitle}>
                  {point.problem}
                </h3>
              </div>

              <div className={styles.divider}></div>

              <div>
                <span className={styles.solutionLabel}>
                  <HiCheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#16a34a' }} /> Our Solution
                </span>
                <h3 className={styles.solutionTitle}>
                  {point.solution}
                </h3>
                <p className={styles.description}>
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default ProblemSolution;
