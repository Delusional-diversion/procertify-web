export function bufferToBase64(buffer) {
    const uint8Array = new Uint8Array(buffer);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
    return base64String;
  }
  