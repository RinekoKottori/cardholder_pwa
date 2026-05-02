export function isoWithMicroseconds(date = new Date()) {
    const iso = date.toISOString(); // 2026-05-02T10:56:12.380Z
    const [base, msZ] = iso.split('.');
    const ms = msZ.replace('Z', ''); // "380"
  
    return `${base}.${ms.padEnd(6, '0')}`;
  }