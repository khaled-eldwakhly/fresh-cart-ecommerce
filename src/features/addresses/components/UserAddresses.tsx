"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  deleteUserAddress,
  getLoggedUserAddresses,
} from "../server/addresses.actions";
import { Address, ShippingAddress } from "../types/addresses.types";

export function UserAddresses({
  refreshKey,
  setAddress,
}: {
  refreshKey: number;
  setAddress: React.Dispatch<React.SetStateAction<ShippingAddress | null>>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  async function getAddresses() {
    try {
      setLoading(true);
      const response = await getLoggedUserAddresses();
      if (response.status === "success") {
        setAddresses(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAddress() {
    try {
      setLoading(true);
      const response = await deleteUserAddress(selectedId!);
      if (response.status === "success") {
        setAddresses(response.data);
        setSelectedId(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const selectedAddress = addresses.find((a) => a._id === selectedId);

  useEffect(() => {
    getAddresses();
  }, [refreshKey]);

  useEffect(() => {
    if (!selectedAddress) {
      setAddress(null);
      return;
    }

    setAddress({
      details: selectedAddress.details,
      phone: selectedAddress.phone,
      city: selectedAddress.city,
    });
  }, [selectedAddress, setAddress]);

  return (
    <div className="space-y-3">
      <p className="font-semibold">Select from your saved addresses</p>
      <Select value={selectedId} onValueChange={setSelectedId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an address">
            {(value: string | null) => {
              const address = addresses.find((a) => a._id === value);
              return address
                ? `${address.name} - ${address.city}`
                : "Select an address";
            }}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {loading ? (
            <div className="flex justify-center p-4">
              <Spinner className="size-7" />
            </div>
          ) : (
            <SelectGroup>
              <SelectLabel>Your addresses</SelectLabel>
              {addresses.map((address) => (
                <SelectItem key={address._id} value={address._id}>
                  {address.name} - {address.city}
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>

      {selectedAddress && (
        <div className="rounded-md border p-3 pt-5 mt-10 text-sm relative">
          <button
            className="bg-red-500 text-white size-9 text-xl rounded-full absolute right-3"
            onClick={deleteAddress}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <p className="absolute left-0 right-0 top-0 -translate-y-7/10 w-full px-3 py-1 text-primary-600 font-semibold bg-primary-100 border-2 border-primary-400 rounded-tl-xl rounded-tr-xl">
            Selected Address
          </p>
          <p>
            Name: <span className="font-semibold">{selectedAddress.name}</span>
          </p>
          <p>
            Phone number:{" "}
            <span className="font-semibold">{selectedAddress.phone}</span>
          </p>
          <p>
            City: <span className="font-semibold">{selectedAddress.city}</span>
          </p>
          <p>
            Address details:{" "}
            <span className="font-semibold">{selectedAddress.details}</span>
          </p>
        </div>
      )}
    </div>
  );
}
