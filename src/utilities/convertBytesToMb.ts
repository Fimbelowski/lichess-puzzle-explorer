export default function convertBytesToMb(bytes: number) {
  const bytesAsMb = bytes / 1024 ** 2;
  return bytesAsMb.toFixed(1);
}
