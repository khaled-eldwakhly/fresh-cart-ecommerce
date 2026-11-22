import {
  faTruck,
  faArrowRotateLeft,
  faHeadset,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PromoBanner() {
  const list = [
    {
      icon: faTruck,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      title: "Free Shipping",
      subTitle: "On orders over 500 EGP",
    },
    {
      icon: faShieldHalved,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      title: "Secure Payment",
      subTitle: "100% secure transactions",
    },
    {
      icon: faArrowRotateLeft,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      title: "Easy Returns",
      subTitle: "14-day return policy",
    },
    {
      icon: faHeadset,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      title: "24/7 Support",
      subTitle: "Dedicated support team",
    },
  ];

  return (
    <>
      <section className="background-gray">
        <div className="container py-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {list.map((listItem, index) => (
              <li
                key={index}
                className="p-4 bg-white rounded-xl shadow-sm flex items-center gap-4"
              >
                <div
                  className={`${listItem.iconBg} size-10 rounded-full flex justify-center items-center`}
                >
                  <FontAwesomeIcon
                    icon={listItem.icon}
                    className={`${listItem.iconColor} text-lg`}
                  />
                </div>
                <div className="font-semibold -space-y-0.5">
                  <p className="">{listItem.title}</p>
                  <p className="text-light text-sm">{listItem.subTitle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
