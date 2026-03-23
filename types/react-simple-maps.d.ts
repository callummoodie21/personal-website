declare module "react-simple-maps" {
  import type { ComponentType, SVGProps } from "react";

  interface ComposableMapProps extends SVGProps<SVGSVGElement> {
    projection?: string;
    projectionConfig?: {
      rotate?: [number, number, number];
      center?: [number, number];
      scale?: number;
    };
    width?: number;
    height?: number;
  }

  interface GeographiesProps {
    geography: string;
    children: (data: {
      geographies: GeographyType[];
    }) => React.ReactNode;
  }

  interface GeographyType {
    rsmKey: string;
    id: string;
    properties: Record<string, string>;
    type: string;
    geometry: unknown;
  }

  interface GeographyStyleProps {
    default?: React.CSSProperties;
    hover?: React.CSSProperties;
    pressed?: React.CSSProperties;
  }

  interface GeographyProps {
    geography: GeographyType;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: GeographyStyleProps;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
  }

  interface MarkerProps extends SVGProps<SVGGElement> {
    coordinates: [number, number];
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
  }

  interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children: React.ReactNode;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const Marker: ComponentType<MarkerProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
}
