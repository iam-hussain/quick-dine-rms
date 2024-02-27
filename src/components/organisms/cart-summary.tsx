import { Button } from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import { Separator } from "@/components/atoms/separator";
import { ScrollArea } from "@/components/atoms/scroll-area";
import clsx from "clsx";
import ButtonToolTip from "@/components/molecules/button-tooltip";

const products = [
  {
    name: "Ghee Rava Dosa",
    price: 40.0,
    deck: "Neque porro quisquam est velit...",
    image:
      "https://images.unsplash.com/photo-1612204104655-6c8a57ae235f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGZvb2RzfGVufDB8fDB8fHww",
  },
  {
    name: "Cheese Pizza",
    price: 150.0,
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Peri Peri Chicken Burger",
    price: 150.0,
    image:
      "https://images.unsplash.com/photo-1609167830220-7164aa360951?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const preparing = [
  {
    name: "Mutton Briyani",
    price: 300.0,
    image: "",
    active: true,
  },
  {
    name: "Idly",
    price: 10.0,
    image: "",
  },
  {
    name: "Watermelon Juice",
    price: 50.0,
    image: "",
  },
  {
    name: "Chocolate Moose",
    price: 100.0,
    image: "",
  },
];

const pendingProducts = [
  {
    name: "Chicken Noodles",
    price: 100.0,
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ghee Rava Dosa",
    price: 40.0,
    deck: "Neque porro quisquam est velit...",
    image:
      "https://images.unsplash.com/photo-1612204104655-6c8a57ae235f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGZvb2RzfGVufDB8fDB8fHww",
  },
  {
    name: "Cheese Pizza",
    price: 150.0,
    image:
      "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Peri Peri Chicken Burger",
    price: 150.0,
    image:
      "https://images.unsplash.com/photo-1609167830220-7164aa360951?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Chicken Noodles",
    price: 100.0,
    image:
      "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function CartSummary({ className }: { className?: string }) {
  return (
    <div className={clsx("w-full h-full cart-grid gap-4 bg-paper", className)}>
      <div className="grid grid-cols-4 md:grid-cols-6 py-2 px-4 gap-2 bg-background">
        <ButtonToolTip
          label="Link Customer"
          icon="IoPersonAddSharp"
          variant="secondary"
        />
        <ButtonToolTip
          label="New Order"
          icon="IoMdAdd"
          variant={"outline"}
          className="md:col-start-4"
        />
        <ButtonToolTip
          label="Order List"
          icon="FaListUl"
          variant={"outline"}
          className="md:col-start-5"
        />
        <ButtonToolTip
          label="Reset Order"
          icon="GrPowerReset"
          variant={"destructive"}
          className="md:col-start-6"
        />
      </div>

      <div className="flex flex-col justify-between align-middle items-center py-2 px-4 bg-background gap-2">
        <div className="flex text-base flex-row justify-between w-full font-medium">
          <p>ID: JJ782328</p>
          <p>Today {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
      <ScrollArea className="w-full flex justify-end grow bg-background scroll-area__large">
        <div className="flex flex-col py-2 px-4">
          {products.map((each, i) => (
            <>
              <div
                key={i}
                className="flex justify-center items-center align-middle gap-4 rounded-md text-sm font-medium text-inactive"
              >
                <span className="grow">{each.name}</span>
                <div className="flex justify-center align-middle items-center text-center border border-paper">
                  <Button className="p-1" variant={"ghost"} disabled>
                    <Icon name="RiSubtractFill" />
                  </Button>
                  <span className="min-w-6">1</span>
                  <Button className="p-1" variant={"ghost"} disabled>
                    <Icon name="IoMdAdd" />
                  </Button>
                </div>
                <span className="min-w-16 flex justify-end">
                  ₹ {each.price.toFixed(2)}
                </span>

                <ButtonToolTip
                  className="text-bw-foreground"
                  label={i > 1 ? "Cooked" : "Cooking"}
                  icon={i > 1 ? "PiCookingPot" : "PiCookingPotFill"}
                  variant={"transparent"}
                />
              </div>
              {products.length - 1 !== i && <Separator className={"my-2"} />}
            </>
          ))}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Kitchen Pending
              </span>
            </div>
          </div>

          {preparing.map((each, i) => (
            <>
              <div
                key={i}
                className="flex justify-center items-center align-middle gap-4 rounded-md text-sm font-medium"
              >
                <span className="grow">{each.name}</span>
                <div className="flex justify-center align-middle items-center text-center border border-paper">
                  <Button className="p-1" variant={"ghost"} disabled>
                    <Icon name="RiSubtractFill" />
                  </Button>
                  <span className="min-w-6">1</span>
                  <Button className="p-1" variant={"ghost"} disabled>
                    <Icon name="IoMdAdd" />
                  </Button>
                </div>
                <span className="min-w-16 flex justify-end">
                  ₹ {each.price.toFixed(2)}
                </span>
                <Button variant={"transparent"} className="p-2">
                  <Icon name="TiDelete" className="h-6 w-6" />
                </Button>
              </div>
              {preparing.length - 1 !== i && <Separator className={"my-2"} />}
            </>
          ))}

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Items Addons
              </span>
            </div>
          </div>

          {pendingProducts.map((each, i) => (
            <>
              <div
                key={i}
                className="flex justify-center items-center align-middle gap-4 rounded-md text-sm font-medium"
              >
                <span className="grow">{each.name}</span>
                <div className="flex justify-center align-middle items-center text-center border border-paper">
                  <Button className="p-1" variant={"ghost"}>
                    <Icon name="RiSubtractFill" />
                  </Button>
                  <span className="min-w-6">1</span>
                  <Button className="p-1" variant={"ghost"}>
                    <Icon name="IoMdAdd" />
                  </Button>
                </div>
                <span className="min-w-16 flex justify-end">
                  ₹ {each.price.toFixed(2)}
                </span>
                <Button variant={"transparent"} className="p-2">
                  <Icon name="TiDelete" className="h-6 w-6" />
                </Button>
              </div>
              {pendingProducts.length - 1 !== i && (
                <Separator className={"my-2"} />
              )}
            </>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 flex justify-center align-middle items-center gap-4 flex-col text-sm bg-background select-none">
        <div className="grid grid-cols-4 gap-2 w-full md:px-10">
          <ButtonToolTip
            label="Add Discount"
            icon="TbDiscount2"
            variant={"secondary"}
          />

          <ButtonToolTip
            label="Add Package Charge"
            icon="PiPackageFill"
            variant={"secondary"}
          />

          <ButtonToolTip
            label="Add Delivery Charge"
            icon="TbMotorbike"
            variant={"secondary"}
          />

          <ButtonToolTip
            label="Add Payment"
            icon="MdOutlinePayments"
            variant={"secondary"}
          />
        </div>
        <div className="flex flex-col w-full gap-2 text-base">
          <div className="flex gap-2 justify-between align-middle items-center w-full md:px-10">
            <span>Subtotal</span>
            <span>₹ 1030.00</span>
          </div>

          <div className="flex gap-2 justify-between align-middle items-center w-full md:px-10">
            <span>Packing Charge</span>
            <span>₹ 0.00</span>
          </div>

          <div className="flex gap-2 justify-between align-middle items-center w-full md:px-10">
            <span>Delivery Charge</span>
            <span>₹ 0.00</span>
          </div>
          <div className="flex gap-2 justify-between align-middle items-center w-full md:px-10">
            <span>Tax</span>
            <span>₹ 199.00</span>
          </div>
          <div className="flex gap-2 justify-between align-middle items-center w-full md:px-10">
            <span>Discount</span>
            <span>₹ 0.00</span>
          </div>
          <div className="flex gap-2 justify-between align-middle items-center w-full md:px-10">
            <span>Grand Total</span>
            <span>₹ 1300.00</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 w-full md:px-10">
          <ButtonToolTip
            label="Hold Order"
            icon="MdPendingActions"
            variant={"destructive"}
          />
          <ButtonToolTip
            label="Print Duplicate Bill"
            icon="IoPrint"
            variant={"outline"}
          />

          <Button className="w-full col-span-2">Place Order</Button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;
