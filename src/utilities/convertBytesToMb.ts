export default function convertBytesToMb(bytes: number) {
  const bytesInMb = bytes / 1024 ** 2;

  return bytesInMb.toFixed(1);
}
