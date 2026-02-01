import Image from "next/image";

export default function AvatarGroup({ images }: { images: string[] }) {
  return (
    <div className="flex items-center">
      {images.map((src, index) => (
        <div
          key={index}
          className={`relative w-10 md:w-14 h-10 md:h-14 rounded-full border-3 border-[#EEF6FF] overflow-hidden ${
            index !== 0 ? "-ml-5" : ""
          }`}
        >
          <Image
            src={src}
            alt="profile"
            fill
            sizes="56px"
            className="object-cover rounded-full"
          />
        </div>
      ))}
    </div>
  );
}
