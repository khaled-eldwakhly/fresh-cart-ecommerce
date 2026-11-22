import signinHeroImg from "@/assets/images/login-page-image.png";
import {
  faCircleQuestion,
  faClock,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function SigninHero() {
  return (
    <>
      <main className="lg:w-120">
        <section className="text-center space-y-6">
          <Image
            src={signinHeroImg}
            priority
            alt="signin hero image"
            className="shadow-md rounded-lg"
          />
          <p className="text-2xl font-bold">Fresh Groceries Delivered</p>
          <p>
            Join thousands of happy customers who trust FreshCart for thies
            daily grocery needs
          </p>
          <ul className="flex items-center justify-between">
            <li className="flex flex-col items-center gap-2">
              <FontAwesomeIcon
                icon={faTruckFast}
                className="text-xl text-primary-600"
              />
              <span className="text-gray-600/80 text-sm font-medium">
                Free Delivery
              </span>
            </li>
            <li className="flex flex-col items-center gap-2">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="text-xl text-primary-600"
              />
              <span className="text-gray-600/80 text-sm font-medium">
                Secure Payment
              </span>
            </li>
            <li className="flex flex-col items-center gap-2">
              <FontAwesomeIcon
                icon={faClock}
                className="text-xl text-primary-600"
              />
              <span className="text-gray-600/80 text-sm font-medium">
                24/7 Support
              </span>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
