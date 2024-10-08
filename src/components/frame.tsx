interface BannerProps {
  onClose: () => void;
}
const Banner = ({ onClose }: BannerProps) => {
  return (
    <div className="bg-[#FEF3D9] py-2 text-black flex justify-between items-center px-3 z-50">
      <div />
      <p className="text-center">This is a banner at the top of the navbar</p>
      <button onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default Banner;
