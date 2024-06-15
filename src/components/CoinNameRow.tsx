import Image from "next/image";

const CoinNameRow = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <div className="flex items-center gap-2">
      <Image src={icon} alt={name} width={24} height={24} />
      <p className="text-gray-100">{name}</p>
    </div>
  );
};

export default CoinNameRow;
