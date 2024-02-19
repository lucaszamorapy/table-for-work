import { IoSearchOutline } from "react-icons/io5";

const InputTable = ({ setSearch }) => {
  return (
    <div className="mb-3 relative">
      <input
        className="px-2 py-2 pl-8 rounded-lg focus:outline-none focus:ring-0"
        type="text"
        placeholder="Procure aqui"
        onChange={(e) => setSearch(e.target.value)}
      />
      <IoSearchOutline
        className="absolute top-1/2 transform -translate-y-1/2 left-2 text-white"
        opacity={0.5}
      />
    </div>
  );
};

export default InputTable;
