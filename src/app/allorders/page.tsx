// * created to match response of checkout api

import { redirect } from "next/navigation";

export default function AllOrdersRedirect() {
  redirect("/orders/all-orders");
}
