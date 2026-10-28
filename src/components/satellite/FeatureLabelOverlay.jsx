import React, { useState } from 'react';
import {
  Waves,
  Building2,
  Trees,
  Mountain,
  Wheat,
  Droplets,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Download,
  Layers,
  Info,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { LANDMARK_CATEGORIES, GEOGRAPHIC_FEATURES_DATA } from '../../data/mockData';

export default function FeatureLabelOverlay({
  features = GEOGRAPHIC_FEATURES_DATA,
  activeCategory = 'all',
  onSelectCategory,
  selectedFeatureId = null,
  onSelectFeature,
  showPolygons = true,
  showPins = true,
  interactive = true,
  customScale = 1.0
}) {
  const [internalSelectedId, setInternalSelectedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const currentSelectedId = selectedFeatureId !== undefined ? selectedFeatureId : internalSelectedId;

  const handleFeatureClick = (f) => {
    if (!interactive) return;
    const nextId = currentSelectedId === f.id ? null : f.id;
    if (onSelectFeature) {
      onSelectFeature(nextId ? f : null);
    } else {
      setInternalSelectedId(nextId);
    }
  };

  const getCategoryIcon = (catKey, size = 14) => {
    switch (catKey) {
      case 'river':
        return <Waves size={size} />;
      case 'settlement':
        return <Building2 size={size} />;
      case 'forest':
        return <Trees size={size} />;
      case 'mountain':
        return <Mountain size={size} />;
      case 'agriculture':
        return <Wheat size={size} />;
      case 'wetland':
        return <Droplets size={size} />;
      default:
        return <MapPin size={size} />;
    }
  };

  const filteredFeatures = features.filter((f) => {
    if (!activeCategory || activeCategory === 'all') return true;
    return f.category === activeCategory;
  });

  const selectedFeature = features.find((f) => f.id === currentSelectedId);

  return (
    <div
      className="feature-label-overlay"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: interactive ? 'auto' : 'none',
        zIndex: 20,
        userSelect: 'none'
      }}
    >
      {/* SVG Vector Polygon Layer */}
      {showPolygons && (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          {filteredFeatures.map((f) => {
            if (!f.polygon || f.polygon.length === 0) return null;
            const pointsString = f.polygon.map((pt) => `${pt[0]},${pt[1]}`).join(' ');
            const isSelected = f.id === currentSelectedId;
            const isHovered = f.id === hoveredId;

            return (
              <polygon
                key={`poly-${f.id}`}
                points={pointsString}
                fill={f.color}
                fillOpacity={isSelected ? 0.38 : isHovered ? 0.28 : 0.14}
                stroke={f.border || f.color}
                strokeWidth={isSelected ? '0.6' : isHovered ? '0.45' : '0.3'}
                strokeDasharray={f.observationStatus?.includes('Reconstructed') ? '1,0.5' : 'none'}
                style={{
                  transition: 'all 0.2s ease',
                  cursor: interactive ? 'pointer' : 'default',
                  pointerEvents: interactive ? 'auto' : 'none'
                }}
                onClick={() => handleFeatureClick(f)}
                onMouseEnter={() => setHoveredId(f.id)}
                onMouseLeave={() => setHoveredId(null)}
              />
            );
          })}
        </svg>
      )}

      {/* Floating Centroid Feature Pins & Badges */}
      {showPins &&
        filteredFeatures.map((f) => {
          const isSelected = f.id === currentSelectedId;
          const isHovered = f.id === hoveredId;

          return (
            <div
              key={`pin-${f.id}`}
              className={`feature-landmark-pin ${isSelected ? 'selected' : ''}`}
              style={{
                position: 'absolute',
                left: `${f.centroid?.x || 50}%`,
                top: `${f.centroid?.y || 50}%`,
                transform: 'translate(-50%, -50%)',
                cursor: interactive ? 'pointer' : 'default',
                zIndex: isSelected ? 30 : isHovered ? 25 : 22,
                transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleFeatureClick(f);
              }}
              onMouseEnter={() => setHoveredId(f.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: isSelected
                    ? 'rgba(15, 23, 42, 0.96)'
                    : isHovered
                    ? 'rgba(15, 23, 42, 0.90)'
                    : 'rgba(15, 23, 42, 0.82)',
                  border: `1.5px solid ${isSelected ? '#ffffff' : f.border || f.color}`,
                  boxShadow: isSelected
                    ? `0 0 14px ${f.color}, 0 4px 12px rgba(0,0,0,0.6)`
                    : '0 2px 8px rgba(0,0,0,0.4)',
                  borderRadius: '20px',
                  padding: '3px 8px',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(6px)',
                  transform: isSelected ? 'scale(1.08)' : isHovered ? 'scale(1.04)' : 'scale(1.0)',
                  transition: 'all 0.15s ease'
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: f.bg || 'rgba(255,255,255,0.1)',
                    color: f.color
                  }}
                >
                  {getCategoryIcon(f.category, 12)}
                </span>
                <span>{f.name}</span>
                <span
                  style={{
                    fontSize: '9.5px',
                    color: '#94a3b8',
                    marginLeft: '2px',
                    fontWeight: 500
                  }}
                >
                  {f.areaKm2} km²
                </span>
              </div>
            </div>
          );
        })}

      {/* Floating Feature Inspector Detail Card */}
      {selectedFeature && (
        <div
          className="feature-inspector-card"
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            width: '320px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: `1.5px solid ${selectedFeature.border || selectedFeature.color}`,
            borderRadius: '12px',
            padding: '14px',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(12px)',
            color: '#f8fafc',
            zIndex: 40,
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Card Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  background: selectedFeature.bg || 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: selectedFeature.color
                }}
              >
                {getCategoryIcon(selectedFeature.category, 16)}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
                  {selectedFeature.name}
                </div>
                <div style={{ fontSize: '11px', color: selectedFeature.color, fontWeight: 500 }}>
                  {selectedFeature.categoryLabel || selectedFeature.category}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleFeatureClick(selectedFeature)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '2px'
              }}
              title="Close Inspector"
            >
              <X size={16} />
            </button>
          </div>

          {/* Description */}
          <div style={{ fontSize: '11.5px', color: '#cbd5e1', marginBottom: '10px', lineHeight: 1.4 }}>
            {selectedFeature.description}
          </div>

          {/* Key Metric Chips */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '6px',
              background: 'rgba(30, 41, 59, 0.6)',
              borderRadius: '8px',
              padding: '8px',
              marginBottom: '10px'
            }}
          >
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Surface Area</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>
                {selectedFeature.areaKm2} km²
                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 500, marginLeft: '4px' }}>
                  ({selectedFeature.areaHa} ha)
                </span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Confidence</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#38bdf8' }}>
                {selectedFeature.confidencePct}%
                <span style={{ fontSize: '10px', color: '#4ade80', marginLeft: '4px' }}>✓</span>
              </div>
            </div>
            {selectedFeature.elevation && (
              <div>
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Elevation</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#f1f5f9' }}>
                  {selectedFeature.elevation}
                </div>
              </div>
            )}
            {selectedFeature.spectralInfo && (
              <div>
                <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>NDVI Canopy</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#22c55e' }}>
                  {selectedFeature.spectralInfo.ndvi}
                </div>
              </div>
            )}
          </div>

          {/* Observation Status Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 8px',
              borderRadius: '6px',
              background: 'rgba(30, 41, 59, 0.8)',
              fontSize: '11px',
              marginBottom: '10px'
            }}
          >
            <ShieldCheck size={14} style={{ color: selectedFeature.statusColor || '#4ade80' }} />
            <span style={{ color: '#e2e8f0' }}>Status:</span>
            <span style={{ color: selectedFeature.statusColor || '#4ade80', fontWeight: 600 }}>
              {selectedFeature.observationStatus}
            </span>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href="/api/v1/export/sample/geojson"
              download={`${selectedFeature.id}.geojson`}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: '6px',
                background: '#16a34a',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: 600
              }}
            >
              <Download size={13} />
              Export GeoJSON
            </a>
            <button
              onClick={() => handleFeatureClick(selectedFeature)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'rgba(51, 65, 85, 0.6)',
                border: '1px solid #475569',
                color: '#cbd5e1',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

