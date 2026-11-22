"use client";

import SectionHeading from "@/components/shared/SectionHeading";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import EmptyWishlist from "../components/EmptyWishlist";
import WishlistItemCard from "../components/WishlistItemCard";
import WishlistSkeleton from "../components/WishlistSkeleton";
import { useWishlist } from "../contexts/wishlist.context";

const PAGE_SIZE = 6;

export default function WishlistScreen() {
  const { wishlistItems, wishlistCount, loading } = useWishlist();
  const [page, setPage] = useState(1);

  if (loading) {
    return <WishlistSkeleton />;
  }

  const items = wishlistItems ?? [];

  if (wishlistItems?.length === 0) {
    return <EmptyWishlist />;
  }

  const totalPages = Math.ceil(items.length / PAGE_SIZE);

  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const currentItems = items.slice(start, start + PAGE_SIZE);

  function goTo(e: React.MouseEvent, p: number) {
    e.preventDefault();
    setPage(Math.min(Math.max(p, 1), totalPages));
  }

  return (
    <main className="background-gray section-padding">
      <section className="bg-white mx-auto max-w-5xl p-5 rounded-xl">
        <div className="space-y-2 mb-6">
          <SectionHeading text="Wishlist" icon={faHeart} />
          <p className="text-sm font-medium text-gray-500">
            You have{" "}
            <span className="text-primary-600">{wishlistCount} items</span> in
            your wishlist
          </p>
        </div>
        <div>
          <div>
            {currentItems.map((item) => (
              <WishlistItemCard key={item._id} item={item} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    aria-label="Previous page"
                    onClick={(e) => goTo(e, currentPage - 1)}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  >
                    <ChevronLeft className="size-4" />
                  </PaginationLink>
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={p === currentPage}
                        onClick={(e) => goTo(e, p)}
                        className={
                          p === currentPage
                            ? "bg-primary-600 text-white border-0 hover:bg-primary-500 hover:text-white"
                            : ""
                        }
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    aria-label="Next page"
                    onClick={(e) => goTo(e, currentPage + 1)}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  >
                    <ChevronRight className="size-4" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>
    </main>
  );
}
