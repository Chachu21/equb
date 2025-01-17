import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface FeatureCardProps {
  title: string;
  content: string;
  icon: IconDefinition; // Accept an icon prop
}

const FeatureCard = (props: FeatureCardProps) => {
  return (
    <div className="my-3 md:my-4 mx-auto container">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg shadow-md border border-gray-200 bg-white dark:bg-gray-500 dark:text-800 h-[300px] p-6 rounded-xl">
        <div className="flex flex-col justify-center items-center space-y-4 w-full h-full">
          <FontAwesomeIcon
            icon={props.icon}
            size="2x"
            className="text-[#008B8B] dark:text-blue-700"
          />
          <h2 className="text-lg md:text-xl font-bold text-[#1F284F]  text-center">
            {props.title}
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-900 font-normal text-center leading-relaxed">
            {props.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
