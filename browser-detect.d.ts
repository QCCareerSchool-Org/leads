declare module 'browser-detect' {

  export interface BrowserDetectResult {
    name?: string;
    version?: string;
    versionNumber?: number;
    mobile?: boolean;
    os?: string;
  }

  const browswerDetect: (userAgent?: string) => BrowserDetectResult;

  export default browswerDetect;
}
