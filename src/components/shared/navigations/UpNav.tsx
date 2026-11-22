import { Separator } from "@/components/ui/separator";
import SessionView from "@/features/auth/helpers/auth/SessionView";
import { faFaceSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Gift,
  Mail,
  Phone,
  Truck,
  UserPlus,
  UserRoundCheck,
} from "lucide-react";
import Link from "next/link";

export default function UpNav() {
  return (
    <>
      <div className="container text-gray-500 text-xs font-medium py-2 border-b hidden lg:block">
        <div className="flex justify-between font-semibold">
          <div className="flex gap-6">
            <p className="flex items-center gap-1.5">
              <Truck className="text-primary-600" size={18} />
              <span>Free Shipping on Orders over 500 EGP</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Gift className="text-primary-600" size={18} />
              <span>New Arrivals Daily</span>
            </p>
          </div>
          <div className="flex gap-6">
            <div className="flex gap-6">
              <a href="tel:+15551234567" className="flex items-center gap-1.5">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-1.5"
              >
                <Mail size={18} /> <span>support@freshcart.com</span>
              </a>
            </div>
            <Separator orientation="vertical" />
            <SessionView
              authenticatedProp={(data) => (
                <div>
                  Hello,{" "}
                  <span className="font-bold">
                    {data?.user?.name?.split(" ")[0]}{" "}
                    <FontAwesomeIcon icon={faFaceSmileBeam} />
                  </span>
                </div>
              )}
              unauthenticatedProp={
                <div className="flex gap-6">
                  <Link href={"/signin"} className="flex items-center gap-1.5">
                    <UserRoundCheck size={18} />
                    <span>Sign In</span>
                  </Link>
                  <Link href={"/signup"} className="flex items-center gap-1.5">
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
