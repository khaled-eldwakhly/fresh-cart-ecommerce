import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SectionHeading({
  icon,
  text,
}: {
  icon: IconDefinition;
  text: string;
}) {
  return (
    <>
      <div className="flex items-center gap-1.5">
        <FontAwesomeIcon
          icon={icon}
          className="text-3xl bg-primary-600 text-white rounded-lg p-2"
        />
        <h1 className="font-bold text-2xl">{text}</h1>
      </div>
    </>
  );
}
