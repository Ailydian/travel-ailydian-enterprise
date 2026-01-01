/**
 * WebXR Manager
 * Enterprise-grade VR/AR tour system with WebXR Device API
 * Supports: Meta Quest, HTC Vive, Valve Index, Magic Leap, HoloLens
 *
 * @module WebXRManager
 * @performance 90fps+ (VR requirement)
 * @compatibility WebXR Device API Level 1
 */

import logger from '../logger';

// ============================================
// TYPES & INTERFACES
// ============================================

export type XRSessionMode = 'inline' | 'immersive-vr' | 'immersive-ar';

export type XRReferenceSpaceType =
  | 'viewer'
  | 'local'
  | 'local-floor'
  | 'bounded-floor'
  | 'unbounded';

export interface WebXRCapabilities {
  readonly supportsVR: boolean;
  readonly supportsAR: boolean;
  readonly supportsInline: boolean;
  readonly supportedSessionModes: readonly XRSessionMode[];
  readonly supportedReferenceSpaces: readonly XRReferenceSpaceType[];
  readonly deviceInfo: XRDeviceInfo | null;
}

export interface XRDeviceInfo {
  readonly vendor: string;
  readonly model: string;
  readonly isHandTracking: boolean;
  readonly isEyeTracking: boolean;
  readonly refreshRate: number;
}

export interface VRTourScene {
  readonly id: string;
  readonly name: string;
  readonly type: '360-photo' | '360-video' | '3d-model' | 'point-cloud';
  readonly url: string;
  readonly thumbnailUrl: string;
  readonly position?: { x: number; y: number; z: number };
  readonly rotation?: { x: number; y: number; z: number };
  readonly scale?: number;
  readonly hotspots?: readonly VRHotspot[];
  readonly audioUrl?: string;
  readonly description?: string;
}

export interface VRHotspot {
  readonly id: string;
  readonly position: { x: number; y: number; z: number };
  readonly type: 'info' | 'navigation' | 'media' | 'interaction';
  readonly title: string;
  readonly content?: string;
  readonly targetSceneId?: string;
  readonly iconUrl?: string;
  readonly action?: () => void | Promise<void>;
}

export interface VRTeleportPoint {
  readonly id: string;
  readonly position: { x: number; y: number; z: number };
  readonly name: string;
  readonly enabled: boolean;
}

export interface WebXRSessionConfig {
  readonly mode: XRSessionMode;
  readonly requiredFeatures?: readonly string[];
  readonly optionalFeatures?: readonly string[];
  readonly domOverlay?: HTMLElement;
}

// ============================================
// WEBXR MANAGER CLASS
// ============================================

export class WebXRManager {
  private xrSession: XRSession | null = null;
  private xrReferenceSpace: XRReferenceSpace | null = null;
  private gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
  private animationFrameId: number | null = null;
  private isSessionActive = false;

  // Event callbacks
  private onSessionStart?: () => void;
  private onSessionEnd?: () => void;
  private onSelectStart?: (event: XRInputSourceEvent) => void;
  private onSelectEnd?: (event: XRInputSourceEvent) => void;
  private onSqueezeStart?: (event: XRInputSourceEvent) => void;
  private onError?: (error: Error) => void;

  constructor() {
    this.checkCompatibility();
  }

  /**
   * Check WebXR browser support
   */
  private checkCompatibility(): void {
    if (!('xr' in navigator)) {
      logger.warn('WebXR not supported in this browser');
    }
  }

  /**
   * Get detailed WebXR capabilities
   */
  async getCapabilities(): Promise<WebXRCapabilities> {
    if (!('xr' in navigator)) {
      return {
        supportsVR: false,
        supportsAR: false,
        supportsInline: false,
        supportedSessionModes: [],
        supportedReferenceSpaces: [],
        deviceInfo: null,
      };
    }

    const xr = navigator.xr as XRSystem;

    const [supportsVR, supportsAR, supportsInline] = await Promise.all([
      xr.isSessionSupported('immersive-vr'),
      xr.isSessionSupported('immersive-ar'),
      xr.isSessionSupported('inline'),
    ]);

    const supportedModes: XRSessionMode[] = [];
    if (supportsVR) supportedModes.push('immersive-vr');
    if (supportsAR) supportedModes.push('immersive-ar');
    if (supportsInline) supportedModes.push('inline');

    // Check reference spaces (requires active session, so we'll estimate)
    const likelyReferenceSpaces: XRReferenceSpaceType[] = [
      'viewer',
      'local',
      'local-floor',
    ];

    return {
      supportsVR,
      supportsAR,
      supportsInline,
      supportedSessionModes: supportedModes,
      supportedReferenceSpaces: likelyReferenceSpaces,
      deviceInfo: null, // Will be populated during session
    };
  }

  /**
   * Start WebXR session
   */
  async startSession(config: WebXRSessionConfig): Promise<void> {
    if (this.isSessionActive) {
      throw new Error('Session already active');
    }

    if (!('xr' in navigator)) {
      throw new Error('WebXR not supported');
    }

    const xr = navigator.xr as XRSystem;

    try {
      logger.info('Starting WebXR session', { mode: config.mode });

      // Session options
      const sessionInit: XRSessionInit = {
        requiredFeatures: config.requiredFeatures as XRReferenceSpaceType[] || ['local-floor'],
        optionalFeatures: config.optionalFeatures as XRReferenceSpaceType[] || [
          'bounded-floor',
          'hand-tracking',
          'eye-tracking',
        ],
      };

      // Add DOM overlay for AR
      if (config.mode === 'immersive-ar' && config.domOverlay) {
        sessionInit.domOverlay = { root: config.domOverlay };
        sessionInit.optionalFeatures?.push('dom-overlay' as XRReferenceSpaceType);
      }

      // Request session
      this.xrSession = await xr.requestSession(config.mode, sessionInit);

      // Setup WebGL context
      await this.setupWebGLContext();

      // Setup reference space
      this.xrReferenceSpace = await this.xrSession.requestReferenceSpace(
        'local-floor'
      );

      // Setup event listeners
      this.setupEventListeners();

      // Start render loop
      this.startRenderLoop();

      this.isSessionActive = true;

      logger.info('WebXR session started successfully');

      if (this.onSessionStart) {
        this.onSessionStart();
      }
    } catch (error) {
      logger.error('Failed to start WebXR session', { error });
      if (this.onError) {
        this.onError(error as Error);
      }
      throw error;
    }
  }

  /**
   * End WebXR session
   */
  async endSession(): Promise<void> {
    if (!this.xrSession) {
      return;
    }

    try {
      await this.xrSession.end();
      this.cleanup();

      logger.info('WebXR session ended');

      if (this.onSessionEnd) {
        this.onSessionEnd();
      }
    } catch (error) {
      logger.error('Error ending WebXR session', { error });
      throw error;
    }
  }

  /**
   * Setup WebGL rendering context
   */
  private async setupWebGLContext(): Promise<void> {
    if (!this.xrSession) {
      throw new Error('No active session');
    }

    const canvas = document.createElement('canvas');
    this.gl = canvas.getContext('webgl2', {
      xrCompatible: true,
      alpha: false,
      antialias: true,
    }) as WebGL2RenderingContext;

    if (!this.gl) {
      throw new Error('Failed to get WebGL context');
    }

    // Set XR-compatible layer
    const glLayer = new XRWebGLLayer(this.xrSession, this.gl);
    await this.xrSession.updateRenderState({
      baseLayer: glLayer,
    });
  }

  /**
   * Setup XR event listeners
   */
  private setupEventListeners(): void {
    if (!this.xrSession) return;

    this.xrSession.addEventListener('end', () => {
      this.cleanup();
    });

    this.xrSession.addEventListener('selectstart', (event) => {
      if (this.onSelectStart) {
        this.onSelectStart(event);
      }
    });

    this.xrSession.addEventListener('selectend', (event) => {
      if (this.onSelectEnd) {
        this.onSelectEnd(event);
      }
    });

    this.xrSession.addEventListener('squeezestart', (event) => {
      if (this.onSqueezeStart) {
        this.onSqueezeStart(event);
      }
    });
  }

  /**
   * Start render loop
   */
  private startRenderLoop(): void {
    if (!this.xrSession) return;

    const onFrame = (time: DOMHighResTimeStamp, frame: XRFrame): void => {
      if (!this.xrSession || !this.xrReferenceSpace) return;

      // Request next frame
      this.animationFrameId = this.xrSession.requestAnimationFrame(onFrame);

      // Get viewer pose
      const pose = frame.getViewerPose(this.xrReferenceSpace);
      if (!pose) return;

      // Get WebGL layer
      const glLayer = this.xrSession.renderState.baseLayer;
      if (!glLayer) return;

      // Bind framebuffer
      if (this.gl) {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, glLayer.framebuffer);
      }

      // Render each view (eye)
      for (const view of pose.views) {
        const viewport = glLayer.getViewport(view);
        if (!viewport) continue;

        if (this.gl) {
          this.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
        }

        // Render scene for this view
        this.renderView(view, frame);
      }
    };

    this.animationFrameId = this.xrSession.requestAnimationFrame(onFrame);
  }

  /**
   * Render single view (overridable)
   */
  protected renderView(view: XRView, frame: XRFrame): void {
    // Override this method to implement custom rendering
    // Default implementation clears to black
    if (!this.gl) return;

    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  /**
   * Cleanup resources
   */
  private cleanup(): void {
    if (this.animationFrameId !== null && this.xrSession) {
      this.xrSession.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    this.xrSession = null;
    this.xrReferenceSpace = null;
    this.gl = null;
    this.isSessionActive = false;
  }

  /**
   * Get current controller poses
   */
  getControllerPoses(frame: XRFrame): readonly XRPose[] {
    if (!this.xrSession || !this.xrReferenceSpace) {
      return [];
    }

    const poses: XRPose[] = [];

    for (const inputSource of this.xrSession.inputSources) {
      if (inputSource.gripSpace) {
        const pose = frame.getPose(inputSource.gripSpace, this.xrReferenceSpace);
        if (pose) {
          poses.push(pose);
        }
      }
    }

    return poses;
  }

  /**
   * Perform raycast for hand pointer interaction
   */
  performRaycast(
    frame: XRFrame,
    inputSource: XRInputSource
  ): XRHitTestResult[] | null {
    if (!this.xrReferenceSpace || !inputSource.targetRaySpace) {
      return null;
    }

    // This requires hit-test feature
    // Implementation depends on AR vs VR mode
    return null; // Placeholder
  }

  /**
   * Teleport user to position
   */
  teleportTo(position: { x: number; y: number; z: number }): void {
    if (!this.xrReferenceSpace || !this.xrSession) {
      return;
    }

    // Create offset reference space
    const transform = new XRRigidTransform(
      { x: position.x, y: position.y, z: position.z },
      { x: 0, y: 0, z: 0, w: 1 }
    );

    this.xrReferenceSpace = this.xrReferenceSpace.getOffsetReferenceSpace(transform);

    logger.info('Teleported to position', position);
  }

  /**
   * Register event callbacks
   */
  on(event: 'sessionstart', callback: () => void): void;
  on(event: 'sessionend', callback: () => void): void;
  on(event: 'selectstart', callback: (event: XRInputSourceEvent) => void): void;
  on(event: 'selectend', callback: (event: XRInputSourceEvent) => void): void;
  on(event: 'squeezestart', callback: (event: XRInputSourceEvent) => void): void;
  on(event: 'error', callback: (error: Error) => void): void;
  on(event: string, callback: any): void {
    switch (event) {
      case 'sessionstart':
        this.onSessionStart = callback;
        break;
      case 'sessionend':
        this.onSessionEnd = callback;
        break;
      case 'selectstart':
        this.onSelectStart = callback;
        break;
      case 'selectend':
        this.onSelectEnd = callback;
        break;
      case 'squeezestart':
        this.onSqueezeStart = callback;
        break;
      case 'error':
        this.onError = callback;
        break;
    }
  }

  /**
   * Get current session status
   */
  getSessionStatus(): {
    isActive: boolean;
    mode: XRSessionMode | null;
    frameRate: number | null;
  } {
    return {
      isActive: this.isSessionActive,
      mode: this.xrSession?.mode || null,
      frameRate: this.xrSession?.frameRate || null,
    };
  }

  /**
   * Check if session is active
   */
  get isActive(): boolean {
    return this.isSessionActive;
  }

  /**
   * Get current XR session
   */
  get session(): XRSession | null {
    return this.xrSession;
  }

  /**
   * Get current reference space
   */
  get referenceSpace(): XRReferenceSpace | null {
    return this.xrReferenceSpace;
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if browser supports WebXR
 */
export function isWebXRSupported(): boolean {
  return 'xr' in navigator;
}

/**
 * Get recommended VR settings for device
 */
export async function getRecommendedVRSettings(): Promise<{
  renderScale: number;
  foveationLevel: number;
  antialiasing: boolean;
}> {
  // Detect device capabilities and return optimal settings
  const isMobileVR = /Oculus|Quest/i.test(navigator.userAgent);

  return {
    renderScale: isMobileVR ? 0.8 : 1.0,
    foveationLevel: isMobileVR ? 2 : 0,
    antialiasing: !isMobileVR,
  };
}

/**
 * Request fullscreen for VR (pre-requisite for some browsers)
 */
export async function requestFullscreenForVR(
  element: HTMLElement = document.documentElement
): Promise<void> {
  if (element.requestFullscreen) {
    await element.requestFullscreen();
  }
}

export default WebXRManager;
