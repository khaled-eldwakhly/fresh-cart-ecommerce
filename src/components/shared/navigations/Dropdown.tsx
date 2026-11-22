"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Dropdown() {
  const [listName, setListName] = useState("List");
  return (
    <>
      <div className="hidden lg:block xl:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="secondary" className={"group text-base"}>
                {listName}
                <ChevronRight className="group-hover:rotate-90 duration-200" />
              </Button>
            }
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setListName("Home")}>
                <Link href={"/"}>Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setListName("Shop")}>
                <Link href={"/products"}>Shop</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setListName("Brands")}>
                <Link href={"/brands"}>Brands</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setListName("Categories")}>
                <Link href={"/categories"}>Categories</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
