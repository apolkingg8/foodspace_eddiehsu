import checkoutService, {CheckoutService} from "./checkoutService";
import Product from "./Product";
import Discount1 from "./Discount/Discount1";
import Discount2 from "./Discount/Discount2";

describe("checkoutService", async ()=> {

    test("constructor()", ()=> {
        expect(checkoutService).toBeInstanceOf(CheckoutService)
    })

    test("addDiscount()", async ()=> {
        let dis1 = new Discount1({})
        let dis2 = new Discount2({})

        await checkoutService.addDiscount(dis1)

        expect(checkoutService.discounts).toEqual([dis1])

        await checkoutService.addDiscount(dis1)

        expect(checkoutService.discounts).toEqual([dis1])

        await checkoutService.addDiscount(dis2)

        expect(checkoutService.discounts).toEqual([dis1, dis2])
    })

    test("removeDiscount()", async ()=> {
        let dis1 = new Discount1({})
        let dis2 = new Discount2({})

        await checkoutService.addDiscount(dis1)
        await checkoutService.addDiscount(dis2)

        expect(checkoutService.discounts).toEqual([dis1, dis2])

        await checkoutService.removeDiscount(dis1.id)

        expect(checkoutService.discounts).toEqual([dis2])

        await checkoutService.removeDiscount(dis2.id)

        expect(checkoutService.discounts).toEqual([])
    })

    test("checkout() empty", async ()=> {
        let res = await checkoutService.checkout([])

        expect(res).toEqual([])
    })

    test("checkout() without discounts", async ()=> {
        let products = [
            new Product({id: "1", name: "1", pricing: 1}),
            new Product({id: "2", name: "2", pricing: 2}),
            new Product({id: "3", name: "3", pricing: 3}),
        ]
        let res = await checkoutService.checkout(products)

        expect(checkoutService.discounts).toEqual([])
        expect(res).toEqual(products)
        expect(res).not.toBe(products)
    })

    test("checkout() with discount1", async ()=> {
        let products = [
            new Product({id: "1", name: "1", pricing: 13}),
            new Product({id: "1", name: "1", pricing: 13}),
            new Product({id: "3", name: "3", pricing: 13}),
        ]

        await checkoutService.addDiscount(new Discount1({}))

        let res = await checkoutService.checkout(products)

        expect(res).not.toEqual(products)

        products[1].discount = 7

        expect(res).toEqual(products)
    })

    test("checkout() with discount2", async ()=> {
        let products = [
            new Product({id: "1", name: "1", pricing: 9}),
            new Product({id: "2", name: "2", pricing: 9}),
            new Product({id: "3", name: "3", pricing: 9}),
        ]

        await checkoutService.addDiscount(new Discount2({}))

        let res = await checkoutService.checkout(products)

        expect(res).not.toEqual(products)

        products[0].discount = 5
        products[1].discount = 5
        products[2].discount = 5

        expect(res).toEqual(products)
    })

    test("checkout() with discount1 & discount2", async ()=> {
        let products = [
            new Product({id: "3", name: "3", pricing: 55}),
            new Product({id: "2", name: "2", pricing: 50}),
            new Product({id: "3", name: "3", pricing: 55}),
            new Product({id: "3", name: "3", pricing: 55}),
            new Product({id: "4", name: "4", pricing: 60}),
        ]

        await checkoutService.addDiscount(new Discount1({}))
        await checkoutService.addDiscount(new Discount2({}))

        let res = await checkoutService.checkout(products)

        expect(res).not.toEqual(products)

        products[0].discount = 0
        products[1].discount = 10
        products[2].discount = 28
        products[2].discount = 5
        products[2].discount = 5

        expect(res).toEqual(products)
    })
})

