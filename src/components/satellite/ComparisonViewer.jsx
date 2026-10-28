import React, { useState, useRef, useEffect, useCallback } from 'react';
import MapControlsOverlay from './MapControlsOverlay';
import FeatureLabelOverlay from './FeatureLabelOverlay';

export default function ComparisonViewer({
  beforeImage,
  afterImage,
  beforeLabel = 'Input (Cloudy)',
  afterLabel = 'Reconstructed (Cloud-Free)',
  showMetaBottom = true,
  metaLeft = 'LISS-IV (Natural RGB) | Cloud Coverage: 80.98%',
  metaRight = 'PSNR: 39.67 dB | SSIM: 0.9834 | SAM: 1.6°',
  showScale = true,
  scaleText = '2 km',
  height = '100%',
  initialSliderPos = 50,
  interactive = true,
  zoomable = true,
  overlayMaskOutline = false,
  overlayConfidenceHeatmap = false,
  overlayFeatureLabels = false,
  featuresData = null,
  maskImage = null,
  confidenceImage = null,
}) {
  const [sliderPos, setSliderPos] = useState(initialSliderPos);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current || !interactive) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    setSliderPos(percent);
  }, [interactive]);

  const onMouseDown = () => setIsDragging(true);
  const onTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX);
    };
    const onTouchMove = (e) => {
      if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
    };
    const onEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className="comparison-container"
      style={{ height }}
      onClick={(e) => {
        if (!isDragging) handleMove(e.clientX);
      }}
    >
      {/* Background (After / Reconstructed) */}
      <div
        className="comparison-layer"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.2s ease',
          position: 'relative',
        }}
      >
        <img src={afterImage} alt={afterLabel} />
        {overlayConfidenceHeatmap && confidenceImage && (
          <img
            src={confidenceImage}
            alt="Confidence Overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.62,
              mixBlendMode: 'screen',
              pointerEvents: 'none',
              filter: 'saturate(1.4) contrast(1.2)',
            }}
          />
        )}
        {overlayFeatureLabels && (
          <FeatureLabelOverlay
            features={featuresData || undefined}
            interactive={true}
            showPolygons={true}
            showPins={true}
          />
        )}
      </div>

      {/* Foreground (Before / Cloudy) clipped by slider */}
      <div
        className="comparison-overlay-clip"
        style={{
          width: `${sliderPos}%`,
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'left center',
          transition: isDragging ? 'none' : 'transform 0.2s ease',
        }}
      >
        <div style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%', height: '100%', position: 'relative' }}>
          <img
            src={beforeImage}
            alt={beforeLabel}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Cloud Mask Outline Overlay across both sides if enabled */}
      {overlayMaskOutline && (
        <svg
          viewBox="0 0 1000 480"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 12,
          }}
        >
          {/* Cloud boundary 1 */}
          <path
            d="M 120,60 C 180,30 320,40 400,90 C 480,140 520,240 450,300 C 380,360 220,380 140,320 C 70,260 60,100 120,60 Z"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeDasharray="6,4"
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8))' }}
          />
          {/* Cloud boundary 2 */}
          <path
            d="M 600,100 C 680,60 820,70 890,120 C 960,180 970,280 900,340 C 830,400 710,390 640,330 C 580,280 570,160 600,100 Z"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeDasharray="6,4"
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8))' }}
          />
          {/* Semi-transparent cloud fill highlight */}
          <path
            d="M 120,60 C 180,30 320,40 400,90 C 480,140 520,240 450,300 C 380,360 220,380 140,320 C 70,260 60,100 120,60 Z"
            fill="rgba(239, 68, 68, 0.12)"
          />
          <path
            d="M 600,100 C 680,60 820,70 890,120 C 960,180 970,280 900,340 C 830,400 710,390 640,330 C 580,280 570,160 600,100 Z"
            fill="rgba(239, 68, 68, 0.12)"
          />
        </svg>
      )}

      {/* Floating divider line and draggable handle */}
      <div
        className="comparison-slider-handle"
        style={{
          left: `${sliderPos}%`,
          pointerEvents: interactive ? 'auto' : 'none',
        }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div className="slider-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Before / After Floating Badges */}
      <div className="comparison-badge-left">
        <span className="badge-dot" style={{ backgroundColor: '#ef4444' }} />
        <span>{beforeLabel}</span>
      </div>

      <div className="comparison-badge-right">
        <span className="badge-dot" style={{ backgroundColor: '#16a34a' }} />
        <span>{afterLabel}</span>
      </div>

      {/* Floating Map Controls Overlay (Zoom In, Zoom Out, Reset, Fullscreen) */}
      {zoomable && (
        <MapControlsOverlay
          onZoomIn={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
          onZoomOut={() => setZoomLevel((z) => Math.max(z - 0.25, 1))}
          onReset={() => {
            setZoomLevel(1);
            setSliderPos(initialSliderPos);
          }}
        />
      )}

      {/* Scale Indicator Badge */}
      {showScale && (
        <div className="map-scale-badge">
          <div style={{ width: '16px', height: '2px', background: '#a8f04a' }}></div>
          <span>{scaleText}</span>
        </div>
      )}

      {/* Meta bottom bar */}
      {showMetaBottom && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(4, 10, 20, 0.88)',
            backdropFilter: 'blur(6px)',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11.5px',
            color: '#94a3b8',
            fontFamily: 'var(--font-mono)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            zIndex: 15,
          }}
        >
          <div>{metaLeft}</div>
          <div style={{ color: '#cbd5e1' }}>{metaRight}</div>
        </div>
      )}
    </div>
  );
}
