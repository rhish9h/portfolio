// Utility functions for generating SVG paths and calculating positions

import { Point } from './types';

/**
 * Generates a smooth curved path through a series of points
 * @param points Array of control points to generate path through
 * @returns SVG path string
 */
export const generateSmoothPath = (points: Point[]): string => {
  if (points.length < 2) return '';

  const firstPoint = points[0];
  let pathData = `M ${firstPoint.x},${firstPoint.y}`;

  // Generate smooth curve through points using cubic bezier curves
  for (let i = 1; i < points.length - 2; i++) {
    const current = points[i];
    const next = points[i + 1];
    const controlPoint1 = {
      x: current.x + (next.x - points[i - 1].x) / 6,
      y: current.y
    };
    const controlPoint2 = {
      x: next.x - (points[i + 2].x - current.x) / 6,
      y: next.y
    };
    pathData += ` C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${next.x},${next.y}`;
  }

  // Handle the last segment
  const lastIndex = points.length - 1;
  if (lastIndex > 0) {
    const current = points[lastIndex - 1];
    const next = points[lastIndex];
    const controlPoint1 = {
      x: current.x + (next.x - points[lastIndex - 2].x) / 6,
      y: current.y
    };
    const controlPoint2 = {
      x: next.x - (next.x - current.x) / 6,
      y: next.y
    };
    pathData += ` C ${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${next.x},${next.y}`;
  }

  return pathData;
};

/**
 * Calculates points for a flowing path based on container dimensions
 * @param containerWidth Width of container
 * @param containerHeight Height of container
 * @param numPoints Number of control points to generate
 * @returns Array of points defining the path
 */
export const calculatePathPoints = (
  containerWidth: number,
  containerHeight: number,
  numPoints: number
): Point[] => {
  if (containerWidth <= 0 || containerHeight <= 0 || numPoints < 2) {
    return [];
  }

  const points: Point[] = [];
  const horizontalSpacing = containerWidth / Math.max(numPoints - 1, 1);
  const verticalCenter = containerHeight / 2;
  const amplitude = containerHeight * 0.15; // Reduced wave height
  const frequency = 2; // Controls how many waves appear

  for (let i = 0; i < numPoints; i++) {
    const x = i * horizontalSpacing;
    const progress = i / (numPoints - 1);
    // Create a gentler wave pattern
    const y = verticalCenter + 
      Math.sin(progress * Math.PI * frequency) * amplitude;
    points.push({ x, y });
  }

  return points;
};

/**
 * Calculates position along an SVG path for a given percentage
 * @param pathElement SVG path element to calculate position on
 * @param percent Percentage along path (0-1)
 * @returns Point coordinates or null if invalid
 */
export const getPointAtPercentage = (
  pathElement: SVGPathElement | null,
  percent: number
): Point | null => {
  if (!pathElement || percent < 0 || percent > 1) return null;

  try {
    const length = pathElement.getTotalLength();
    const point = pathElement.getPointAtLength(length * percent);
    return { x: point.x, y: point.y };
  } catch (error) {
    console.error('Error calculating point on path:', error);
    return null;
  }
};

/**
 * Calculates the rotation angle for a character at a given point on the path
 * @param pathElement SVG path element
 * @param percent Percentage along path
 * @returns Rotation angle in degrees
 */
export const getRotationAtPercentage = (
  pathElement: SVGPathElement | null,
  percent: number
): number => {
  if (!pathElement || percent < 0 || percent > 1) return 0;

  try {
    const length = pathElement.getTotalLength();
    const point1 = pathElement.getPointAtLength(Math.max(0, length * percent - 1));
    const point2 = pathElement.getPointAtLength(Math.min(length, length * percent + 1));
    
    // Calculate angle between points
    const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
    return (angle * 180) / Math.PI;
  } catch (error) {
    console.error('Error calculating rotation:', error);
    return 0;
  }
};
