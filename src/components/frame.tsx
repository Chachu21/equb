import { Link } from 'react-router-dom';

interface BannerProps {
  onClose: () => void;
}

const Banner = ({ onClose }: BannerProps) => {
  return (
    <div className="bg-[#DFF6DD] py-2 text-black flex justify-between items-center px-3 z-50 border-l-4 border-green-500">
      <p className="text-center flex-1">
        🎉 A new Equb is available!{" "}
        <Link
          to="/group"
          className="text-blue-600 underline"
        >
          Check it out here.
        </Link>
      </p>
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
