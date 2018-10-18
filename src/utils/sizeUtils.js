export const B = 'bytes';
export const KB = 'Kb';
export const MB = 'Mb';
export const GB = 'Gb';
export const TB = 'Tb';
export const PB = 'Pb';
export const EB = 'Eb';
export const ZB = 'Zb';
export const YB = 'Yb';

export function sizeUtils(bytes) {
  if (typeof bytes !== 'number') {
    return '';
  }
  const fileSizes = [B, KB, MB, GB, TB, PB, EB, ZB, YB];
  const pow = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, pow).toFixed(2))} ${fileSizes[pow]}`;
}
