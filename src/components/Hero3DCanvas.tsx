import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50 md:opacity-100 mix-blend-screen mix-blend-lighten">
      <ShaderGradientCanvas
        style={{
          width: '100%',
          height: '100%',
        }}
        lazyLoad={true}
        fov={10}
        pixelDensity={1}
        pointerEvents="auto"
      >
        <ShaderGradient
          animate="on"
          type="sphere"
          wireframe={false}
          shader="defaults"
          uTime={0}
          uSpeed={0.3}
          uStrength={0.3}
          uDensity={0.8}
          uFrequency={5.5}
          uAmplitude={3.2}
          positionX={-0.1}
          positionY={0}
          positionZ={0}
          rotationX={0}
          rotationY={130}
          rotationZ={70}
          color1="#92dbe0"
          color2="#0b7bff"
          color3="#3865cf"
          reflection={0.4}

          // View (camera) props
          cAzimuthAngle={270}
          cPolarAngle={180}
          cDistance={0.5}
          cameraZoom={15.1}

          // Effect props
          lightType="env"
          brightness={0.8}
          envPreset="city"
          grain="on"

          // Tool props
          toggleAxis={false}
          zoomOut={false}
          hoverState=""

          // Optional - if using transition features
          enableTransition={false}
        />
      </ShaderGradientCanvas>
      <div className="absolute inset-0 bg-background/50 dark:bg-background/80" />
    </div>
  );
}
