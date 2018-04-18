export interface Options {
  size?: number;
  hd?: boolean;
  saveToGallery?: boolean;
  duration?: number;
  explanation?: string;
  format?: VideoFormatType;
  position?: CameraPositionType;
}

export interface RecordResult {
  file: string;
}

export type CameraPositionType = 'front' | 'back' | 'none';
export type VideoFormatType = 'default' | 'mp4';

export enum CameraPosition {
  FRONT = 'front',
  BACK = 'back',
  NONE = 'none',
}

export enum VideoFormat {
  DEFAULT = 'default',
  MP4 = 'mp4',
}

export abstract class VideoRecorderCommon {
  static options: Options;

  constructor(options: Options = {}) {
      VideoRecorderCommon.options = Object.assign(
      Object.assign({
        format: VideoFormat.DEFAULT,
        position: CameraPosition.NONE,
        size: 0,
        duration: 0,
        explanation: null
      }, options || {}), {
        saveToGallery: !!options.saveToGallery,
        hd: !!options.hd,
      }
    );
  }

  // @deprecated Options as argument is deprecated here
  public record(options: Options = {}): Promise<RecordResult> {
    options = Object.assign(VideoRecorderCommon.options, options);

    return VideoRecorderCommon.requestPermissions(options).catch((err) => {
      throw { event: 'denied' };
    }).then(() => { return this._startRecording(options); });
  }

  public static requestPermissions(options?: Options): Promise<any> {
    return Promise.resolve();
  }

  public static isAvailable(): boolean {
    return false;
  }

  protected _startRecording(options?: Options): Promise<RecordResult> {
    return Promise.reject({ event: 'failed' });
  }
}
