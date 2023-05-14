import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// TODO: figure out migation to next/image
import Image from "next/legacy/image";

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

// NOTE: I don;t think i need this if i don;t use the zoom plug
function nextImageUrl(src: string, size: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
}

export const CustomLightbox = ({ images }: { images: any[] }) => {
  const [open, setOpen] = useState(false);
  // TODO: type this shit
  const slides = images.map(({ src, width, height, alt }: any) => ({
    width,
    height,
    src: nextImageUrl(src, width),
    alt,
    srcSet: imageSizes
      .concat(...deviceSizes)
      .filter(size => size <= width)
      .map(size => ({
        src: nextImageUrl(src, size),
        width: size,
        height: Math.round((height / width) * size),
      })),
  }));

  const firstImage = slides[0];
  return (
    <>
      <Image
        src={firstImage.src}
        alt={firstImage.alt}
        width={firstImage.width}
        height={firstImage.height}
        layout="responsive"
        onClick={() => setOpen(true)}
      />
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} />
    </>
  );
};
