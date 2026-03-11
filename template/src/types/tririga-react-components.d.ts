// Temporary ambient module declarations for @tririga/tririga-react-components
// Extend / refine as needed once official types are available.

declare module '@tririga/tririga-react-components' {
  import { ComponentType, ReactNode } from 'react';

  export interface TriAppConfig {
    instanceId: string;
    tririgaUrl: string;
    contextPath: string;
    modelAndView: string;
    appPath?: string;
    appExposedName?: string;
    sso?: boolean;
    [key: string]: any;
  }

  export type TriCallback = (err: any) => void;

  export class TriModel {
    constructor(modelAndView: string, instanceId: string, onError?: TriCallback);
    getRecord(dsName: string, query?: Record<string, any>): Promise<any>;
    // Add any other methods you use later
  }

  export function fetchTriAppConfig(): Promise<TriAppConfig>;
  export function setTriAppConfig(config: TriAppConfig): void;
  export function getTriAppConfig(): TriAppConfig;
  export function standardTririgaLogin(): Promise<any>;
  export function getAuthCheckerForCurrentApp(): Promise<any>;

  // TriImage Component
  export interface TriImageProps {
    value?: string | object;
    sizing?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    className?: string;
    width?: string | number;
    height?: string | number;
    alt?: string;
  }
  export const TriImage: ComponentType<TriImageProps>;

  // TriFloorPlan Component
  export interface TriFloorPlanPlugin {
    type: string;
    id: string;
    [key: string]: any;
  }

  export interface TriFloorPlanProps {
    floorPlanId: number | null;
    plugins?: TriFloorPlanPlugin[];
    svgAriaLabel?: string;
    spaceLayer?: string;
    onFloorPlanLoadError?: (error: any) => void;
    onViewportChange?: (viewport: any) => void;
  }
  export const TriFloorPlan: ComponentType<TriFloorPlanProps>;
  export const TriFloorPlanSkeleton: ComponentType<{}>;

  // TriFloorPlan Plugins
  export class TriZoomPlugin {
    static type: string;
  }
  export class TriPanPlugin {
    static type: string;
  }
  export class TriHighlightPlugin {
    static type: string;
  }
  export class TriSelectablePlugin {
    static type: string;
  }
  export class TriLabelsPlugin {
    static type: string;
  }
  export class TriNavPlugin {
    static type: string;
  }
  export class TriPinPlugin {
    static type: string;
  }
  export class TriDropablePlugin {
    static type: string;
  }
  export class TriLastPositionPlugin {
    static type: string;
  }
  export class TriLayersPlugin {
    static type: string;
  }

  // TriFloorPlanAPI
  export const TriFloorPlanAPI: {
    getFloorplanId(floorId: string | number): Promise<number | null>;
    getFloorplan(floorplanId: number): Promise<string | null>;
    cacheFloorplan(floorplanId: number, floorplan: string): void;
    [key: string]: any;
  };

  // TriLoginApi
  export const TriLoginApi: {
    login(): Promise<void>;
    logout(): Promise<void>;
    [key: string]: any;
  };
}
