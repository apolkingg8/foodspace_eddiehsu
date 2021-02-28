import Discount1 from "./Discount1";
import Product from "../Product";

describe("Discount1", ()=> {

    test("constructor()", async ()=> {
        let discount = new Discount1({})

        expect(discount).toBeInstanceOf(Discount1)
    })

    test("constructor() with props", async ()=> {
        let discount = new Discount1({
            name: 'Foo'
        })

        expect(discount.name).toEqual("Foo")
    })

    test("apply() with empty", async ()=> {
        let discount = new Discount1({})
        let products = []
        let res = await discount.apply([])

        expect(res).toEqual(products)
        expect(res).not.toBe(products)
    })

    test("apply() not applied", async ()=> {
        let discount = new Discount1({})
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

        expect(res).toEqual(products)
    })

    test("apply() applied", async ()=> {
        let discount = new Discount1({})
        let products = [
            new Product({
                id: "1",
                pricing: 10,
            }),
            new Product({
                id: "1",
                pricing: 10,
            }),
            new Product({
                id: "3",
                pricing: 10,
            }),
        ]

        let res = await discount.apply(products)

        expect(res).not.toEqual(products)

        products[1].discount = 5

        expect(res).toEqual(products)
        expect(res).not.toBe(products)
    })

    test("apply() applied on multiple id", async ()=> {
        let discount = new Discount1({})
        let products = [
            new Product({
                id: "1",
                pricing: 10,
            }),
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
        ]

        let res = await discount.apply(products)

        expect(res).not.toEqual(products)

        products[1].discount = 5
        products[4].discount = 5

        expect(res).toEqual(products)
        expect(res).not.toBe(products)
    })

    test("apply() applied complex", async ()=> {
        let discount = new Discount1({})
        let products = [
            new Product({
                id: "1",
                pricing: 10,
            }),
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
                id: "1",
                pricing: 10,
            }),
            new Product({
                id: "2",
                pricing: 10,
            }),
        ]

        let res = await discount.apply(products)

        expect(res).not.toEqual(products)

        products[1].discount = 5
        products[4].discount = 5
        products[6].discount = 5

        expect(res).toEqual(products)
        expect(res).not.toBe(products)
    })

    test("apply() with bad input", async ()=> {
        let discount = new Discount1({})

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
