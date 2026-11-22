import {
  faLeaf,
  faShieldHalved,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import reviewAuther from "@/assets/images/review-author.png";
import { Star } from "lucide-react";

export default function SignupHero() {
  return (
    <>
      <main className="xl:col-span-4">
        <section className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">
                Welcome to <span className="text-primary-600">FreshCart</span>
              </h1>
              <p className="text-lg text-gray-600">
                Join thousands of happy customers who enjoy fresh groceries
                delivered right to their doorstep.
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center gap-4">
                <div className="text-primary-600 bg-primary-200 size-12 text-lg rounded-full shrink-0 flex items-center justify-center">
                  <FontAwesomeIcon icon={faLeaf} />
                </div>
                <div>
                  <span className="font-semibold">Fresh & Organic</span>
                  <p className="text-[15px]">
                    Premium quality products sourced directly from farms
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-primary-600 bg-primary-200 size-12 text-lg rounded-full shrink-0 flex items-center justify-center">
                  <FontAwesomeIcon icon={faTruckFast} />
                </div>
                <div>
                  <span className="font-semibold">Fast Delivery</span>
                  <p className="text-[15px]">
                    Same-day delivery available in most areas
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="text-primary-600 bg-primary-200 size-12 text-lg rounded-full shrink-0 flex items-center justify-center">
                  <FontAwesomeIcon icon={faShieldHalved} />
                </div>
                <div>
                  <span className="font-semibold">Secure Shopping</span>
                  <p className="text-[15px]">
                    Your data and patments are completely secure
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <figure className="bg-white rounded-xl p-4 shadow-md shadow-primary-200 space-y-3">
            <figcaption className="flex items-center gap-4">
              <Image
                priority
                src={reviewAuther}
                alt="reviewAuther"
                className="w-14"
              />
              <div>
                <span className="heading">A'laa Khaled</span>
                <span className="flex gap-0.5">
                  {[...Array(5)].map((element, index) => (
                    <Star
                      key={index}
                      className="text-yellow-400 fill-yellow-400"
                      size={20}
                    />
                  ))}
                </span>
              </div>
            </figcaption>
            <blockquote>
              <p>
                "FreshCart has completely changed how I shop for groceries. The
                quality is amazing and delivery always on tile!"
              </p>
            </blockquote>
          </figure>
        </section>
      </main>
    </>
  );
}
