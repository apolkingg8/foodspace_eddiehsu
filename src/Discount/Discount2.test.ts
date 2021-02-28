import Discount2 from "./Discount2";
import Product from "../Product";

describe("discount2", ()=> {

    test("constructor()", async ()=> {
        let discount = new Discount2({})

        expect(discount).toBeInstanceOf(Discount2)
    })

    test("constructor() with props", async ()=> {
        let discount = new Discount2({
            name: 'Foo'
        })

        expect(discount.name).toEqual("Foo")
    })

    test("apply() with empty", async ()=> {
        let discount = new Discount2({})
        let products = []
        let res = await discount.apply([])

        expect(res).toEqual(products)
        expect(res).not.toBe(products)
    })

    test("apply() not applied", async ()=> {
        let discount = new Discount2({})
        let products = [
            new Product({
                id: "1",
                pricing: 10,
            }),
            new Product({
                id: "2",
                pricing: 10,
            }),
        ]

        let res = await discount.apply(products)

        expect(res).toEqual(products)
        expect(res).not.toBe(products)
    })

    test("apply() applied", async ()=> {
        let discount = new Discount2({})
        let products = [
            new Product({
                id: "1",
                pricing: 10,
            }),
            new Product({
                id: "2",
                pricing: 10,
            }),
            new Product({
                id: "3",
                pricing: 10,
            }),
        ]

        let res = await discount.apply(products)

        expect(res).not.toEqual(products)

        products[0].discount = 5
        products[0].appliedDiscountIds = [discount.id]
        products[1].discount = 5
        products[1].appliedDiscountIds = [discount.id]
        products[2].discount = 5
        products[2].appliedDiscountIds = [discount.id]

        expect(res).toEqual(products)
    })

    test("apply() applied more", async ()=> {
        let discount = new Discount2({})
        let products = [
            new Product({
                id: "1",
                pricing: 10,
            }),
            new Product({
                id: "2",
                pricing: 10,
            }),
            new Product({
                id: "3",
                pricing: 10,
            }),
            new Product({
                id: "3",
                pricing: 10,
            }),
            new Product({
                id: "3",
                pricing: 10,
            }),
        ]

        let res = await discount.apply(products)

        expect(res).not.toEqual(products)

        products[0].discount = 5
        products[0].appliedDiscountIds = [discount.id]
        products[1].discount = 5
        products[1].appliedDiscountIds = [discount.id]
        products[2].discount = 5
        products[2].appliedDiscountIds = [discount.id]
        products[3].discount = 5
        products[3].appliedDiscountIds = [discount.id]
        products[4].discount = 5
        products[4].appliedDiscountIds = [discount.id]

        expect(res).toEqual(products)
    })

    test("apply() avoid applied", async ()=> {
        let discount = new Discount2({})
        let products = [
            new Product({
                id: "1",
                pricing: 10,
            }),
            new Product({
                id: "2",
                pricing: 10,
                appliedDiscountIds: ["foo"],
            }),
            new Product({
                id: "3",
                pricing: 10,
            }),
        ]

        let res = await discount.apply(products)

        expect(res).toEqual(products)
    })

    test("apply() avoid applied and works", async ()=> {
        let discount = new Discount2({})
        let products = [
            new Product({
                id: "1",
                pricing: 10,
            }),
            new Product({
                id: "2",
                pricing: 10,
                appliedDiscountIds: ["foo"],
            }),
            new Product({
                id: "3",
                pricing: 10,
            }),
            new Product({
                id: "3",
                pricing: 10,
            }),
        ]

        let res = await discount.apply(products)

        expect(res).not.toEqual(products)

        products[0].discount = 5
        products[0].appliedDiscountIds = [discount.id]
        products[2].discount = 5
        products[2].appliedDiscountIds = [discount.id]
        products[3].discount = 5
        products[3].appliedDiscountIds = [discount.id]

        expect(res).toEqual(products)
    })

    test("apply() with bad input", async ()=> {
        let discount = new Discount2({})

        await expect(discount.apply(null)).rejects.toThrow()
        await expect(discount.apply(undefined)).rejects.toThrow()
        // @ts-ignore
        await expect(discount.apply(123)).rejects.toThrow()
        // @ts-ignore
        await expect(discount.apply("123")).rejects.toThrow()
        // @ts-ignore
        await expect(discount.apply(true)).rejects.toThrow()
        // @ts-ignore
        await expect(discount.apply(false)).rejects.toThrow()
        // @ts-ignore
        await expect(discount.apply({})).rejects.toThrow()
        // @ts-ignore
        await expect(discount.apply(new Error())).rejects.toThrow()
    })
})
