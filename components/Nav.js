import React, { useRef } from "react";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../context/shopContext";
import MiniCart from "./MiniCart";

export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);

  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });

  const formEl = useRef();

  const onClickHandler = (event) => {
    event.preventDefault();
    const form = formEl.current;
    const formData = new FormData(form);
    const text = formData.get("kw");
    form.action = `/search?${text}`;
    form.submit();
  };

  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <span className="text-lg pt-1 font-bold">Shopify + Next.js</span>
          </a>
        </Link>

        <form
          action="/search"
          method="get"
          ref={formEl}
          style={{ width: "50%" }}
        >
          <input
            type="text"
            placeholder="Search"
            // autoFocus
            name="kw"
            style={{
              backgroundColor: "rgba(229, 231, 235, var(--tw-bg-opacity))",
              height: 25,
              width: "70%",
              borderRadius: 3,
              padding: 5,
              fontSize: 15,
              marginRight: 10,
            }}
          />
          <button onClick={onClickHandler}>Search</button>
        </form>

        <a
          className="text-md font-bold cursor-pointer"
          onClick={() => setCartOpen(!cartOpen)}
        >
          Cart ({cartQuantity})
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  );
}
