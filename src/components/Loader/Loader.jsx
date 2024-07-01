import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-dark-2">
      <Image
        src="/icons/loading-circle.svg"
        alt="loading"
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loader;
